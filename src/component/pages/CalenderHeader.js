import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

const CalenderHeader = ({ date, setDate }) => {
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
  return (
    <>
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
          ></FontAwesomeIcon>
        </Col>
      </Row>
    </>
  );
};

export default CalenderHeader;
