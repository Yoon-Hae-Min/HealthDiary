import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditProfile from "../EditProfile";
import { Image, Nav } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "fbase";

const ProFile = ({ userObj, refreshUser }) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((pre) => !pre);
  };
  return (
    <Nav.Link>
      <Image
        rounded
        onClick={toggleEditMode}
        src={userObj.photoURL}
        alt="미리볼수 없음"
        style={{ width: "32px", height: "32px" }}
      />
      <EditProfile
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        userObj={userObj}
      />
    </Nav.Link>
  );
};

export default ProFile;
