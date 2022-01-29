import { db } from "fbase";
import { doc, getDoc } from "firebase/firestore";
import GoalImg from "picture/goal.webp";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const WorkOutGoal = ({ userObj }) => {
  const [userGoal, setUserGoal] = useState("");
  useEffect(() => {
    getDoc(doc(db, userObj.uid, "userInformation"))
      .then((result) => {
        setUserGoal(result.data().userGoal);
      })
      .catch((e) => console.log(e));
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
