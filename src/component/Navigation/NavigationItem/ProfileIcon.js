import { useState } from "react";
import EditProfile from "./EditProfile";
import { Image, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
const ProFileIcon = ({ userObj }) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((pre) => !pre);
  };
  return (
    <Nav.Link>
      {userObj.photoURL ? (
        <Image
          rounded
          onClick={toggleEditMode}
          src={userObj.photoURL}
          alt="이미지 로딩 오류"
          style={{ width: "32px", height: "32px" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faAddressCard}
          size={"2x"}
          onClick={toggleEditMode}
        />
      )}

      <EditProfile
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        userObj={userObj}
      />
    </Nav.Link>
  );
};

ProFileIcon.propTypes = {
  userObj: PropTypes.object.isRequired,
};

export default ProFileIcon;
