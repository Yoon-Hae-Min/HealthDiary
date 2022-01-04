import style from "css/Date.module.css";
import { Card } from "react-bootstrap";

const Date = ({ date, istoday, DateClick }) => {
  const sendDateToParent = (event) => {
    DateClick(date);
  };
  return (
    <div
      onClick={sendDateToParent}
      className={istoday ? style.today : "false"}
      style={{ height: "10vh" }}
    >
      <Card.Title>{date.date}</Card.Title>
    </div>
  );
};

export default Date;
