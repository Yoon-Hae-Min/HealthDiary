import useCalender from "Hook/useCalender";
import { Card, Col, Container, Row, Table, Toast } from "react-bootstrap";
import CalenderHeader from "component/Calender/CalenderHeader";
import CalenderBody from "component/Calender/CalenderBody";
import PropTypes from "prop-types";
const Calender = ({ userObj }) => {
  // 2번씩 로드됨

  const { date, setDate, getDatesOfCurrentMonth } = useCalender(); //month가 하루씩 당겨짐 ex 12월은 11월
  const ViewLastMonth = () => {
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

  const ViewNextMonth = () => {
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
      {userObj && (
        <>
          <Container>
            <CalenderHeader
              date={date}
              LastMonthClick={ViewLastMonth}
              NextMonthClick={ViewNextMonth}
            />
            <Row>
              <Col md>
                <CalenderBody
                  getDatesOfCurrentMonth={getDatesOfCurrentMonth}
                  userObj={userObj}
                  date={date}
                  ViewLastMonth={ViewLastMonth}
                  ViewNextMonth={ViewNextMonth}
                />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

Calender.propTypes = {
  userObj: PropTypes.object.isRequired,
};

export default Calender;
