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

  // logic 수정해야할것
  // 데이터베이스에 경로를 calender->year->month->data(date,workoutPark,workoutMemo)로 변경 문제점: 앞,뒤달은 어떻게 처리할거? 그냥 보여주지말자
  // 한달을 load할때마다 qeury로 그 월에 있는 데이터를 가져옴
  // date를 비교해서 맞으면 데이터 calender에 개시
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
