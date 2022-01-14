import { useEffect, useState } from "react";
import ModifyTodayToDo from "../modal/ModifyTodayToDo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "fbase";
import { Button, Card } from "react-bootstrap";

const ToDidList = ({ date, userObj, memo }) => {
  //기록을 입력을 하고나서 바로 그날짜에 적용이안되고 한번 다시 눌러야 적용이됨
  const [modifyMode, setModifyMode] = useState(false);
  const toggleModifyMode = () => {
    setModifyMode((pre) => !pre);
  };
  return (
    <Card bg="light" text="dark" border="light">
      <Card.Header className="text-center">
        {`${date.year}년 ${date.month + 1}월 ${date.date}일`}
      </Card.Header>
      <Card.Body>
        {memo && (
          <>
            <Card.Title className="text-center"> 운동부위</Card.Title>
            <Card.Text className="text-center">
              {memo.data.workoutPart}
            </Card.Text>
            <Card.Title className="text-center"> 메모</Card.Title>
            <Card.Text className="text-center">
              {memo.data.workoutMemo}
            </Card.Text>
          </>
        )}
      </Card.Body>
      <Button onClick={toggleModifyMode}>기록하기</Button>
      {
        <ModifyTodayToDo
          userObj={userObj}
          date={date}
          modifyMode={modifyMode}
          toggleModifyMode={toggleModifyMode}
        />
      }
    </Card>
  );
};

export default ToDidList;
