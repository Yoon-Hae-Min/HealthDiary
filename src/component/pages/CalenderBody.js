import { Col, Row, Toast } from "react-bootstrap";
import Week from "component/atoms/Week";
import TodayToDo from "./TodayToDo";
import Date from "component/atoms/Date";
import moment from "moment";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "fbase";

const CalenderBody = ({ date, userObj, getDatesOfCurrentMonth }) => {
  const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
  const today = {
    year: moment().year(),
    month: moment().month(),
    date: moment().date(),
  };
  const [clickedDate, setClickedDate] = useState(date);
  const [todayTodoSwitch, setTodayTodoSwitch] = useState(false);
  const [currentMonthDB, setCurrentMonthDB] = useState([]);
  const DateClick = (date) => {
    setClickedDate(date);
  };

  const toggleshowMode = () => {
    setTodayTodoSwitch((pre) => !pre);
  };
  useEffect(() => {
    // 이로직을Hook으로 따로 뽑아서 값을 return시켜서 랜더링을 안하도록 하기
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
      } else {
        setCurrentMonthDB([]);
      }
    };
    a();
  }, [date]);
  //console.log(currentMonthDB);
  //const a = currentMonthDB.find((item) => item.date === "12");
  //console.log(a);
  console.log(clickedDate);
  return (
    <>
      <Row className="text-center border-bottom">
        {weekArr.map((week, index) => (
          <Col style={{ padding: 0 }}>
            <Week name={week} key={index} />
          </Col>
        ))}
      </Row>
      <Toast
        onClose={toggleshowMode}
        show={todayTodoSwitch}
        style={{ position: "fixed" }}
        position="top-start"
      >
        <Toast.Header>
          <strong className="me-auto">운동기록</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>
          <TodayToDo
            userObj={userObj}
            date={clickedDate}
            memo={currentMonthDB.find(
              (item) => item.date === String(clickedDate.date)
            )}
          />
        </Toast.Body>
      </Toast>
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
                  date={eachDate}
                  istoday={
                    today.year === eachDate.year &&
                    today.month === eachDate.month &&
                    today.date === eachDate.date
                  }
                  userObj={userObj}
                  key={index}
                  DateClick={DateClick}
                  toggleshowMode={toggleshowMode}
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
