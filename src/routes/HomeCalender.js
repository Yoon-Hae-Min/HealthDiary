import Date from "component/atoms/Date";
import TodayToDo from "component/pages/TodayToDo";
import Week from "component/atoms/Week";
import useCalender from "Hook/useCalender";
import moment from "moment";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Container, Row, Table } from "react-bootstrap";

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
        <>
          <Container>
            <Row className="justify-content-center text-center">
              <Col xs={4}>
                <span>{date.year}년</span>
              </Col>
            </Row>
            <Row className="justify-content-center text-center">
              <Col xs={4}>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={LastMonthClick}
                ></FontAwesomeIcon>
                <span>{date.month + 1}월</span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  onClick={NextMonthClick}
                  n
                ></FontAwesomeIcon>
              </Col>
            </Row>
            <Row style={{ height: "100vh" }}>
              <Col md>
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
                        <Date
                          date={eachDate}
                          istoday={
                            today.year === eachDate.year &&
                            today.month === eachDate.month &&
                            today.date === eachDate.date
                          }
                          userObj={userObj}
                          key={index}
                          DateClick={DateClick}
                        />
                      </Col>
                    ))}
                  </Row>
                ))}
              </Col>
              <Col md>
                <TodayToDo userObj={userObj} date={clickedDate} />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Calender;
