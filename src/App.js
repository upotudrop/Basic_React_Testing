import "./styles.css";
import React, { useState } from "react";
import { Table } from "./components/Table/Table";

export const tempReport = [
  {
    id: 0,
    name: "Reel Availability",
    status: "Completed"
  },
  {
    id: 1,
    name: "X-Check-Report",
    status: "Failed"
  },
  {
    id: 2,
    name: "Reel Availability",
    status: "Failed"
  },
  {
    id: 3,
    name: "X-Check-Report",
    status: "Completed"
  }
];

export default function App() {
  const [value, setValue] = useState("");
  const updateVal = (e) => setValue(e.target.value);

  const [report, setReport] = useState(tempReport);
  const updateReportStatus = (id, newStatus) => {
    const status = newStatus === "Completed" ? "Failed" : "Completed";
    const newReportObject = {
      ...report[id],
      status: status
    };
    setReport(report.map((rep) => (rep?.id === id ? newReportObject : rep)));
  };

  const hideRow = (id) => {
    const newReportObject = {
      ...report[id],
      isHidden: true
    };
    setReport(report.map((rep) => (rep?.id === id ? newReportObject : rep)));
  };

  return (
    <div className="App">
      <h1>Basic Input</h1>
      <label htmlFor="input-1">New Character</label>
      <label htmlFor="new-todo">What needs to be done?</label>
      <br />
      <input
        id="new-todo"
        value={value}
        onChange={updateVal}
        placeholder={"Enter.."}
      />
      <h1>{value}</h1>
      <Table
        report={report}
        updateStatus={updateReportStatus}
        hideRow={hideRow}
      />
    </div>
  );
}
