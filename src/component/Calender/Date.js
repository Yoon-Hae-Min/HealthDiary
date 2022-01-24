import ToDidList from "component/Calender/ToDidList";
import style from "css/Date.module.css";
import { db } from "fbase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, Toast } from "react-bootstrap";

const Date = ({
  eachDate,
  date,
  istoday,
  userObj,
  memo,
  LastMonthClick,
  NextMonthClick,
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
      LastMonthClick();
    } else if (
      (date.year === eachDate.year && date.month < eachDate.month) ||
      date.year < eachDate.year
    ) {
      NextMonthClick();
    }
  };
  //console.log(typeof date);
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
      {date.month === eachDate.month ? (
        <Toast
          className="position-absolute top-50 start-50 translate-middle"
          onClose={toggleshowMode}
          show={toDidListSwitch}
          bg="light"
        >
          <Toast.Header>
            <strong className="me-auto">운동기록</strong>
          </Toast.Header>
          <Toast.Body>
            <ToDidList userObj={userObj} date={eachDate} memo={memo} />
          </Toast.Body>
        </Toast>
      ) : (
        <></>
      )}
    </>
  );
};

export default Date;
