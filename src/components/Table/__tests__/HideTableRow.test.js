import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Table } from "../Table";
import { tempReport } from "../../../App";

/**
 * @date 5/05/22
 * @description detects the Hide table header
 * @description detects N "Hide Row" buttons where N is equal to the Num of Rows
 */
test("Validates basic hide row functionality in the table component", () => {
  const { getByText } = render(
    <Table report={tempReport} updateStatus={null} hideRow={null} />
  );
  expect(getByText("Hide"));
  const numOfHideRowBtns = screen.getAllByText("Hide Row").length;
  expect(numOfHideRowBtns === tempReport.length);
});

/**
 * @date 5/05/22
 * @description hide one row in the table component
 * @description visible rows should be original length - 1
 * @description number of "Hide Row" buttons should also be - 1
 */
test("Can hide one row in the table component", () => {
  const hideRowMockBtn = jest.fn();
  render(
    <Table report={tempReport} updateStatus={null} hideRow={hideRowMockBtn} />
  );
  const initialRowLength = tempReport.length;
  const initialNumOfBtns = screen.getAllByText("Hide Row").length;
  const hideRowBtn = screen.getAllByText("Hide Row")[0];

  //hide single row from table component
  fireEvent.click(hideRowBtn);
  //check new data
  const curNumOfBtns = screen.getAllByText("Hide Row").length;
  //assert assumptions
  expect(hideRowMockBtn).toHaveBeenCalledTimes(1);
  expect(curNumOfBtns === initialNumOfBtns - 1);
  expect(curNumOfBtns === initialRowLength - 1);
});

/**
 * @date 5/05/22
 * @description hide all rows in the table component
 * @description visible rows should be 0
 */
test("Can hide all rows in the table component", () => {
  const hideRowMockBtn = jest.fn();
  render(
    <Table report={tempReport} updateStatus={null} hideRow={hideRowMockBtn} />
  );
  const hideRowBtns = screen.getAllByText("Hide Row");
  //hide all rows from table component
  hideRowBtns.forEach((btn) => fireEvent.click(btn));
  //new data
  const curNumOfBtns = screen.getAllByText("Hide Row");
  //assert assumptions
  expect(hideRowMockBtn).toHaveBeenCalledTimes(hideRowBtns.length);
  expect(curNumOfBtns === 0);
});
