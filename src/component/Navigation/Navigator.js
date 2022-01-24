import Home from "component/Navigation/NavigationItem/Home";
import ProFile from "component/Navigation/NavigationItem/Profile";
import PT from "component/Navigation/NavigationItem/PT";
import PTList from "component/PT/PTList";
import { useState } from "react";
import HomeCalender from "component/Calender/HomeCalender";
import { Container, Nav, Navbar, Tab } from "react-bootstrap";

const Navigator = ({ userObj, refreshUser }) => {
  const [selector, setSelector] = useState("home");
  return (
    <Tab.Container activeKey={selector}>
      <Navbar
        fluid="true"
        bg="dark"
        variant="dark"
        onSelect={(k) => setSelector(k)}
      >
        <Nav fill="true" variant="pills" style={{ width: "100%" }}>
          <Nav.Item>
            <Home />
          </Nav.Item>
          <Nav.Item>
            <PT />
          </Nav.Item>
          <Nav.Item>
            <ProFile userObj={userObj} refreshUser={refreshUser} />
          </Nav.Item>
        </Nav>
      </Navbar>
      <Tab.Content>
        <Tab.Pane eventKey="home">
          <HomeCalender userObj={userObj} />
        </Tab.Pane>
        <Tab.Pane eventKey="pt">
          <PTList userObj={userObj} />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default Navigator;
