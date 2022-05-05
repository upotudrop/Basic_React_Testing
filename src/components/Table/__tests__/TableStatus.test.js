import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Table } from "../Table";
import { tempReport } from "../../../App";
/**
 * @date 04/05/22
 * @description tests that the Table Component has the required headers
 */
test("Renders the correct Table Headers", () => {
  const updateStatusMockBtn = jest.fn();
  const { getByText } = render(
    <Table report={tempReport} updateStatus={updateStatusMockBtn} />
  );
  expect(getByText("id"));
  expect(getByText("name"));
  expect(getByText("Status"));
});

/**
 * @date 04/05/22
 * @description tests that can update a single row's status
 */
test("Can update the status of a table entry", () => {
  const updateStatusMockBtn = jest.fn();
  render(<Table report={tempReport} updateStatus={updateStatusMockBtn} />);
  //get first instance of row with "Failed" status
  const clickableText = screen.getAllByText("Failed")[0];

  fireEvent.click(clickableText);
  expect(updateStatusMockBtn).toHaveBeenCalledTimes(1);
});

/**
 * @date 04/05/22
 * @description tests that can update every "failed" status to "completed"
 */
test("Can update every failed status in a table", () => {
  const updateStatusMockBtn = jest.fn();
  render(<Table report={tempReport} updateStatus={updateStatusMockBtn} />);
  //get all instances of 'Failed' Statuses
  const failedStatuses = screen.getAllByText("Failed");
  const numOfFailedStatuses = failedStatuses.length;

  failedStatuses.forEach((clickableText) => fireEvent.click(clickableText));
  expect(updateStatusMockBtn).toHaveBeenCalledTimes(numOfFailedStatuses);
});

/**
 * @date 04/05/22
 * @description tests that can update every "completed" status to "failed"
 */
test("Can update the staus of a single completed table entry", () => {
  const updateStatusMockBtn = jest.fn();
  render(<Table report={tempReport} updateStatus={updateStatusMockBtn} />);
  //get first instance of row with "Failed" status
  const clickableText = screen.getAllByText("Completed")[0];

  fireEvent.click(clickableText);
  expect(updateStatusMockBtn).toHaveBeenCalledTimes(1);
  expect(screen.getAllByText("Failed").length === 0);
});

test("Can update every completed status in a table", () => {
  const updateStatusMockBtn = jest.fn();
  render(<Table report={tempReport} updateStatus={updateStatusMockBtn} />);
  //get all instances of 'Failed' Statuses
  const failedStatuses = screen.getAllByText("Completed");
  const numOfFailedStatuses = failedStatuses.length;

  failedStatuses.forEach((clickableText) => fireEvent.click(clickableText));
  expect(updateStatusMockBtn).toHaveBeenCalledTimes(numOfFailedStatuses);
  expect(screen.getAllByText("Completed").length === 0);
});
