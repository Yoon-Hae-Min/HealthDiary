import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import GoalImg from "picture/goal.webp";
import weaknessImg from "picture/weakness.jpg";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "fbase";
import PTAccordions from "./PTAccordions";
import PTLogModal from "./PTLogModal";
import WeaknessBodyModal from "./WeaknessBodyModal";

const PTList = ({ userObj }) => {
  const [userGoal, setUserGoal] = useState("");
  const [userWorkOutFocus, setUserWorkOutFocus] = useState("");
  const [switchPTModal, setSwitchPTModal] = useState(false);
  const [switchWeaknessBodyModal, setSwitchWeaknessBodyModal] = useState(false);
  useEffect(() => {
    getDoc(doc(db, userObj.uid, "userInformation"))
      .then((result) => {
        setUserGoal(result.data().userGoal);
        setUserWorkOutFocus(result.data().workOutFocus);
      })
      .catch((e) => console.log(e));
  }, []);
  const togglePTModal = () => {
    setSwitchPTModal((pre) => !pre);
  };
  const toggleWeaknessBodyModal = () => {
    setSwitchWeaknessBodyModal((pre) => !pre);
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col md>
          <Card>
            <Card.Img variant="top" src={GoalImg} />
            <Card.Body className="text-center">
              <Card.Title>운동 목표</Card.Title>
              <Card.Text className="pt-3">{userGoal}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" alt="" />
            <Card.Body>
              <Card.Title>PT 트레이너</Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card>
            <Card.Img variant="top" src={weaknessImg} />
            <Card.Body>
              <Card.Title>운동 중점</Card.Title>
              <Card.Text>{userWorkOutFocus}</Card.Text>
              <Button variant="primary" onClick={toggleWeaknessBodyModal}>
                수정하기
              </Button>
            </Card.Body>
          </Card>
          <WeaknessBodyModal
            userObj={userObj}
            switchWeaknessBodyModal={switchWeaknessBodyModal}
            toggleWeaknessBodyModal={toggleWeaknessBodyModal}
          />
        </Col>
      </Row>
      <Button variant="primary" onClick={togglePTModal}>
        추가하기
      </Button>
      <PTLogModal
        userObj={userObj}
        show={switchPTModal}
        handleClose={togglePTModal}
      />
      <PTAccordions userObj={userObj} />
    </Container>
  );
};

export default PTList;
