import ToDidList from "component/Calender/Date/ToDidList";
import style from "css/Date.module.css";
import { db } from "fbase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, Toast } from "react-bootstrap";
import DateToast from "./DateToast";

const Date = ({
  eachDate,
  date,
  istoday,
  userObj,
  memo,
  ViewLastMonth,
  ViewNextMonth,
}) => {
  const [toDidListSwitch, setToDidListSwitch] = useState(false);
  const DateClick = (event) => {
    //굉장히 조건문이 난잡
    if (date.month === eachDate.month) {
      toggleshowMode();
    } else if (
      (date.year === eachDate.year && date.month > eachDate.month) ||
      date.year > eachDate.year
    ) {
      ViewLastMonth();
    } else if (
      (date.year === eachDate.year && date.month < eachDate.month) ||
      date.year < eachDate.year
    ) {
      ViewNextMonth();
    }
  };
  const toggleshowMode = () => {
    setToDidListSwitch((pre) => !pre);
  };
  return (
    <>
      <div
        onClick={DateClick}
        className={istoday ? style.today : "false"}
        style={{ height: "12vh" }}
      >
        <h6>{eachDate.date}</h6>
        <p style={{ fontSize: "0.8em" }}>{memo && memo.data.workoutPart}</p>
      </div>
      {date.month === eachDate.month && (
        <DateToast
          toggleshowMode={toggleshowMode}
          toDidListSwitch={toDidListSwitch}
          userObj={userObj}
          eachDate={eachDate}
          memo={memo}
        />
      )}
    </>
  );
};

export default Date;
