import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "component/Login/Login";
import Navigator from "component/Navigation/Navigator";
import PTList from "./PT/PTPage";

const HealthDiaryRouter = ({ userObj, refreshUser }) => {
  return (
    <>
      {userObj ? (
        <Navigator userObj={userObj} refreshUser={refreshUser} />
      ) : (
        <Login refreshUser={refreshUser} />
      )}
    </>
  );
};
export default HealthDiaryRouter;
