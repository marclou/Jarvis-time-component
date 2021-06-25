import { render, fireEvent } from "@testing-library/react";
import Time from "./Time";
import { months, initDate } from "./helpers/date";

test("Should display time selected by user when day is clicked", () => {
  const daySelected = "1";
  const { getByText } = render(<Time />);

  getByText(`${months[initDate.month]} ${initDate.year}`);

  fireEvent.click(getByText(daySelected));

  getByText(`${daySelected}-${months[initDate.month]}-${initDate.year}`);
});

test("Should change month", () => {
  const nextMonth = "Jul";
  const { getByText } = render(<Time />);

  getByText(`${months[initDate.month]} ${initDate.year}`);

  fireEvent.click(getByText(nextMonth));

  getByText(
    `${months[initDate.month === 1 ? 0 : initDate.month + 1]} ${
      initDate.month === 1 ? initDate.year + 1 : initDate.year
    }`
  );
});
