import { useEffect, useState } from "react";
import ModifyTodayToDo from "../modal/ModifyTodayToDo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "fbase";
import { Card } from "react-bootstrap";

const TodayToDo = ({ date, userObj, memo }) => {
  //기록을 입력을 하고나서 바로 그날짜에 적용이안되고 한번 다시 눌러야 적용이됨
  const [modifyMode, setModifyMode] = useState(false);
  const toggleModifyMode = () => {
    setModifyMode((pre) => !pre);
  };
  console.log(memo);
  return (
    <Card>
      <span>{`${date.year}년 ${date.month + 1}월 ${date.date}일`}</span>
      <button onClick={toggleModifyMode}>기록하기</button>
      {
        <ModifyTodayToDo
          userObj={userObj}
          date={date}
          modifyMode={modifyMode}
          toggleModifyMode={toggleModifyMode}
        />
      }
      {memo && (
        <>
          <div>
            <span>{`운동부위: ${memo.data.workoutPart}`}</span>
          </div>
          <div>
            <span>{`메모: ${memo.data.workoutMemo}`}</span>
          </div>
        </>
      )}
    </Card>
  );
};

export default TodayToDo;
