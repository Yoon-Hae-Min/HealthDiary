import moment from "moment";
import { useState } from "react";

const useCalender = () => {
  // user정보를 쭉 끌고와야함
  const currentDate = {
    year: moment().year(),
    month: moment().month(),
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
    const isJanuary = date.month === 1;
    let lastMonth = date.month - 1;
    if (isJanuary) {
      lastMonth = 12;
    }
    const emptyArr = new Array(firstDayOfThisMonth);
    for (let i = 0; i < firstDayOfThisMonth; i++) {
      emptyArr[i] = { year: date.year, month: lastMonth, date: lastDates }; //1월일때 0이 나옴
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
    const isDecember = date.month === 12;
    let nextMonth = date.month + 1;
    if (isDecember) {
      nextMonth = 1;
    }
    const emptyArr = new Array(6 - lastDayOfThisMonth);
    for (let i = 1; i <= 6 - lastDayOfThisMonth; i++) {
      emptyArr[i - 1] = { ...date, month: nextMonth, date: i };
    }
    return emptyArr;
  };
  return { date, setDate, getDatesOfCurrentMonth };
};

export default useCalender;
