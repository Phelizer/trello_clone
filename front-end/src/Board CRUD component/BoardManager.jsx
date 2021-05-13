import { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import Board from "./Board";
import AddBoardButton from "./AddBoardButton";
import { CurrentTeamContext } from "../CurrentTeamContext";

const BoardManager = ({ boards, setBoards, allBoards, setAllBoards }) => {
  const [currTeamID] = useContext(CurrentTeamContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (currTeamID !== null) {
      // if there is at least one team
      // we subscribe on board_updates in this team
      // via websocket
      const socketInstance = io("http://localhost:3000", {
        query: `teamID=${currTeamID}`,
      });
      setSocket(socketInstance);

      socketInstance.on("board_update", (result) => {
        const duplicatedBoards = [...allBoards, ...result];
        const updatedAllBoards = duplicatedBoards.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );
        setAllBoards([...updatedAllBoards]);
        setBoards(result);
        // set new state
      });

      // unsubscribing
      return () => {
        socketInstance.off("board_update");
      };
    }
    return null;
  }, [currTeamID]);

  return (
    <div className="BoardManager">
      {boards.map((val) => (
        <Board
          boardName={val.name}
          boardID={val.id}
          boards={boards}
          setBoards={setBoards}
          key={val.id}
          setAllBoards={setAllBoards}
          socket={socket}
        />
      ))}
      <AddBoardButton
        setBoards={setBoards}
        setAllBoards={setAllBoards}
        socket={socket}
      />
    </div>
  );
};

BoardManager.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBoards: PropTypes.func.isRequired,
  allBoards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAllBoards: PropTypes.func.isRequired,
};

export default BoardManager;
