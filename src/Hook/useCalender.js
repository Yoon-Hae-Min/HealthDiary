import moment from "moment";
import { useState } from "react";

const useCalender = () => {
  // user정보를 쭉 끌고와야함
  const currentDate = {
    year: moment().year(),
    month: moment().month(), //현제 나타내는 개월보다 1작음
    date: moment().date(),
  };
  const [date, setDate] = useState(currentDate);
  const getDatesOfCurrentMonth = () => {
    const calenderArr = [
      ...pushArrOfLastDates(),
      ...pushArrOfCurrentDates(),
      ...pushArrOfNextDates(),
    ];
    return calenderArr;
  };

  const firstDayOfThisMonth = moment([date.year, date.month, 1]).day();
  const lastDayOfThisMonth = moment([date.year, 0, 31]).month(date.month).day();
  const lastDateOfLastMonth = moment([date.year, 0, 31])
    .month(date.month - 1)
    .date();
  const lastDateOfThisMonth = moment([date.year, 0, 31])
    .month(date.month)
    .date();

  const pushArrOfLastDates = () => {
    let lastDates = lastDateOfLastMonth - firstDayOfThisMonth + 1;
    const isJanuary = date.month === 0;
    let lastMonth = date.month - 1;
    let lastYear = date.year;
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
      emptyArr[i] = { ...date, date: i + 1 };
    }
    return emptyArr;
  };
  const pushArrOfNextDates = () => {
    const isDecember = date.month === 11;
    let nextMonth = date.month + 1;
    let nextYear = date.year;
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
  return { date, setDate, getDatesOfCurrentMonth };
};

export default useCalender;
