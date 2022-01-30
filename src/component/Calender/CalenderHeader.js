import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const CalenderHeader = ({ date, LastMonthClick, NextMonthClick }) => {
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

CalenderHeader.propTypes = {
  date: PropTypes.object,
  LastMonthClick: PropTypes.func,
  NextMonthClick: PropTypes.func,
};

export default CalenderHeader;
