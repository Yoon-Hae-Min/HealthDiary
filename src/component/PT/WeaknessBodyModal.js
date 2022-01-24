import { db } from "fbase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const WeaknessBodyModal = ({
  switchWeaknessBodyModal,
  toggleWeaknessBodyModal,
  userObj,
}) => {
  const [workOutFocus, setworkOutFocus] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    const docRef = doc(db, userObj.uid, "userInformation");
    updateDoc(docRef, { workOutFocus: workOutFocus });
    toggleWeaknessBodyModal();
  };
  return (
    <Modal show={switchWeaknessBodyModal} onHide={toggleWeaknessBodyModal}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>수정하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>운동 중점</Form.Label>
            <Form.Control
              value={workOutFocus}
              onChange={(event) => setworkOutFocus(event.target.value)}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleWeaknessBodyModal}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default WeaknessBodyModal;
