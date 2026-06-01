import React, { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";

import { Cursor } from "./components/Cursor";

const CURSOR_COLORS = [
  "#5B6AF0", // indigo
  "#E F4444", // rose
  "#10B981", // emerald
  "#F59E0B", // amber
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#06B6D4", // cyan
  "#F97316", // orange
];

const getColor = (uuid) => {
  const index = parseInt(uuid.slice(0, 8), 16) % CURSOR_COLORS.length;
  return CURSOR_COLORS[index];
};

const renderCursors = (users) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];

    return (
      <Cursor
        key={uuid}
        userId={user.username ?? uuid}
        point={[user.state.x, user.state.y]}
        color={getColor(uuid)}
      />
    );
  });
};

const renderUsersList = (users) => {
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
};

export function Home({ username }) {
  const WS_URL = "ws://127.0.0.1:8000";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });

    window.addEventListener("mousemove", (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  if (lastJsonMessage) {
    return (
      <>
        {renderUsersList(lastJsonMessage)}
        {renderCursors(lastJsonMessage)}
      </>
    );
  }

  return <h1>Hello, {username}!</h1>;
}
