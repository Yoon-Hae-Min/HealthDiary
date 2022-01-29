import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "fbase";
import PTAccordions from "./PTAccordions";
import PTLogModal from "./PTLog/PTLogModal";
import WeaknessBodyModal from "./TitleCard/WorkOutFocusModal";
import PersonalTrainer from "./TitleCard/PersonalTrainer";
import WorkOutGoal from "./TitleCard/WorkOutGoal";
import WorkOutFocus from "./TitleCard/WorkOutFocus";

const PTPage = ({ userObj }) => {
  const [switchPTModal, setSwitchPTModal] = useState(false);
  const togglePTModal = () => {
    setSwitchPTModal((pre) => !pre);
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col md>
          <WorkOutGoal userObj={userObj} />
        </Col>
        <Col md>
          <PersonalTrainer />
        </Col>
        <Col md>
          <WorkOutFocus userObj={userObj} />
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

export default PTPage;
