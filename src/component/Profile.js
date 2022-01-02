import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditProfile from "./modal/EditProfile";

const ProFile = ({ userObj, refreshUser }) => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode((pre) => !pre);
  };
  return (
    <>
      <FontAwesomeIcon
        icon={faUserCircle}
        size={"2x"}
        onClick={toggleEditMode}
      />
      <EditProfile
        refreshUser={refreshUser}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        userObj={userObj}
      />
    </>
  );
};

export default ProFile;
