import { db } from "fbase";
import { doc, getDoc } from "firebase/firestore";
import GoalImg from "picture/goal.webp";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const WorkOutGoal = ({ userObj }) => {
  const [userGoal, setUserGoal] = useState("");
  useEffect(() => {
    const getUserGoal = async () => {
      const result = await getDoc(doc(db, userObj.uid, "userInformation"));
      if (result.exists()) {
        setUserGoal(result.data().userGoal);
      } else {
        setUserGoal("회원정보에서 목표를 설정해 주세요.");
      }
    };
    getUserGoal();
  }, []);
  return (
    <Card>
      <Card.Img variant="top" src={GoalImg} />
      <Card.Body className="text-center">
        <Card.Title>운동 목표</Card.Title>
        <Card.Text className="pt-3">{userGoal}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WorkOutGoal;
