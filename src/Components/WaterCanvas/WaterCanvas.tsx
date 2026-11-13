import { useEffect, useRef } from "react";

/**
 * One persistent WebGL layer behind every page: deep water, pointer ripples,
 * and metaball droplets that refract everything under them — including the
 * page titles, which are drawn into a texture from any DOM node marked
 * `data-water` (the DOM text stays for a11y and turns transparent).
 */

const MAX_RIP = 16;
const MAX_DROP = 18;

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes, uView, uOrigin;
uniform float uDpr, uTime, uScroll, uReveal;
uniform int uPass; // 0: the water itself, 1: only the cursor drop's meniscus, over the UI
uniform vec2 uMouse;
uniform vec4 uRip[${MAX_RIP}];
uniform vec3 uDrop[${MAX_DROP}];
uniform sampler2D uText;
uniform int uNDrop, uNRip;

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
// metaball field and gradient, plus the same field offset down-right for the
// contact shadow, in one pass over the live drops only
float field(vec2 p, out vec2 g, out float fs){
  float f = 0.; g = vec2(0.); fs = 0.;
  for (int i = 0; i < ${MAX_DROP}; i++){
    if (i >= uNDrop) break;
    vec3 d = uDrop[i];
    vec2 v = p - d.xy; float q = dot(v, v) + 1.; float r2 = d.z * d.z;
    f += r2 / q; g += -2. * r2 * v / (q * q);
    vec2 vs = v - vec2(5., 9.);
    fs += r2 / (dot(vs, vs) + 1.);
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
  vec2 p = vec2(gl_FragCoord.x, uView.y * uDpr - gl_FragCoord.y) / uDpr + uOrigin;
  vec2 L = normalize(vec2(-.6, -.8));

  // droplets: both layers shade the whole field, so the cursor drop merges with
  // the others. Around the cursor (c = 1) the top layer draws it, over the UI;
  // further out the water does, with a soft hand-over between the two.
  vec2 g; float fs; float f = field(p, g, fs);
  float ms = smoothstep(1., 1.12, f);
  float es = 1. - clamp((f - 1.) / 1.6, 0., 1.);
  vec2 n2 = (dot(g, g) > 0. ? -normalize(g) : vec2(0.)) * es;
  // contact shadow, dark rim, crisp highlight, inner glow
  float shade = (1. - .45 * smoothstep(.8, 1.1, fs) * (1. - ms)) * (1. - .38 * ms * es * es * es);
  vec3 light = ms * vec3(.02, .04, .09)
    + vec3(1.) * smoothstep(.5, .78, pow(max(dot(n2, L), 0.), 3.) * ms) * .8
    + vec3(.45, .72, 1.) * pow(max(dot(n2, -L), 0.), 2.) * ms * .5;
  // ponytail: fade ends at 56px, inside the 120px top canvas (TOP / 2 = 60)
  float c = uDrop[0].z > .5 ? 1. - smoothstep(34., 56., length(p - uDrop[0].xy)) : 0.;
  if (uPass == 1){
    // premultiplied: darkens what is under it by shade, then adds the light
    gl_FragColor = vec4(light, 1. - shade) * c;
    return;
  }
  shade = mix(1., shade, 1. - c);
  light *= 1. - c;

  // ripples: expanding rings, summed as a slope field
  vec2 off = vec2(0.);
  for (int i = 0; i < ${MAX_RIP}; i++){
    if (i >= uNRip) break;
    vec4 r = uRip[i];
    float age = uTime - r.z;
    vec2 v = p - r.xy; float d = length(v) + .001;
    float x = d - age * 240.; float w = 30. + age * 18.;
    off += v / d * cos(x * .16) * exp(-x * x / (w * w)) * r.w * exp(-age * 1.3);
  }

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

  col += vec3(.35, .6, 1.) * max(dot(off, L), 0.) * .45;
  col *= 1. - .25 * max(dot(off, -L), 0.);

  col = col * shade + light;

  col *= 1. - .35 * pow(length((p / uRes - .5) * vec2(1.1, 1.3)), 2.2);
  col += (hash(gl_FragCoord.xy + uTime) - .5) * .018;
  gl_FragColor = vec4(col, 1.);
}`;

type Drop = { x: number; y: number; vx: number; vy: number; r: number; sp: number; ph: number; free: number; home: number };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const motionOn = () => document.documentElement.dataset.motion !== "off";
const TOP = 120; // css px of the canvas that carries the cursor drop over the UI

/** Compiles FRAG on a full-screen triangle; returns a uniform lookup, or null. */
const setup = (gl: WebGLRenderingContext) => {
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
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  return (n: string) => gl.getUniformLocation(prog, n);
};

const WaterCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return; // CSS fallback background stays, DOM titles stay visible
    const U = setup(gl);
    if (!U) return;
    const u = {
      res: U("uRes"), view: U("uView"), dpr: U("uDpr"), time: U("uTime"), scroll: U("uScroll"),
      reveal: U("uReveal"), mouse: U("uMouse"), rip: U("uRip"), drop: U("uDrop"), nDrop: U("uNDrop"), nRip: U("uNRip"),
    };

    // the cursor drop is one drop in two layers: the water above refracts what is
    // under it, and this small transparent canvas above the UI draws its meniscus,
    // so it reads the same over the background, the nav and the buttons
    const top = document.createElement("canvas");
    top.className = "water-top";
    top.setAttribute("aria-hidden", "true");
    const tgl = top.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true });
    const TU = tgl && setup(tgl);
    const tu = TU && { view: TU("uView"), origin: TU("uOrigin"), dpr: TU("uDpr"), drop: TU("uDrop"), nDrop: TU("uNDrop") };
    if (tgl && TU && tu) {
      tgl.uniform1i(TU("uPass"), 1);
      tgl.uniform2f(tu.view, TOP, TOP);
      document.body.appendChild(top);
    }

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
    const ripLive = new Float32Array(MAX_RIP * 4);
    // resolution scale: drops a step whenever frames run long, so weak GPUs stay smooth
    let quality = 1, slow = 0, sampled = 0;
    const dropBuf = new Float32Array(MAX_DROP * 3);
    let ripIdx = 0;

    const addRipple = (x: number, y: number, amp: number) => {
      rip.set([x, y, time, amp], ripIdx * 4);
      ripIdx = (ripIdx + 1) % MAX_RIP;
    };

    // ── droplets: slot 0 is the cursor, the rest slide down the glass ──
    const cur = { x: -999, y: -999, tx: -999, ty: -999, r: 0, target: 0, mx: -999, my: -999, down: false, hot: false, held: false, inside: false };
    const drops: Drop[] = [];
    let base = 0; // resting population; splits add to it until the extras run off the glass
    const spawn = (d: Drop, top: boolean) => {
      d.r = d.home = rand(11, W < 700 ? 24 : 38);
      d.x = rand(0, W);
      d.y = top ? -d.r * 2 - rand(0, 240) : rand(0, H);
      d.vx = d.vy = d.free = 0;
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
      dpr = Math.min(window.devicePixelRatio || 1, 1.5) * quality;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.view, W, H);
      if (tgl && tu) {
        top.width = top.height = Math.round(TOP * dpr);
        tgl.viewport(0, 0, top.width, top.height);
        tgl.uniform1f(tu.dpr, dpr);
      }
      base = W < 700 ? 5 : 9;
      while (drops.length < base) { const d = {} as Drop; spawn(d, false); drops.push(d); }
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
      const el = e.target as Element | null;
      cur.hot = !!el?.closest?.("a,button");
      // inside a container the drop has poured into it, so it is drawn there instead
      cur.held = !!el?.closest?.("[data-pour]");
    };
    const onDown = (e: PointerEvent) => {
      if (!motionOn()) return;
      cur.down = true;
      addRipple(e.clientX, e.clientY, 1);
      for (const d of [...drops]) {
        const dx = d.x - e.clientX, dy = d.y - e.clientY, dist = Math.hypot(dx, dy);
        if (dist < d.r * 1.4 + 14 && d.r >= 11) {
          // a hit drop bursts into smaller ones that share its volume
          const n = Math.min(d.r > 24 ? 4 : d.r > 16 ? 3 : 2, MAX_DROP - drops.length);
          if (n < 2) continue;
          const r = d.r / Math.sqrt(n), a0 = rand(0, 6.28);
          for (let i = 0; i < n; i++) {
            const a = a0 + (i / n) * 6.28 + rand(-0.3, 0.3), v = rand(300, 460);
            const piece = i === 0 ? d : ({ ...d } as Drop);
            piece.r = r * rand(0.85, 1.15);
            piece.x = d.x + Math.cos(a) * r * 0.6; piece.y = d.y + Math.sin(a) * r * 0.6;
            piece.vx = Math.cos(a) * v; piece.vy = Math.sin(a) * v;
            piece.sp = rand(7, 20) * (piece.r / 24); piece.ph = rand(0, 6.28);
            piece.free = 2.2;
            if (i > 0) drops.push(piece);
          }
        } else if (dist < 260) {
          const k = (1 - dist / 260) * 520;
          d.vx += (dx / (dist + 1)) * k; d.vy += (dy / (dist + 1)) * k;
          d.free = 1.2;
        }
      }
    };
    const onUp = () => { cur.down = false; };
    const onLeave = () => { cur.inside = false; };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const on = motionOn();
      const prev = last;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (on) time += dt;

      // like a pointer cursor, the drop tightens over anything clickable
      cur.target = !on || !cur.inside || cur.held ? 0 : cur.down ? 11 : cur.hot ? 13 : 22;
      cur.r += (cur.target - cur.r) * (1 - Math.exp(-10 * dt));
      cur.x += (cur.tx - cur.x) * (1 - Math.exp(-14 * dt));
      cur.y += (cur.ty - cur.y) * (1 - Math.exp(-14 * dt));
      let nd = 0;
      const put = (x: number, y: number, r: number) => {
        dropBuf[nd * 3] = x; dropBuf[nd * 3 + 1] = y; dropBuf[nd * 3 + 2] = r; nd++;
      };
      // slot 0 is always the cursor (radius 0 when hidden): the shader shades it on top
      put(cur.x, cur.y, cur.r >= 0.5 ? cur.r : 0);

      drops.forEach((d, i) => {
        if (on) {
          const dx = cur.x - d.x, dy = cur.y - d.y, dist = Math.hypot(dx, dy);
          d.free -= dt;
          if (d.free <= 0 && cur.r > 1 && dist < 190 && dist > (cur.r + d.r) * 0.6) {
            const k = (1 - dist / 190) * 520 * dt;
            d.vx += (dx / dist) * k; d.vy += (dy / dist) * k;
          }
          const damp = Math.exp(-3 * dt);
          d.vx *= damp; d.vy *= damp;
          // stick-slip: drops on glass pause, then run
          const slide = d.sp * (0.3 + 0.7 * Math.max(0, Math.sin(time * 0.4 + d.ph)));
          d.x += d.vx * dt; d.y += (d.vy + slide) * dt;
          // after a burst the original condenses back to full size; the extra
          // pieces (always appended past `base`) evaporate
          if (d.free <= 0) {
            if (i >= base) { d.r -= dt * 2; if (d.r < 4) d.r = 0; }
            else if (d.r < d.home) d.r = Math.min(d.home, d.r + dt * 5);
          }
          if (d.y - d.r * 2 > H || d.x < -80 || d.x > W + 80) {
            if (drops.length > base) d.r = 0; else spawn(d, true);
          }
        }
        if (d.r > 0 && d.y > -d.r * 3) put(d.x, d.y, d.r);
      });
      for (let i = drops.length - 1; i >= 0; i--) if (drops[i].r === 0) drops.splice(i, 1);

      const rv = Math.min((now - revealAt) / 1300, 1); // wall clock, so a slow frame rate never stalls it
      gl.uniform2f(u.res, W, H);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.time, time);
      gl.uniform1f(u.scroll, window.scrollY);
      gl.uniform1f(u.reveal, 1 - Math.pow(1 - rv, 3));
      gl.uniform2f(u.mouse, cur.inside ? cur.x : W * 0.3, cur.inside ? cur.y : H * 0.4);
      let nr = 0;
      for (let i = 0; i < MAX_RIP; i++) {
        const age = time - rip[i * 4 + 2];
        if (rip[i * 4 + 3] > 0 && age >= 0 && age < 4) ripLive.set(rip.subarray(i * 4, i * 4 + 4), nr++ * 4);
      }
      gl.uniform4fv(u.rip, ripLive);
      gl.uniform1i(u.nRip, nr);
      gl.uniform1i(u.nDrop, nd);
      gl.uniform3fv(u.drop, dropBuf);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (tgl && tu) {
        if (cur.r >= 0.5) {
          const ox = Math.round(cur.x - TOP / 2), oy = Math.round(cur.y - TOP / 2);
          top.style.transform = `translate(${ox}px, ${oy}px)`;
          top.style.visibility = "visible";
          tgl.uniform2f(tu.origin, ox, oy);
          // every drop, so the ones near the cursor merge with it here too
          tgl.uniform1i(tu.nDrop, nd);
          tgl.uniform3fv(tu.drop, dropBuf);
          tgl.drawArrays(tgl.TRIANGLES, 0, 3);
        } else top.style.visibility = "hidden";
      }

      // frames over 100ms are a throttled background tab, not a slow GPU
      const ms = now - prev;
      if (ms < 100) { sampled++; if (ms > 22) slow++; }
      if (sampled >= 90) {
        if (slow > 30 && quality > 0.5) { quality -= 0.2; resize(); }
        sampled = slow = 0;
      }
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
      top.remove();
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
