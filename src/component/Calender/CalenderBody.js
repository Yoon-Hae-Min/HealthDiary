import { Col, Row, Toast } from "react-bootstrap";
import Week from "component/Calender/Week";
import Date from "component/Calender/Date/Date";
import moment from "moment";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "fbase";

const CalenderBody = ({
  date,
  userObj,
  getDatesOfCurrentMonth,
  ViewLastMonth,
  ViewNextMonth,
}) => {
  const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
  const today = {
    year: moment().year(),
    month: moment().month(),
    date: moment().date(),
  };

  const [calenderDBImpo, setCalenderDBImpo] = useState([]);
  // get Calender impormation in DB
  useEffect(() => {
    const Init = async () => {
      const calenderRef = query(
        collection(
          db,
          userObj.uid,
          JSON.stringify(date.year),
          JSON.stringify(date.month)
        )
      );

      const querySnapshot = await getDocs(calenderRef);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setCalenderDBImpo((pre) => [
            ...pre,
            { date: doc.id, data: doc.data() },
          ]);
        });
      }
    };
    setCalenderDBImpo([]);
    Init();
  }, [date]);
  return (
    <>
      <Row className="text-center border-bottom">
        {weekArr.map((week, index) => (
          <Col>
            <Week name={week} key={index} />
          </Col>
        ))}
      </Row>

      {getDatesOfCurrentMonth().map((weeks) => (
        <Row className="align-items-start border-bottom">
          {weeks.map((eachDate, index) => (
            <Col>
              {
                <Date
                  memo={calenderDBImpo.find(
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
                  ViewLastMonth={ViewLastMonth}
                  ViewNextMonth={ViewNextMonth}
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
