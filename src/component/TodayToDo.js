import { useState } from "react";
import Modal from "react-modal";
import ModifyTodayToDo from "./ModifyTodayToDo";

const TodayToDo = ({ date }) => {
  // 데이터 구조를 DICTIONARY형태로 해서 PROPS로 줄것
  //database에서 main운동 및 한 운동일지를 가져와서 mapping해야함
  const [modifyMode, setModifyMode] = useState(false);
  const toggleModifyMode = () => {
    setModifyMode((pre) => !pre);
  };
  return (
    <div>
      <span>{date}</span>
      <button onClick={toggleModifyMode}>수정하기</button>
      <ModifyTodayToDo
        modifyMode={modifyMode}
        toggleModifyMode={toggleModifyMode}
      />
      <ul>
        <li>1</li>
      </ul>
    </div>
  );
};

export default TodayToDo;
