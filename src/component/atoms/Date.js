import style from "css/Date.module.css";
import { db } from "fbase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Date = ({ date, istoday, DateClick, userObj }) => {
  const [todayRecord, setTodayRecord] = useState("");
  const sendDateToParent = (event) => {
    DateClick(date);
  };
  const getData = async () => {
    const todayRecordRef = doc(
      db,
      userObj.uid,
      "Calender",
      "record",
      JSON.stringify(date)
    );
    const getTodayRecord = await getDoc(todayRecordRef);
    if (getTodayRecord.exists()) {
      setTodayRecord(getTodayRecord.data());
    } else {
      setTodayRecord("");
    }
  };
  useEffect(() => {
    getData();
  }, [date]);

  return (
    <div
      onClick={sendDateToParent}
      className={istoday ? style.today : "false"}
      style={{ height: "12vh" }}
    >
      <h6>{date.date}</h6>
      <p style={{ fontSize: "0.8em" }}>{todayRecord.workoutPart}</p>
    </div>
  );
};

export default Date;
