import moment from "moment";
import { useState } from "react";

const useCalender = () => {
  // user정보를 쭉 끌고와야함
  const currentDate = {
    year: moment().year(),
    month: moment().month(), //현제 나타내는 개월보다 1작음
    date: moment().date(),
  };
  const [dates, setDates] = useState(currentDate);
  const [month, setMonth] = useState(currentDate.month);

  const getDatesOfCurrentMonth = () => {
    const calenderArr = [
      ...pushArrOfLastDates(),
      ...pushArrOfCurrentDates(),
      ...pushArrOfNextDates(),
    ];
    const returnArr = new Array(calenderArr.length / 7);
    for (let i = 0; i < returnArr.length; i++) {
      returnArr[i] = new Array(7);
    }
    for (let i = 0; i < calenderArr.length / 7; i++) {
      for (let j = 0; j < 7; j++) {
        returnArr[i][j] = calenderArr[i * 7 + j];
      }
    }
    return returnArr;
  };

  const firstDayOfThisMonth = moment([dates.year, dates.month, 1]).day();
  const lastDayOfThisMonth = moment([dates.year, 0, 31])
    .month(dates.month)
    .day();
  const lastDateOfLastMonth = moment([dates.year, 0, 31])
    .month(dates.month - 1)
    .date();
  const lastDateOfThisMonth = moment([dates.year, 0, 31])
    .month(dates.month)
    .date();

  const pushArrOfLastDates = () => {
    let lastDates = lastDateOfLastMonth - firstDayOfThisMonth + 1;
    const isJanuary = dates.month === 0;
    let lastMonth = dates.month - 1;
    let lastYear = dates.year;
    if (isJanuary) {
      lastMonth = 11;
      lastYear -= 1;
    }
    const emptyArr = new Array(firstDayOfThisMonth);
    for (let i = 0; i < firstDayOfThisMonth; i++) {
      emptyArr[i] = { year: lastYear, month: lastMonth, date: lastDates }; //1월일때 0이 나옴
      lastDates += 1;
    }
    return emptyArr;
  };
  const pushArrOfCurrentDates = () => {
    const emptyArr = new Array(lastDateOfThisMonth);
    for (let i = 0; i < lastDateOfThisMonth; i++) {
      emptyArr[i] = { ...dates, date: i + 1 };
    }
    return emptyArr;
  };
  const pushArrOfNextDates = () => {
    const isDecember = dates.month === 11;
    let nextMonth = dates.month + 1;
    let nextYear = dates.year;
    if (isDecember) {
      nextMonth = 0;
      nextYear += 1;
    }
    const emptyArr = new Array(6 - lastDayOfThisMonth);
    for (let i = 1; i <= 6 - lastDayOfThisMonth; i++) {
      emptyArr[i - 1] = { year: nextYear, month: nextMonth, date: i };
    }
    return emptyArr;
  };
  return {
    Month: month,
    setMonth: setMonth,
    date: dates,
    setDate: setDates,
    getDatesOfCurrentMonth,
  };
};

export default useCalender;
