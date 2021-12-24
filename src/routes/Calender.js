import Date from "component/Date";
import TodayToDo from "component/TodayToDo";
import Week from "component/Week";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import style from "../css/Calender.module.css";

const getCalender = (month) => {
  //logic을 수정해서 hook으로 만들어야함
  const calenderArr = [];
  const currentYear = moment().year();
  const firstDayOfThisMonth = moment([currentYear, month, 1]).day();
  const lastDayOfThisMonth = moment([currentYear, 0, 31]).month(month).day();
  const lastDateOfLastMonth = moment([currentYear, 0, 31])
    .month(month - 1)
    .date();
  const lastDateOfThisMonth = moment([currentYear, 0, 31]).month(month).date();
  // const lastDateOfCurrMonth;
  //console.log(firstDayOfThisMonth);
  //console.log(lastDayOfThisMonth);
  //console.log(lastDateOfLastMonth);

  const getDatesOfCurrentMonth = () => {
    //return해야함
    pushArrOfLastDates();
    pushArrOfCurrentDates();
    pushArrOfNextDates();
  };
  const pushArrOfLastDates = () => {
    let lastDates = lastDateOfLastMonth - firstDayOfThisMonth + 1;
    while (lastDates <= lastDateOfLastMonth) {
      calenderArr.push([lastDates, `${currentYear}${month}${lastDates}`]);
      lastDates += 1;
    }
  };
  const pushArrOfCurrentDates = () => {
    for (let i = 1; i <= lastDateOfThisMonth; i++) {
      calenderArr.push([i, `${currentYear}${month + 1}${i}`]);
    }
  };
  const pushArrOfNextDates = () => {
    for (let i = 1; i <= 6 - lastDayOfThisMonth; i++) {
      calenderArr.push([i, `${currentYear}${month + 2}${i}`]);
    }
  };
  getDatesOfCurrentMonth();
  return calenderArr;
};

const Calender = () => {
  const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentMonth, setCurrentMonth] = useState(moment().month());
  const [currentYear, setCurrentYear] = useState(moment().years());
  const [calender, setCalender] = useState(getCalender(currentMonth));
  const today = moment().format("YYYYMMD");
  const [clickDate, setClickDate] = useState(today);
  const LastMonthClick = () => {
    if (currentMonth <= 0) {
      setCurrentMonth(11);
      setCurrentYear((pre) => pre - 1);
    } else {
      setCurrentMonth((current) => current - 1);
    }
  };

  const NextMonthClick = () => {
    if (currentMonth >= 11) {
      setCurrentMonth(0);
      setCurrentYear((pre) => pre + 1);
    } else {
      setCurrentMonth((current) => current + 1);
    }
  };
  useEffect(() => {
    setCalender(getCalender(currentMonth));
  }, [currentMonth]);

  const DateClick = (event) => {
    setClickDate(event.target.id);
  };
  return (
    <div className={style.container}>
      <span>{currentYear}년</span>
      <div>
        <button onClick={LastMonthClick}>←</button>
        <span>{currentMonth + 1}월</span>
        <button onClick={NextMonthClick}>→</button>
      </div>
      <div className={style.calender}>
        {weekArr.map((week, index) => (
          <Week name={week} key={index} />
        ))}
      </div>
      <div className={style.date}>
        {calender.map((date, index) => (
          <Date
            date={date[0]}
            istoday={today === date[1]}
            fulldate={date[1]}
            key={index}
            onClick={DateClick}
          />
        ))}
      </div>
      <TodayToDo date={clickDate} />
    </div>
  );
};

export default Calender;
