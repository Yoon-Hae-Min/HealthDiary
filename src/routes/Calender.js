import Date from "component/Date";
import TodayToDo from "component/TodayToDo";
import Week from "component/Week";
import useCalender from "Hook/useCalender";
import moment from "moment";
import { useState } from "react";
import style from "../css/Calender.module.css";

const Calender = () => {
  // 지금 달력이 안나옴
  const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
  const { date, setDate, getDatesOfCurrentMonth } = useCalender(); //month가 하루씩 당겨짐 ex 12월은 11월
  const today = moment().format("YYYYMMD");
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

  // useEffect(() => {
  //   setCalender(getCalender(currentMonth));
  // }, [currentMonth]);
  const DateClick = (date) => {
    setClickedDate(date);
  };
  return (
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
              date.month === eachDate.month && date.date === eachDate.date
            }
            key={index}
            DateClick={DateClick}
          />
        ))}
        {/* {calender.map((date, index) => (
          <Date
            date={date[0]}
            istoday={today === date[1]}
            fulldate={date[1]}
            key={index}
            onClick={DateClick}
          />
        ))} */}
      </div>
      <TodayToDo date={clickedDate} />
    </div>
  );
};

export default Calender;
