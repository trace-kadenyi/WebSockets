import React from "react";
import { getColor } from "../utils/cursorColors";

export default function UsersList({ users }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: "12px",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {Object.keys(users).map((uuid) => {
        const { username, state } = users[uuid];
        return (
          <li
            key={uuid}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#f0f0f0",
              borderRadius: "8px",
              padding: "6px 12px",
              fontSize: "13px",
              flexWrap: "wrap",
              maxWidth: "200px",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                background: getColor(uuid),
                color: "white",
                borderRadius: "4px",
                padding: "2px 8px",
                fontWeight: "bold",
              }}
            >
              {username.length > 10 ? `${username.slice(0, 10)}...` : username}
            </span>
            <span style={{ color: "#686767" }}>
              x: {state.x}, y: {state.y}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
