import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditProfile from "../modal/EditProfile";
import { Nav } from "react-bootstrap";

const ProFile = ({ userObj, refreshUser }) => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode((pre) => !pre);
  };
  return (
    <Nav.Link>
      <FontAwesomeIcon //user이미지로 대체 해야함
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
    </Nav.Link>
  );
};

export default ProFile;
