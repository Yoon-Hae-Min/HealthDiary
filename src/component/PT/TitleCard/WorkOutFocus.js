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
    getDoc(doc(db, userObj.uid, "userInformation"))
      .then((result) => {
        setUserWorkOutFocus(result.data().workOutFocus);
      })
      .catch((e) => console.log(e));
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
