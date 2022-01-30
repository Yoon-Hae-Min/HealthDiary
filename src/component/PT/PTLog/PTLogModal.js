import { db } from "fbase";
import { doc, setDoc } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PTLogModalBody from "./PTLogModalBody";
import PropTypes from "prop-types";

const PTLogModal = ({ show, handleClose, userObj }) => {
  const [workoutList, setWorkOutList] = useState([
    { value: "", set: [{ weight: "", number: "" }] },
  ]);
  const [PTDate, setPTDate] = useState(moment().format("YYYY-MM-DD"));
  const [PTArea, setPTArea] = useState("");
  const [PTMemo, setPTMemo] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(workoutList);
    const docRef = doc(
      db,
      userObj.uid,
      "PTschedule",
      "info",
      JSON.stringify(PTDate)
    );
    setDoc(docRef, {
      PTDate: PTDate,
      PTArea: PTArea,
      workoutList: workoutList,
      PTMemo: PTMemo,
    });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>PT일지 기록하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PTLogModalBody
            workoutList={workoutList}
            setWorkOutList={setWorkOutList}
            PTDate={PTDate}
            setPTDate={setPTDate}
            PTArea={PTArea}
            setPTArea={setPTArea}
            PTMemo={PTMemo}
            setPTMemo={setPTMemo}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

PTLogModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userObj: PropTypes.object.isRequired,
};

export default PTLogModal;
