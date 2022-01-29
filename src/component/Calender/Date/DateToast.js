import { Toast } from "react-bootstrap";
import ToDidList from "./ToDidList";

const DateToast = ({
  toggleshowMode,
  toDidListSwitch,
  userObj,
  eachDate,
  memo,
}) => {
  return (
    <Toast
      className="position-absolute top-50 start-50 translate-middle"
      onClose={toggleshowMode}
      show={toDidListSwitch}
      bg="light"
    >
      <Toast.Header>
        <strong className="me-auto">운동기록</strong>
      </Toast.Header>
      <Toast.Body>
        <ToDidList userObj={userObj} date={eachDate} memo={memo} />
      </Toast.Body>
    </Toast>
  );
};

export default DateToast;
