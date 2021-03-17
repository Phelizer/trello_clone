import { useState } from "react";
import Board from "./Board";

const BoardManager = () => {
  const [boards] = useState([
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
      <Board boardName={boards[0].name} />
      <Board boardName={boards[1].name} />
    </div>
  );
};

export default BoardManager;
