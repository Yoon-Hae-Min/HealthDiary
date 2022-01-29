import HomeIcon from "component/Navigation/NavigationItem/HomeIcon";
import ProfileIcon from "component/Navigation/NavigationItem/ProfileIcon";
import PTIcon from "component/Navigation/NavigationItem/PTIcon";
import PTPage from "component/PT/PTPage";
import { useState } from "react";
import HomeCalender from "component/Calender/HomeCalender";
import { Nav, Navbar, Tab } from "react-bootstrap";

const Navigator = ({ userObj, refreshUser }) => {
  const [pageSelector, setPageSelector] = useState("home");
  return (
    <Tab.Container activeKey={pageSelector}>
      <Navbar
        fluid="true"
        bg="dark"
        variant="dark"
        onSelect={(k) => setPageSelector(k)}
      >
        <Nav fill="true" variant="pills" style={{ width: "100%" }}>
          <Nav.Item>
            <HomeIcon />
          </Nav.Item>
          <Nav.Item>
            <PTIcon />
          </Nav.Item>
          <Nav.Item>
            <ProfileIcon userObj={userObj} refreshUser={refreshUser} />
          </Nav.Item>
        </Nav>
      </Navbar>
      <Tab.Content>
        <Tab.Pane eventKey="home">
          <HomeCalender userObj={userObj} />
        </Tab.Pane>
        <Tab.Pane eventKey="pt">
          <PTPage userObj={userObj} />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default Navigator;
