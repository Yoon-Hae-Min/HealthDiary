import { Col, Row, Toast } from "react-bootstrap";
import Week from "component/Calender/Week";
import ToDidList from "./ToDidList";
import Date from "component/Calender/Date";
import moment from "moment";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "fbase";

const CalenderBody = ({
  date,
  userObj,
  getDatesOfCurrentMonth,
  LastMonthClick,
  NextMonthClick,
}) => {
  const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
  const today = {
    year: moment().year(),
    month: moment().month(),
    date: moment().date(),
  };

  const [currentMonthDB, setCurrentMonthDB] = useState([]);

  useEffect(() => {
    const a = async () => {
      const q = query(
        collection(
          db,
          userObj.uid,
          JSON.stringify(date.year),
          JSON.stringify(date.month)
        )
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setCurrentMonthDB((pre) => [
            ...pre,
            { date: doc.id, data: doc.data() },
          ]);
        });
      }
    };
    setCurrentMonthDB([]);
    a();
    console.log("데이터를 가져왔습니다");
  }, [date]);
  //console.log(currentMonthDB);
  //const a = currentMonthDB.find((item) => item.date === "12");
  //console.log(a);
  return (
    <>
      <Row className="text-center border-bottom">
        {weekArr.map((week, index) => (
          <Col style={{ padding: 0 }}>
            <Week name={week} key={index} />
          </Col>
        ))}
      </Row>

      {getDatesOfCurrentMonth().map((weeks) => (
        <Row className="align-items-start border-bottom">
          {weeks.map((eachDate, index) => (
            <Col style={{ padding: 0 }}>
              {
                <Date
                  memo={currentMonthDB.find(
                    (item) =>
                      item.date === String(eachDate.date) &&
                      eachDate.month === date.month
                  )}
                  eachDate={eachDate}
                  date={date}
                  istoday={
                    today.year === eachDate.year &&
                    today.month === eachDate.month &&
                    today.date === eachDate.date
                  }
                  userObj={userObj}
                  key={index}
                  LastMonthClick={LastMonthClick}
                  NextMonthClick={NextMonthClick}
                />
              }
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export default CalenderBody;
