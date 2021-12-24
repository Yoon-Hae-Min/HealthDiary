import Modal from "react-modal";

const ModifyTodayToDo = ({ modifyMode, toggleModifyMode }) => {
  return (
    <Modal isOpen={modifyMode} onRequestClose={toggleModifyMode}>
      <span>modal test</span>
      <button onClick={toggleModifyMode}>Close</button>
    </Modal>
  );
};

export default ModifyTodayToDo;
