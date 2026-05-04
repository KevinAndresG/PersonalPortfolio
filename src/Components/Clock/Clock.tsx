import { useEffect, useState } from "react";
import "./Clock.scss";

const pad = (n: number) => String(n).padStart(2, "0");

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = pad(time.getHours());
  const m = pad(time.getMinutes());
  const s = pad(time.getSeconds());
  const dayName = time
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
  const dateStr = time.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const secPct = (time.getSeconds() / 59) * 100;

  return (
    <div className="hud-clock">
      <div className="hud-top">
        <span className="hud-dot" />
      </div>
      <div className="hud-time">
        <span className="hud-seg">{h}</span>
        <span className="hud-colon">:</span>
        <span className="hud-seg">{m}</span>
        <span className="hud-colon">:</span>
        <span className="hud-seg hud-sec">{s}</span>
      </div>
      <div className="hud-bar-wrap">
        <div className="hud-bar-fill" style={{ width: `${secPct}%` }} />
      </div>
      <div className="hud-bottom">
        <span className="hud-day">{dayName}</span>
        <span className="hud-date">{dateStr}</span>
      </div>
    </div>
  );
};

export default Clock;
