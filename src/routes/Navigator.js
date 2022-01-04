import Home from "component/NavigationList/Home";
import ProFile from "component/NavigationList/Profile";
import PT from "component/NavigationList/PT";
import PTList from "component/pages/PTList";
import { useState } from "react";
import HomeCalender from "routes/HomeCalender";
import { Container, Nav, Navbar, Tab } from "react-bootstrap";

const Navigator = ({ userObj, refreshUser }) => {
  const [selector, setSelector] = useState("home");
  return (
    <Tab.Container activeKey={selector}>
      <Navbar fluid bg="dark" variant="dark" onSelect={(k) => setSelector(k)}>
        <Nav fill variant="pills" style={{ width: "100%" }}>
          <Nav.Item>
            <Home />
          </Nav.Item>
          <Nav.Item>
            <PT />
          </Nav.Item>
          <Nav.Item>
            <ProFile userObj={userObj} refreshUser={refreshUser} />
            {/* 여기부분 로직을 바꾸어야함 */}
          </Nav.Item>
        </Nav>
      </Navbar>
      <Tab.Content>
        <Tab.Pane eventKey="home">
          <HomeCalender userObj={userObj} />
        </Tab.Pane>
        <Tab.Pane eventKey="pt">
          <PTList />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default Navigator;
