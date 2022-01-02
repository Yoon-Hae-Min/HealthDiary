import Date from "component/Date";
import TodayToDo from "component/TodayToDo";
import Week from "component/Week";
import useCalender from "Hook/useCalender";
import moment from "moment";
import { useState } from "react";
import style from "../css/Calender.module.css";

const Calender = ({ userObj }) => {
  const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
  const { date, setDate, getDatesOfCurrentMonth } = useCalender(); //month가 하루씩 당겨짐 ex 12월은 11월
  const today = {
    year: moment().year(),
    month: moment().month(),
    date: moment().date(),
  };
  const [clickedDate, setClickedDate] = useState(date);
  const LastMonthClick = () => {
    if (date.month <= 0) {
      setDate((pre) => ({ year: pre.year - 1, month: 11, date: pre.date }));
    } else {
      setDate((pre) => ({
        year: pre.year,
        month: pre.month - 1,
        date: pre.date,
      }));
    }
  };

  const NextMonthClick = () => {
    if (date.month >= 11) {
      setDate((pre) => ({ year: pre.year + 1, month: 0, date: pre.date }));
    } else {
      setDate((pre) => ({
        year: pre.year,
        month: pre.month + 1,
        date: pre.date,
      }));
    }
  };
  const DateClick = (date) => {
    setClickedDate(date);
  };
  console.log(date);
  return (
    <>
      {userObj && (
        <div className={style.container}>
          <span>{date.year}년</span>
          <div>
            <button onClick={LastMonthClick}>←</button>
            <span>{date.month + 1}월</span>
            <button onClick={NextMonthClick}>→</button>
          </div>
          <div className={style.calender}>
            {weekArr.map((week, index) => (
              <Week name={week} key={index} />
            ))}
          </div>
          <div className={style.date}>
            {getDatesOfCurrentMonth().map((eachDate, index) => (
              <Date
                date={eachDate}
                istoday={
                  today.year === eachDate.year &&
                  today.month === eachDate.month &&
                  today.date === eachDate.date
                }
                key={index}
                DateClick={DateClick}
              />
            ))}
          </div>
          <TodayToDo userObj={userObj} date={clickedDate} />
        </div>
      )}
    </>
  );
};

export default Calender;
