import { useEffect, useRef } from "react";

/**
 * One persistent WebGL layer behind every page: deep water, pointer ripples,
 * and metaball droplets that refract everything under them — including the
 * page titles, which are drawn into a texture from any DOM node marked
 * `data-water` (the DOM text stays for a11y and turns transparent).
 */

const MAX_RIP = 16;
const MAX_DROP = 10;

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uDpr, uTime, uScroll, uReveal;
uniform vec2 uMouse;
uniform vec4 uRip[${MAX_RIP}];
uniform vec3 uDrop[${MAX_DROP}];
uniform sampler2D uText;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0., a = .5;
  for (int i = 0; i < 4; i++){ v += a * noise(p); p = p * 2.03 + vec2(17., 9.); a *= .5; }
  return v;
}
// light veins: two ridged noise layers drifting against each other
float caustic(vec2 uv, float t){
  float a = 1. - abs(2. * fbm(uv * 2.6 + vec2(t, t * .6)) - 1.);
  float b = 1. - abs(2. * fbm(uv * 3.4 - vec2(t * .7, t) + 3.1) - 1.);
  return pow(a * b, 5.);
}
float field(vec2 p, out vec2 g){
  float f = 0.; g = vec2(0.);
  for (int i = 0; i < ${MAX_DROP}; i++){
    vec3 d = uDrop[i];
    if (d.z <= 0.) continue;
    vec2 v = p - d.xy; float q = dot(v, v) + 1.; float r2 = d.z * d.z;
    f += r2 / q; g += -2. * r2 * v / (q * q);
  }
  return f;
}
vec3 scene(vec2 p){
  vec2 uv = p / uRes.y;
  uv.y += uScroll / uRes.y * .25;
  float t = uTime * .05;
  vec2 w = vec2(fbm(uv * 1.4 + vec2(t, -t)), fbm(uv * 1.4 + vec2(-t * .7, t) + 5.2));
  float n = fbm(uv * 1.1 + w * 1.6);
  vec3 col = mix(vec3(.008, .016, .04), vec3(.02, .07, .19), smoothstep(.25, .85, n));
  float shaft = smoothstep(1.2, 0., length((p - vec2(uRes.x * .85, -uRes.y * .1)) / uRes.y));
  shaft *= shaft;
  col += vec3(.03, .12, .32) * shaft * (.6 + .4 * n);
  vec2 dm = p - uMouse;
  float mg = exp(-dot(dm, dm) / (260. * 260.));
  col += vec3(.04, .16, .42) * mg * .5;
  float c = caustic(uv + w * .5, uTime * .12);
  col += vec3(.25, .55, 1.) * c * (.1 + .5 * shaft + .55 * mg);
  return col;
}
void main(){
  vec2 p = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;

  // ripples: expanding rings, summed as a slope field
  vec2 off = vec2(0.);
  for (int i = 0; i < ${MAX_RIP}; i++){
    vec4 r = uRip[i];
    float age = uTime - r.z;
    if (r.w <= 0. || age < 0. || age > 4.) continue;
    vec2 v = p - r.xy; float d = length(v) + .001;
    float x = d - age * 240.; float w = 30. + age * 18.;
    off += v / d * cos(x * .16) * exp(-x * x / (w * w)) * r.w * exp(-age * 1.3);
  }

  // droplets
  vec2 g; float f = field(p, g);
  float m = smoothstep(1., 1.12, f);
  float hgt = clamp((f - 1.) / 1.6, 0., 1.);
  vec2 nd = dot(g, g) > 0. ? normalize(g) : vec2(0.);
  float edge = 1. - hgt;
  vec2 p2 = p + off * 14. + m * nd * edge * edge * 34.;

  vec3 col = scene(p2);

  // titles living in the water
  // on reveal the letters settle like something seen through moving water
  vec2 wob = (1. - uReveal) * vec2(sin(p.y * .03 + uTime * 3.), cos(p.x * .03 + uTime * 3.)) * 12.;
  vec2 q = (p2 + wob + vec2(0., uScroll)) / uRes;
  q.y += (1. - uReveal) * .04;
  float a = (q.x < 0. || q.x > 1. || q.y < 0. || q.y > 1.) ? 0. : texture2D(uText, q).a * uReveal;
  vec3 tc = mix(vec3(.94, .97, 1.), vec3(.56, .78, 1.), clamp(p.y / uRes.y * 1.2 - .1, 0., 1.) * .6);
  col = mix(col, tc, a);

  vec2 L = normalize(vec2(-.6, -.8));
  col += vec3(.35, .6, 1.) * max(dot(off, L), 0.) * .45;
  col *= 1. - .25 * max(dot(off, -L), 0.);

  // droplet shading: contact shadow, dark rim, crisp highlight, inner glow
  vec2 gs; float fs = field(p - vec2(5., 9.), gs);
  col *= 1. - .45 * smoothstep(.8, 1.1, fs) * (1. - m);
  col *= 1. - .38 * m * edge * edge * edge;
  col += m * vec3(.02, .04, .09);
  vec2 n2 = -nd * edge;
  float spec = pow(max(dot(n2, L), 0.), 3.) * m;
  col += vec3(1.) * smoothstep(.5, .78, spec) * .8;
  col += vec3(.45, .72, 1.) * pow(max(dot(n2, -L), 0.), 2.) * m * .5;

  col *= 1. - .35 * pow(length((p / uRes - .5) * vec2(1.1, 1.3)), 2.2);
  col += (hash(gl_FragCoord.xy + uTime) - .5) * .018;
  gl_FragColor = vec4(col, 1.);
}`;

type Drop = { x: number; y: number; vx: number; vy: number; r: number; sp: number; ph: number };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const motionOn = () => document.documentElement.dataset.motion !== "off";

const WaterCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return; // CSS fallback background stays, DOM titles stay visible

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.bindAttribLocation(prog, 0, "a");
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = {
      res: U("uRes"), dpr: U("uDpr"), time: U("uTime"), scroll: U("uScroll"),
      reveal: U("uReveal"), mouse: U("uMouse"), rip: U("uRip"), drop: U("uDrop"),
    };

    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const textCanvas = document.createElement("canvas");
    const ctx = textCanvas.getContext("2d")!;

    let W = 0, H = 0, dpr = 1;
    let time = 0, last = performance.now(), raf = 0;
    let revealAt = -1e9, textKey = "", textQueued = false;
    const rip = new Float32Array(MAX_RIP * 4);
    const dropBuf = new Float32Array(MAX_DROP * 3);
    let ripIdx = 0;

    const addRipple = (x: number, y: number, amp: number) => {
      rip.set([x, y, time, amp], ripIdx * 4);
      ripIdx = (ripIdx + 1) % MAX_RIP;
    };

    // ── droplets: slot 0 is the cursor, the rest slide down the glass ──
    const cur = { x: -999, y: -999, tx: -999, ty: -999, r: 0, target: 0, mx: -999, my: -999, down: false, hot: false, inside: false };
    const drops: Drop[] = [];
    const spawn = (d: Drop, top: boolean) => {
      d.r = rand(11, W < 700 ? 24 : 38);
      d.x = rand(0, W);
      d.y = top ? -d.r * 2 - rand(0, 240) : rand(0, H);
      d.vx = d.vy = 0;
      d.sp = rand(7, 20) * (d.r / 24);
      d.ph = rand(0, 6.28);
    };

    const drawText = () => {
      textQueued = false;
      textCanvas.width = Math.round(W * dpr);
      textCanvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#fff";
      let key = "", cx = W / 2, cy = H / 3;
      document.querySelectorAll<HTMLElement>("[data-water]").forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const text = el.textContent || "";
        ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        ctx.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
        const mt = ctx.measureText(text);
        const asc = mt.fontBoundingBoxAscent, desc = mt.fontBoundingBoxDescent;
        ctx.fillText(text, r.left, r.top + window.scrollY + (r.height - asc - desc) / 2 + asc);
        if (i === 0) { cx = r.left + r.width / 2; cy = r.top + r.height / 2; }
        key += text + "|";
      });
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
      if (key !== textKey) {
        textKey = key;
        if (key && motionOn()) { revealAt = performance.now(); addRipple(cx, cy, 1.1); }
      }
    };
    const queueText = () => {
      if (textQueued) return;
      textQueued = true;
      requestAnimationFrame(drawText);
    };

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const n = W < 700 ? 5 : MAX_DROP - 1;
      while (drops.length < n) { const d = {} as Drop; spawn(d, false); drops.push(d); }
      drops.length = n;
      queueText();
    };

    const onMove = (e: PointerEvent) => {
      const fine = e.pointerType !== "touch";
      if (cur.inside && motionOn()) {
        if (Math.hypot(e.clientX - cur.mx, e.clientY - cur.my) > 55) {
          addRipple(e.clientX, e.clientY, 0.26);
          cur.mx = e.clientX; cur.my = e.clientY;
        }
      } else { cur.mx = e.clientX; cur.my = e.clientY; cur.x = e.clientX; cur.y = e.clientY; }
      cur.tx = e.clientX; cur.ty = e.clientY;
      cur.inside = fine;
      cur.hot = !!(e.target as Element | null)?.closest?.("a,button");
    };
    const onDown = (e: PointerEvent) => {
      if (!motionOn()) return;
      cur.down = true;
      addRipple(e.clientX, e.clientY, 1);
      for (const d of drops) {
        const dx = d.x - e.clientX, dy = d.y - e.clientY, dist = Math.hypot(dx, dy);
        if (dist < 260) { const k = (1 - dist / 260) * 420; d.vx += (dx / (dist + 1)) * k; d.vy += (dy / (dist + 1)) * k; }
      }
    };
    const onUp = () => { cur.down = false; };
    const onLeave = () => { cur.inside = false; };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const on = motionOn();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (on) time += dt;

      cur.target = !on || !cur.inside ? 0 : cur.down ? 15 : cur.hot ? 34 : 22;
      cur.r += (cur.target - cur.r) * (1 - Math.exp(-10 * dt));
      cur.x += (cur.tx - cur.x) * (1 - Math.exp(-14 * dt));
      cur.y += (cur.ty - cur.y) * (1 - Math.exp(-14 * dt));
      dropBuf.set([cur.x, cur.y, cur.r < 0.5 ? 0 : cur.r], 0);

      drops.forEach((d, i) => {
        if (on) {
          const dx = cur.x - d.x, dy = cur.y - d.y, dist = Math.hypot(dx, dy);
          if (cur.r > 1 && dist < 190 && dist > (cur.r + d.r) * 0.6) {
            const k = (1 - dist / 190) * 520 * dt;
            d.vx += (dx / dist) * k; d.vy += (dy / dist) * k;
          }
          const damp = Math.exp(-3 * dt);
          d.vx *= damp; d.vy *= damp;
          // stick-slip: drops on glass pause, then run
          const slide = d.sp * (0.3 + 0.7 * Math.max(0, Math.sin(time * 0.4 + d.ph)));
          d.x += d.vx * dt; d.y += (d.vy + slide) * dt;
          if (d.y - d.r * 2 > H || d.x < -80 || d.x > W + 80) spawn(d, true);
        }
        dropBuf.set([d.x, d.y, d.r], (i + 1) * 3);
      });
      dropBuf.fill(0, (drops.length + 1) * 3);

      const rv = Math.min((now - revealAt) / 1300, 1); // wall clock, so a slow frame rate never stalls it
      gl.uniform2f(u.res, W, H);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.time, time);
      gl.uniform1f(u.scroll, window.scrollY);
      gl.uniform1f(u.reveal, 1 - Math.pow(1 - rv, 3));
      gl.uniform2f(u.mouse, cur.inside ? cur.x : W * 0.3, cur.inside ? cur.y : H * 0.4);
      gl.uniform4fv(u.rip, rip);
      gl.uniform3fv(u.drop, dropBuf);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    document.documentElement.classList.add("water-on");
    const mo = new MutationObserver(queueText);
    mo.observe(document.getElementById("root")!, { childList: true, subtree: true, characterData: true });
    const ro = new ResizeObserver(queueText);
    ro.observe(document.body);
    document.fonts.ready.then(queueText);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("water-on");
    };
  }, []);

  return <canvas ref={ref} className="water" aria-hidden="true" />;
};

export default WaterCanvas;
