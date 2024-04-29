import { useEffect, useState } from "react";
import "./Clock.scss";

const Clock = () => {
  let today = new Date();
  let now = today.toLocaleTimeString("en-US");
  let time = now.split(":");
  let nowFormat = new Date().toDateString();
  let timeFormat = nowFormat.split(" ");
  let day = timeFormat[0];
  let month = timeFormat[1];
  let dayNumber = timeFormat[2];
  const [hour, setHour] = useState(time[0]);
  const [minute, setMinute] = useState(time[1]);
  const [second, setSecond] = useState(now.split(":")[2].split(" ")[0]);
  const [defTime, setDefTime] = useState("");
  const [secondGrades, setSecondGrades] = useState(6 * parseInt(second));
  const [minuteGrades, setMinuteGrades] = useState(6 * parseInt(minute));
  const [hourGrades, setHourGrades] = useState(30 * parseInt(hour));
  useEffect(() => {
    time.map((x) => {
      if (x.split(" ").length >= 2) {
        setSecond(x.split(" ").shift()!);
      }
    });
    let amPm = time.pop();
    setDefTime(time.join(" : ") + " " + amPm!.split(" ").pop());
    const myTimeout = setTimeout(() => {
      setSecondGrades(6 * parseInt(second));
      setSecond((parseInt(second) + 1).toString());
      if (parseInt(second) >= 60) {
        // setSecond("0");
        // setSecondGrades(0);
        setMinute((parseInt(minute) + 1).toString());
        setMinuteGrades(6 * (parseInt(minute) + 1));
      }
      if (parseInt(minute) >= 60) {
        setMinute("0");
        // setMinuteGrades(0);
        setHour((parseInt(hour) + 1).toString());
        setHourGrades(30 * (parseInt(hour) + 1));
      }
      clearTimeout(myTimeout);
    }, 1000);
    return;
  }, [second]);

  return (
    <div className="ThemeClock--container">
      <div className="ThemeClock--box">
        <div className="clock">
          <div className="visualClock">
            <div className="lines">
              <div className="center"></div>
              <div
                className="h"
                style={{
                  transform:
                    "translateY(" + -50 + "%) rotateZ(" + hourGrades + "deg)",
                }}
              ></div>
              <div
                className="m"
                style={{
                  transform:
                    "translateY(" + -50 + "%) rotateZ(" + minuteGrades + "deg)",
                }}
              ></div>
              <div
                className="s"
                style={{
                  transform:
                    "translateY(" + -50 + "%) rotateZ(" + secondGrades + "deg)",
                }}
              ></div>
            </div>
          </div>
          <div className="dateClock">
            <div className="time">
              <div className="digit">{defTime}</div>
            </div>
            <div className="date">
              <div className="month">{month}</div>
              <div className="day">{day}</div>
              <div className="dayN">{dayNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
