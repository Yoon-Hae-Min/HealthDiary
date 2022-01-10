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
import { Card, Col, Container, Row, Table, Toast } from "react-bootstrap";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "fbase";
import CalenderHeader from "component/pages/CalenderHeader";
import CalenderBody from "component/pages/CalenderBody";

const Calender = ({ userObj }) => {
  // 2번씩 로드됨

  const { date, setDate, getDatesOfCurrentMonth } = useCalender(); //month가 하루씩 당겨짐 ex 12월은 11월

  console.log(date);

  return (
    <>
      {userObj && (
        <>
          <Container>
            <CalenderHeader date={date} setDate={setDate} />
            <Row>
              <Col md>
                <CalenderBody
                  getDatesOfCurrentMonth={getDatesOfCurrentMonth}
                  userObj={userObj}
                  date={date}
                />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Calender;
