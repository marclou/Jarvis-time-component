import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "./theme-context";
import CarretRight from "./svg/CarretRight";
import CarretLeft from "./svg/CarretLeft";
import { months, daysString } from "./data/date";

const getDaysInMonthGrid = (month, year) => {
  const dateMin = new Date(year, month, 1);
  const dateMax = new Date(year, month, 0);

  const datesFull = [...Array(dateMax.getDate() + 1).keys()].slice(1, dateMax);
  const datesEmpty = [...Array(dateMin.getDay()).keys()].map((_) => "");
  return [...datesEmpty, ...datesFull];
};

const initDate = new Date();
const initYear = initDate.getFullYear();
const initMonth = initDate.getMonth();
const initDaysGrid = getDaysInMonthGrid(initMonth, initYear);

const Time = ({ handleDateChange }) => {
  const theme = useContext(ThemeContext);
  const [month, setMonth] = useState(initMonth);
  const [year, setYear] = useState(initYear);
  const [days, setDays] = useState(initDaysGrid);
  const [dateSelected, setDateSelected] = useState({
    day: null,
    month: null,
    year: null,
  });

  useEffect(() => {
    setDays(getDaysInMonthGrid(month, year));
  }, [year, month]);

  const changeMonth = (index) => {
    const newDate = new Date(year, month + index);
    const newMonth = newDate.getMonth();
    const newYear = newDate.getFullYear();

    setMonth(newMonth);
    setYear(newYear);
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
          <CarretRight /> {months[month === 0 ? 11 : month - 1]}
        </button>
        <button onClick={() => changeMonth(+1)}>
          {months[month === 11 ? 0 : month + 1]} <CarretLeft />
        </button>
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
