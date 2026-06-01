import React, { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";

import { Cursor } from "./components/Cursor";
import { getColor } from "./utils/cursorColors";
import UsersList from "./components/UsersList";

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
        <UsersList users={lastJsonMessage} />
        {renderCursors(lastJsonMessage)}
      </>
    );
  }

  return <h1>Hello, {username}!</h1>;
}
