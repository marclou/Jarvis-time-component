/**
 * Pure function returns an array of number to represent the given days in a month
 *
 * @param  {string} month
 * @param  {string} year
 * @return {Array} of numbers of 0 > 31
 */
const getDaysInMonthGrid = (month, year) => {
  const dateMin = new Date(year, month, 1);
  const dateMax = new Date(year, month, 0);

  const datesFull = [...Array(dateMax.getDate() + 1).keys()].slice(1, dateMax);
  const datesEmpty = [...Array(dateMin.getDay()).keys()].map((_) => "");
  return [...datesEmpty, ...datesFull];
};

const currentDate = new Date();
const initDate = {
  daysGrid: getDaysInMonthGrid(
    currentDate.getMonth(),
    currentDate.getFullYear()
  ),
  month: currentDate.getMonth(),
  year: currentDate.getFullYear(),
};
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

export { months, daysString, initDate, getDaysInMonthGrid };
