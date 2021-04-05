import { useState } from "react";
import Board from "./Board";
import AddBoardButton from "./AddBoardButton";

const BoardManager = () => {
  const [boards, setBoards] = useState([
    {
      name: "Board 1",
      id: 0,
    },
    {
      name: "Board 2",
      id: 1,
    },
  ]);

  return (
    <div className="BoardManager">
      {boards.map((val) => (
        <Board
          boardName={val.name}
          boardID={val.id}
          boards={boards}
          setBoards={setBoards}
          key={val.id}
        />
      ))}
      <AddBoardButton boards={boards} setBoards={setBoards} />
    </div>
  );
};

export default BoardManager;
