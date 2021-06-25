import { render, fireEvent, screen } from "@testing-library/react";
import Time from "./Time";
import { months, initDate } from "./helpers/date";

test("Should display time selected by user when day is clicked", () => {
  const daySelected = "1";
  const { getByText } = render(<Time />);

  getByText(`${months[initDate.month]} ${initDate.year}`);

  fireEvent.click(getByText(daySelected));

  getByText(`${daySelected}-${months[initDate.month]}-${initDate.year}`);
});
