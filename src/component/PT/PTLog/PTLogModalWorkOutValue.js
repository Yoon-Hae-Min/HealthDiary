import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import WorkOutSet from "./WorkOutSet";

const PTLogModalWorkOutValue = ({
  index,
  workoutitem,
  setWorkOutList,
  workoutList,
}) => {
  const [workoutInputList, setWorkOutInputList] = useState([
    { weight: "", number: "" },
  ]);
  const addWorkOutSet = () => {
    setWorkOutInputList([...workoutInputList, { weight: "", number: "" }]);
  };
  const workOutValueChange = (event, index) => {
    const { value } = event.target;
    const list = [...workoutList];
    list[index].value = value;
    setWorkOutList(list);
  };
  const RemoveWorkOutList = () => {
    const list = [...workoutList];
    list.splice(index, 1);
    setWorkOutList(list);
  };
  useEffect(() => {
    const workoutListCopy = [...workoutList];
    workoutListCopy[index].set = workoutInputList;
    setWorkOutList(workoutListCopy);
  }, [workoutInputList]);
  //console.log(workoutInputList);
  return (
    <Accordion.Item eventKey={index}>
      <Form.Group>
        <Container>
          <Row>
            <Col className="float-right">
              <CloseButton onClick={RemoveWorkOutList} />
            </Col>

            <Accordion.Header>
              <Col>
                <Form.Label>운동종목</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  onChange={(event) => {
                    workOutValueChange(event, index);
                  }}
                  type="text"
                  value={workoutitem.value}
                ></Form.Control>
              </Col>
            </Accordion.Header>
          </Row>

          <Accordion.Body>
            {workoutInputList.map((inputItem, index) => (
              <WorkOutSet
                inputItem={inputItem}
                index={index}
                workoutInputList={workoutInputList}
                setWorkOutInputList={setWorkOutInputList}
              />
            ))}
            <Button onClick={addWorkOutSet}>세트 추가하기</Button>
          </Accordion.Body>
        </Container>
      </Form.Group>
    </Accordion.Item>
  );
};

export default PTLogModalWorkOutValue;
