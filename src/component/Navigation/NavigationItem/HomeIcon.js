import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const HomeIcon = () => {
  return (
    <Nav.Link eventKey="home">
      <FontAwesomeIcon icon={faHome} size="2x" />
    </Nav.Link>
  );
};

export default HomeIcon;
