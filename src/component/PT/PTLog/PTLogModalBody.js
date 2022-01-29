import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import PTLogModalWorkOutValue from "./PTLogModalWorkOutValue";

const PTLogBody = ({
  setWorkOutList,
  workoutList,
  PTDate,
  setPTDate,
  PTArea,
  setPTArea,
  PTMemo,
  setPTMemo,
}) => {
  const PTMemoChange = (event) => {
    setPTMemo(event.target.value);
  };
  const PTAreaChange = (event) => {
    setPTArea(event.target.value);
  };
  const PTDateChange = (event) => {
    setPTDate(event.target.value);
  };
  const addWorkOutValue = () => {
    setWorkOutList([
      ...workoutList,
      { value: "", set: [{ weight: "", number: "" }] },
    ]);
  };
  return (
    <>
      <Form.Group>
        <Form.Label>날짜</Form.Label>
        <Form.Control
          type="date"
          value={PTDate}
          onChange={PTDateChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>주요 운동부위</Form.Label>
        <Form.Control
          type="text"
          value={PTArea}
          onChange={PTAreaChange}
        ></Form.Control>
      </Form.Group>
      <hr></hr>
      <Form.Group>
        <Button onClick={addWorkOutValue}>운동종목 추가하기</Button>
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          {workoutList.map((workoutitem, index) => (
            <PTLogModalWorkOutValue
              index={index}
              workoutitem={workoutitem}
              setWorkOutList={setWorkOutList}
              workoutList={workoutList}
            />
          ))}
        </Accordion>
      </Form.Group>
      <Form.Group>
        <Form.Label>메모</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={PTMemoChange}
          value={PTMemo}
        />
      </Form.Group>
    </>
  );
};

export default PTLogBody;
