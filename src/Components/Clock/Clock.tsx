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
  let secondGrades = 0;
  const [amPm, setAmPm] = useState("");
  const [hour, setHour] = useState(time[0]);
  const [minute, setMinute] = useState(time[1]);
  const [second, setSecond] = useState("");
  let hourGrades = 30 * parseInt(hour);
  let minuteGrades = 6 * parseInt(minute);
  useEffect(() => {
    console.log("This Is  time:", time);
    let add = "";
    let defTime = "";
    time.map((x) => {
      if (x.split(" ").length >= 2) {
        add = x.split(" ").pop()!;
        setSecond(x.split(" ").shift()!);
        secondGrades = 6 * parseInt(second);
        setAmPm(add);
      }
    });
    time.pop();
    time.join(":");
    defTime = time.join(":") + " " + add;
    // setInterval(() => {
    //   if (parseInt(second) === 60) {
    //     setSecond("0");
    //     secondGrades = 0;
    //     let m = parseInt(minute);
    //     m++;
    //     setMinute(m.toString());
    //     minuteGrades += 6;
    //   }
    //   if (parseInt(minute) === 60) {
    //     setMinute("0");
    //     minuteGrades = 0;
    //     let h = parseInt(hour);
    //     h++;
    //     setHour(h.toString());
    //     hourGrades += 6;
    //   }
    //   let s = parseInt(second);
    //   s++;
    //   setSecond(s.toString());
    //   secondGrades += 6;
    // }, 1000);
    clearInterval;
  }, [second]);

  return (
    <div className="ThemeClock--container">
      <div className="ThemeClock--box">
        <div className="clock">
          <div className="visualClock">
            <div className="lines">
              <div className="center"></div>
              {/* <div className="h"
                        [ngStyle]="{'transform': 'translateY(' + -50 + '%) rotateZ(' + hourGrades + 'deg)'}"></div>
                    <div className="m"
                        [ngStyle]="{'transform': 'translateY(' + -50 + '%) rotateZ(' + minuteGrades + 'deg)'}"></div>
                    <div className="s"
                        [ngStyle]="{'transform': 'translateY(' + -50 + '%) rotateZ(' + secondGrades + 'deg)'}">
                    </div> */}
            </div>
          </div>
          <div className="dateClock">
            <div className="time">
              <div className="hour">{hour}</div>
              <div className="minute">{minute}</div>
              <div className="amPm">{amPm}</div>
            </div>
            <div className="date">
              <div className="day">{day}</div>
              <div className="month">{month}</div>
              <div className="dayN">{dayNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
