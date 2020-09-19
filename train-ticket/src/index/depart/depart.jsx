import React, { memo } from "react";
import "./depart.less";
const Depart = memo((props) => {
  const { selectDateDepart, dateDepart, isToday } = props;
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const dayTip =
    currentMonth === dateDepart.monthIndex
      ? isToday[dateDepart.day - currentDate]
      : "";
  return (
    <div>
      <div className={"date-wrapper"}>
        <div className={"date-depart"} onClick={() => selectDateDepart(true)}>
          <input
            type="text"
            name="month"
            value={dateDepart.monthIndex + 1 + '月'}
            readOnly
            className={'depart depart-month'}
          />
           <input
            type="text"
            name="day"
            value={dateDepart.day + '号'}
            readOnly
            className={'depart depart-day'}
          />
          <span className={"depart-tip"}>{dayTip}</span>
        </div>
      </div>
    </div>
  );
});
export default Depart;
