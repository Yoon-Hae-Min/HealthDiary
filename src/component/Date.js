import style from "css/Date.module.css";

const Date = ({ date, fulldate, istoday, onClick }) => {
  return (
    <div
      onClick={onClick}
      id={fulldate}
      className={istoday ? style.today : "false"}
    >
      {date}
    </div>
  );
};

export default Date;
