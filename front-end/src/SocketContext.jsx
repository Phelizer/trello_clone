/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import io from "socket.io-client";
import { CurrentTeamContext } from "./CurrentTeamContext";

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [currTeamID] = useContext(CurrentTeamContext);

  const getConnection = () => {
    if (!socket) {
      const newSocket = io("http://localhost:3000");
      setSocket(newSocket);
      return newSocket;
    }
    return socket;
  };

  const subscribeToBoardUpdate = (
    connection,
    allBoards,
    setAllBoards,
    setBoards
  ) => {
    connection.emit("subscribe_to_board_update", currTeamID);
    connection.on("board_update", (result) => {
      const duplicatedBoards = [...allBoards, ...result];
      const updatedAllBoards = duplicatedBoards.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );
      // set new state
      setAllBoards([...updatedAllBoards]);
      setBoards(result);
    });
  };

  const unsubscribeFrom = (tag, connection) => {
    let id = null;
    if (tag === "board_update") id = currTeamID;
    connection.emit(`unsubscribe_from_${tag}`, { tag, id });
    connection.off("board_update");
  };

  return (
    <SocketContext.Provider
      value={[getConnection, subscribeToBoardUpdate, unsubscribeFrom]}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
