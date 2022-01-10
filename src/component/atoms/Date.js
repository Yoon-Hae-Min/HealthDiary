import TodayToDo from "component/pages/TodayToDo";
import style from "css/Date.module.css";
import { db } from "fbase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, Toast } from "react-bootstrap";

const Date = ({ date, istoday, DateClick, userObj, toggleshowMode, memo }) => {
  const sendDateToParent = (event) => {
    DateClick(date);
    toggleshowMode();
  };
  //console.log(typeof date);

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
    </>
  );
};

export default Date;
