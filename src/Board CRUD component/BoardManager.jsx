import { useState } from "react";
import Board from "./Board";
import AddBoardButton from "./AddBoardButton";

const BoardManager = () => {
  const [boards, setBoards] = useState([
    {
      name: "Board 1",
      link: "dkhgsdfj",
    },
    {
      name: "Board 2",
      link: "dkhgsdfj",
    },
  ]);

  return (
    <div>
      {boards.map((val, i) => (
        <Board boardName={val.name} />
      ))}
      <AddBoardButton boards={boards} setBoards={setBoards} />
    </div>
  );
};

export default BoardManager;
