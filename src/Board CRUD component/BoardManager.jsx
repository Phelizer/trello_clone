import { useState } from "react";
import Board from "./Board";
import AddBoardButton from "./AddBoardButton";

const BoardManager = () => {
  const [boards, setBoards] = useState([
    {
      name: "Board 1",
      link: "dkhgsdfj",
      id: 0,
    },
    {
      name: "Board 2",
      link: "dkhgsdfj",
      id: 1,
    },
  ]);

  return (
    <div>
      {boards.map((val, i) => (
        <Board
          boardName={val.name}
          boardID={val.id}
          boards={boards}
          setBoards={setBoards}
        />
      ))}
      <AddBoardButton boards={boards} setBoards={setBoards} />
    </div>
  );
};

export default BoardManager;
