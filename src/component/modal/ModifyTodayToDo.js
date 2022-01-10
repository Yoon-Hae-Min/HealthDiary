import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "fbase";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const ModifyTodayToDo = ({ modifyMode, toggleModifyMode, userObj, date }) => {
  //같은 부분 클릭하면 랜더링하는것 막기
  const [workoutPart, setWorkoutPart] = useState("");
  const [workoutMemo, setWorkoutMemo] = useState("");
  const onSubmut = async (event) => {
    event.preventDefault();
    try {
      const docRef = doc(
        db,
        userObj.uid,
        JSON.stringify(date.year),
        JSON.stringify(date.month),
        JSON.stringify(date.date)
      );
      setDoc(docRef, {
        workoutPart: workoutPart,
        workoutMemo: workoutMemo,
      });
    } catch (e) {
      console.log(e);
    }
    setWorkoutPart("");
    setWorkoutMemo("");
    toggleModifyMode();
  };
  const workoutPartChange = (event) => {
    setWorkoutPart(event.target.value);
  };
  const workoutMemoChange = (event) => {
    setWorkoutMemo(event.target.value);
  };
  return (
    <Modal show={modifyMode} onHide={toggleModifyMode}>
      <Modal.Header closeButton>
        <Modal.Title>운동 기록하기</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Form onSubmit={onSubmut}>
          <Form.Group>
            <Form.Label>운동 부위</Form.Label>
            <Form.Control
              type="text"
              placeholder="오늘 운동한 부위는?"
              value={workoutPart}
              onChange={workoutPartChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>메모</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={workoutMemo}
              onChange={workoutMemoChange}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" className="mt-5">
            수정하기
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModifyTodayToDo;
