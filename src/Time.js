import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "./theme-context";
import CarretRight from "./svg/CarretRight";
import CarretLeft from "./svg/CarretLeft";
import {
  months,
  daysString,
  initDate,
  getDaysInMonthGrid,
} from "./helpers/date";

const Time = ({ handleDateChange }) => {
  const theme = useContext(ThemeContext);
  const [month, setMonth] = useState(initDate.month);
  const [year, setYear] = useState(initDate.year);
  const [days, setDays] = useState(initDate.daysGrid);
  const [dateSelected, setDateSelected] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [specialDay, setSpecialDay] = useState(null);

  // re render the days grid when the month/year changes
  useEffect(() => {
    setDays(getDaysInMonthGrid(month, year));
  }, [year, month]);

  // fetch new special day API when user select a new day
  useEffect(() => {
    if (dateSelected.day) {
      // Free API which only provides data from last year (2020).
      fetch(
        `https://holidayapi.com/v1/holidays?pretty&key=87dcd9bf-150f-4fb0-a9a2-8b1ad3c3cbdf&country=US&year=2020&month=${
          month + 1
        }&day=${dateSelected.day}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSpecialDay(data.holidays[0] ? data.holidays[0].name : null);
        })
        .catch((e) => setSpecialDay("Oops, try again"));
    }
  }, [dateSelected]);

  // re render when user change the current month on the calendar
  const changeMonth = (index) => {
    const newDate = new Date(year, month + index);
    const newMonth = newDate.getMonth();
    const newYear = newDate.getFullYear();

    setMonth(newMonth);
    setYear(newYear);
  };

  // trigger when user select a day on the calendar, update state and run callback given as a prop
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
      <div className="header">
        <h1>
          {months[month]} {year}
        </h1>
        <button
          onClick={() => {
            setMonth(initDate.month);
            setYear(initDate.year);
          }}
        >
          Today
        </button>
      </div>

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

          let dayStyle = {
            backgroundColor:
              day === dateSelected.day &&
              month === dateSelected.month &&
              year === dateSelected.year &&
              theme.highlight,
            border:
              day === initDate.day &&
              month === initDate.month &&
              year === initDate.year &&
              "1px solid rgb(117, 117, 117)",
          };

          return (
            <div
              className="day"
              key={index}
              onClick={() => selectDay(day)}
              style={dayStyle}
            >
              {day}
            </div>
          );
        })}
      </div>

      {dateSelected.year && dateSelected.month && dateSelected.day && (
        <div style={{ marginTop: "20px" }}>
          <div>
            📆 Date:{" "}
            <b>
              {dateSelected.day}-{months[dateSelected.month]}-
              {dateSelected.year}
            </b>
          </div>
          <div style={{ marginTop: "10px" }}>
            ✌️ Special day: {specialDay ? <b>{specialDay}</b> : "❌"}
          </div>
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
