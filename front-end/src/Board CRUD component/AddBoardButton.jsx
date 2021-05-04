import PropTypes from "prop-types";
import "./AddBoardButton.css";
import { useContext } from "react";
import { CookieContext } from "../CookiesContext";
import { CurrentTeamContext } from "../CurrentTeamContext";

function AddBoardButton({ setBoards, setAllBoards }) {
  const [cookies] = useContext(CookieContext);
  const [currTeamID] = useContext(CurrentTeamContext);
  const handleClick = () => {
    // to be changed:
    let boardName = prompt("Input board name", "New board");

    // if user cancel the prompt, we cancel the handleClick()
    if (boardName === null) return;

    // if user tries to input an empty name
    // we ask to redo the name
    while (boardName === "") {
      boardName = prompt(
        "Board name shouldn't be empty. Please, re-enter the board name",
        "New board"
      );

      // if user cancel the prompt, we cancel the handleClick()
      if (boardName === null) return;
    }

    const url = "http://localhost:3000/boards";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: boardName,
        team_id: currTeamID,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.JWT}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setAllBoards(result);
        const newBoards = result.filter(
          (board) => board.team_id === currTeamID
        );
        setBoards(newBoards);
      });
  };

  return (
    <div className="AddBoardButton">
      <button type="button" onClick={handleClick}>
        Add board
      </button>
    </div>
  );
}

AddBoardButton.propTypes = {
  setBoards: PropTypes.func.isRequired,
  setAllBoards: PropTypes.func.isRequired,
};

export default AddBoardButton;
