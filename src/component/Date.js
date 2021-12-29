import style from "css/Date.module.css";

const Date = ({ date, istoday, DateClick }) => {
  const sendDateToParent = (event) => {
    DateClick(date);
  };
  return (
    <div onClick={sendDateToParent} className={istoday ? style.today : "false"}>
      {date.date}
    </div>
  );
};

export default Date;
