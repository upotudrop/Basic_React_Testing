import React, { useState } from "react";

export const Table = ({ report, updateStatus, hideRow }) => {
  return (
    <center>
      <table>
        <thead>
          <tr>
            <th>Hide</th>
            <th>id</th>
            <th>name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {report?.map((entry) => {
            if (!entry?.isHidden) {
              return (
                <>
                  <tr key={entry?.id} id={entry?.id}>
                    <td>
                      <button onClick={() => hideRow(entry?.id)}>
                        Hide Row
                      </button>
                    </td>
                    <td>{entry?.id}</td>
                    <td>{entry?.name}</td>
                    <td onClick={() => updateStatus(entry?.id, entry?.status)}>
                      {entry?.status}
                    </td>
                  </tr>
                </>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </center>
  );
};
