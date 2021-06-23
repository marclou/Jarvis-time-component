import { useState, useContext } from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "./theme-context";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const daysString = ["Sun", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const currentDate = new Date();

const getDaysInMonthGrid = (month, year) => {
  const dateMin = new Date(year, month, 1);
  const dateMax = new Date(year, month, 0);

  const datesFull = [...Array(dateMax.getDate() + 1).keys()].slice(1, dateMax);
  const datesEmpty = [...Array(dateMin.getDay()).keys()].map((_) => "");
  return [...datesEmpty, ...datesFull];
};

const Time = ({ handleDateChange }) => {
  const theme = useContext(ThemeContext);
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [days, setDays] = useState(getDaysInMonthGrid(month, year));
  const [dateSelected, setDateSelected] = useState({
    day: null,
    month: null,
    year: null,
  });

  const changeMonth = (index) => {
    const newDate = new Date(year, month + index);
    const newMonth = newDate.getMonth();
    const newYear = newDate.getFullYear();

    setMonth(newMonth);
    setYear(newYear);
    setDays(getDaysInMonthGrid(newMonth, newYear));
  };

  const selectDay = (day) => {
    if (
      day !== dateSelected.day ||
      month !== dateSelected.month ||
      year !== dateSelected.year
    ) {
      setDateSelected({
        day,
        month,
        year,
      });
      handleDateChange(year, month + 1, day);
    }
  };

  return (
    <div
      className="time-component"
      style={{ backgroundColor: theme.background, color: theme.foreground }}
    >
      <h1>
        {months[month]} {year}
      </h1>

      <div>
        <button onClick={() => changeMonth(-1)} style={{ marginRight: "10px" }}>
          previous month
        </button>
        <button onClick={() => changeMonth(+1)}>next month</button>
      </div>

      <div className="days-wrapper">
        {daysString.map((dayString, index) => {
          return <div key={dayString}>{dayString}</div>;
        })}
        {days.map((day, index) => {
          if (day === "") {
            return <div key={index}></div>;
          }

          let isSelected = false;

          if (
            day === dateSelected.day &&
            month === dateSelected.month &&
            year === dateSelected.year
          ) {
            isSelected = true;
          }
          return (
            <div
              className="day"
              key={index}
              onClick={() => selectDay(day)}
              style={isSelected ? { backgroundColor: theme.highlight } : {}}
            >
              {day}
            </div>
          );
        })}
      </div>

      {dateSelected.year && dateSelected.month && dateSelected.day && (
        <div style={{ marginTop: "25px" }}>
          Your date:{" "}
          <b>
            {dateSelected.day}-{months[dateSelected.month]}-{dateSelected.year}
          </b>
        </div>
      )}
    </div>
  );
};

export default Time;

Time.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
};
Time.defaultProps = {
  handleDateChange: (year, month, day) =>
    console.log(`${day}-${month}-${year}`),
};
