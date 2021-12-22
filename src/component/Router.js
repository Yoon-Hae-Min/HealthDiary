import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calender from "routes/Calender";
import Login from "routes/Login";
import { auth } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

const HealthDiaryRouter = ({ isLogin }) => {
  return (
    <Router>
      <Routes>
        {isLogin ? (
          <Route path="/" element={<Calender />}></Route>
        ) : (
          <Route path="/" element={<Login />}></Route>
        )}
      </Routes>
    </Router>
  );
};
export default HealthDiaryRouter;
