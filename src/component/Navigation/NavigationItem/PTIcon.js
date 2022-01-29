import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const PTIcon = () => {
  //트레이너 이름도 추가해야함
  return (
    <Nav.Link eventKey="pt">
      <FontAwesomeIcon icon={faDumbbell} size="2x" />
    </Nav.Link>
  );
};

export default PTIcon;
