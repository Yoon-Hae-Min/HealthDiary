import { Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const WorkOutSet = ({
  inputItem,
  index,
  setWorkOutInputList,
  workoutInputList,
}) => {
  const workOutWeightChange = (event, index) => {
    const { value } = event.target;
    const list = [...workoutInputList];
    list[index].weight = value;
    setWorkOutInputList(list);
  };
  const workOutNumberChange = (event, index) => {
    const { value } = event.target;
    const list = [...workoutInputList];
    list[index].number = value;
    setWorkOutInputList(list);
  };
  return (
    <Row>
      <Col>
        <Form.Label>무게</Form.Label>
      </Col>
      <Col>
        <Form.Control
          type="number"
          value={inputItem.weight}
          onChange={(e) => workOutWeightChange(e, index)}
        ></Form.Control>
      </Col>
      <Col>
        <Form.Label>횟수</Form.Label>
      </Col>
      <Col>
        <Form.Control
          type="number"
          value={inputItem.number}
          onChange={(e) => workOutNumberChange(e, index)}
        ></Form.Control>
      </Col>
    </Row>
  );
};

WorkOutSet.propTypes = {
  inputItem: PropTypes.object,
  index: PropTypes.number,
  setWorkOutInputList: PropTypes.func,
  workoutInputList: PropTypes.object,
};

export default WorkOutSet;
