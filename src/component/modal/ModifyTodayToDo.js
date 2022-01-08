import { useState } from "react";
import Modal from "react-modal";
import { doc, setDoc } from "firebase/firestore";
import { db } from "fbase";
import { Col, Row } from "react-bootstrap";

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
    <Modal isOpen={modifyMode} onRequestClose={toggleModifyMode}>
      <Row>
        <Col>
          <span>modal test</span>
          <form onSubmit={onSubmut}>
            <span>운동 부위</span>
            <input
              type="text"
              placeholder="오늘 운동한 부위는?"
              value={workoutPart}
              onChange={workoutPartChange}
            ></input>
            <span>메모</span>
            <textarea
              value={workoutMemo}
              onChange={workoutMemoChange}
            ></textarea>
            <input type="submit" value="수정하기"></input>
          </form>
          <button onClick={toggleModifyMode}>Close</button>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModifyTodayToDo;
