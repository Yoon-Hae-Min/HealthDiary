import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calender from "routes/Calender";

const HealthDiaryRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Calender />}></Route>
      </Routes>
    </Router>
  );
};
export default HealthDiaryRouter;
