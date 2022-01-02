import { useEffect, useState } from "react";
import ModifyTodayToDo from "./modal/ModifyTodayToDo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "fbase";

const TodayToDo = ({ date, userObj }) => {
  //기록을 입력을 하고나서 바로 그날짜에 적용이안되고 한번 다시 눌러야 적용이됨
  const [workoutDB, setWorkoutDB] = useState({
    workoutPart: "",
    workoutMemo: "",
  });
  const [modifyMode, setModifyMode] = useState(false);
  const [DBInit, setDBInit] = useState(false);
  const toggleModifyMode = () => {
    setModifyMode((pre) => !pre);
  };
  useEffect(() => {
    const getData = async () => {
      console.log(JSON.stringify(date));
      const docRef = doc(
        db,
        userObj.uid,
        "Calender",
        "record",
        JSON.stringify(date)
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWorkoutDB(docSnap.data());
      } else {
        setWorkoutDB({ workoutPart: "", workoutMemo: "" });
      }
    };
    getData();
    setDBInit(true);
  }, [date]);
  return (
    <div>
      <span>{`${date.year}년 ${date.month + 1}월 ${date.date}일`}</span>
      <button onClick={toggleModifyMode}>기록하기</button>
      {DBInit && (
        <ModifyTodayToDo
          userObj={userObj}
          date={date}
          modifyMode={modifyMode}
          toggleModifyMode={toggleModifyMode}
        />
      )}

      <div>
        <span>{`운동부위: ${workoutDB.workoutPart}`}</span>
      </div>
      <div>
        <span>{`메모: ${workoutDB.workoutMemo}`}</span>
      </div>
    </div>
  );
};

export default TodayToDo;
