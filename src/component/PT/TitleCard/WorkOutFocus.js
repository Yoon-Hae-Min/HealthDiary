import { db } from "fbase";
import { doc, getDoc } from "firebase/firestore";
import weaknessImg from "picture/weakness.jpg";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import WorkOutFocusModal from "./WorkOutFocusModal";

const WorkOutFocus = ({ userObj }) => {
  const [userWorkOutFocus, setUserWorkOutFocus] = useState("");
  const [modalswitch, setModalswitch] = useState(false);
  const toggleModal = () => {
    setModalswitch((pre) => !pre);
  };
  useEffect(() => {
    const getUserWorkOutFocus = async () => {
      const result = await getDoc(doc(db, userObj.uid, "userInformation"));
      if (result.exists()) {
        setUserWorkOutFocus(result.data().workOutFocus);
      } else {
        setUserWorkOutFocus("중점적으로 해야할 운동을 설정해 주세요");
      }
    };
    getUserWorkOutFocus();
  }, []);
  return (
    <>
      <Card>
        <Card.Img variant="top" src={weaknessImg} />
        <Card.Body>
          <Card.Title>운동 중점</Card.Title>
          <Card.Text>{userWorkOutFocus}</Card.Text>
          <Button variant="primary" onClick={toggleModal}>
            수정하기
          </Button>
        </Card.Body>
      </Card>
      <WorkOutFocusModal
        userObj={userObj}
        modalswitch={modalswitch}
        toggleModal={toggleModal}
      />
    </>
  );
};
export default WorkOutFocus;
