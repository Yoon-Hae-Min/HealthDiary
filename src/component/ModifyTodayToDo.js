import { useState } from "react";
import Modal from "react-modal";
import { doc, setDoc } from "firebase/firestore";
import { db } from "fbase";

const ModifyTodayToDo = ({ modifyMode, toggleModifyMode, userObj, date }) => {
  const [workoutPart, setWorkoutPart] = useState("");
  const [workoutMemo, setWorkoutMemo] = useState("");
  const onSubmut = async (event) => {
    event.preventDefault();
    try {
      const docRef = doc(db, userObj.uid, JSON.stringify(date));
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
        <textarea value={workoutMemo} onChange={workoutMemoChange}></textarea>
        <input type="submit" value="수정하기"></input>
      </form>
      <button onClick={toggleModifyMode}>Close</button>
    </Modal>
  );
};

export default ModifyTodayToDo;
