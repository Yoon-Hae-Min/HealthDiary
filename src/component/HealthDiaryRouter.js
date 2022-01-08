import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "routes/Login";
import Navigator from "routes/Navigator";
import PTList from "./pages/PTList";

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
