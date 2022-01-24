import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "fbase";
import { Button, Card } from "react-bootstrap";
import ModifyToDidList from "./ModifyToDidList";

const ToDidList = ({ date, userObj, memo }) => {
  //기록을 입력을 하고나서 바로 그날짜에 적용이안되고 한번 다시 눌러야 적용이됨
  const [modifyMode, setModifyMode] = useState(false);
  const toggleModifyMode = () => {
    setModifyMode((pre) => !pre);
  };
  console.log(memo.data.workoutMemo);
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
            <Card.Text
              className="text-center"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {memo.data.workoutMemo}
            </Card.Text>
          </>
        )}
      </Card.Body>
      <Button onClick={toggleModifyMode}>기록하기</Button>
      {
        <ModifyToDidList
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
