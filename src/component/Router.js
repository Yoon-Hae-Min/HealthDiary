import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calender from "routes/Calender";
import Login from "routes/Login";
import { auth } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import Navigator from "routes/Navigator";

const HealthDiaryRouter = ({ userObj, refreshUser }) => {
  return (
    <Router>
      {userObj && <Navigator userObj={userObj} refreshUser={refreshUser} />}
      <Routes>
        {userObj ? (
          <Route path="/" element={<Calender userObj={userObj} />}></Route>
        ) : (
          <Route path="/" element={<Login refreshUser={refreshUser} />}></Route>
        )}
      </Routes>
    </Router>
  );
};
export default HealthDiaryRouter;
