import { useEffect, useState, useContext } from "react";
import Board from "./Board";
import AddBoardButton from "./AddBoardButton";
import { CookieContext } from "../CookiesContext";

const BoardManager = () => {
  // needed for fetch error handling
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // boards is a list of boards,
  // which should be fetched from the server
  const [boards, setBoards] = useState([]);

  const [cookies] = useContext(CookieContext);

  // fetching the list of boards
  useEffect(() => {
    fetch("http://localhost:3000/boards", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.JWT}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBoards(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  }, [cookies.JWT]);

  // fetch error handling
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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
