import PropTypes from "prop-types";
import "./AddBoardButton.css";

function AddBoardButton({ boards, setBoards }) {
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
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBoards(result);
      });

    // setBoards(updatedState);
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
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBoards: PropTypes.func.isRequired,
};

export default AddBoardButton;
