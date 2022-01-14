import ToDidList from "component/pages/ToDidList";
import style from "css/Date.module.css";
import { db } from "fbase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, Toast } from "react-bootstrap";

const Date = ({ date, istoday, userObj, memo }) => {
  const [todayTodoSwitch, setTodayTodoSwitch] = useState(false);
  const [clickedDate, setClickedDate] = useState(date);
  const sendDateToParent = (event) => {
    setClickedDate(date);
    toggleshowMode();
  };
  //console.log(typeof date);
  const toggleshowMode = () => {
    setTodayTodoSwitch((pre) => !pre);
  };

  return (
    <>
      <div
        onClick={sendDateToParent}
        className={istoday ? style.today : "false"}
        style={{ height: "12vh" }}
      >
        <h6>{date.date}</h6>
        <p style={{ fontSize: "0.8em" }}>{memo && memo.data.workoutPart}</p>
      </div>
      <Toast
        className="position-absolute top-50 start-50 translate-middle"
        onClose={toggleshowMode}
        show={todayTodoSwitch}
        bg="light"
      >
        <Toast.Header>
          <strong className="me-auto">운동기록</strong>
        </Toast.Header>
        <Toast.Body>
          <ToDidList userObj={userObj} date={clickedDate} memo={memo} />
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Date;
