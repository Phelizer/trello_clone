import PropTypes from "prop-types";
import "./AddBoardButton.css";

function AddBoardButton({ boards, setBoards }) {
  const handleClick = () => {
    // to be changed
    const boardName = prompt("Input board name", "New board");

    const newObject = { name: boardName, link: "to be done", id: 2 };
    const updatedState = [...boards, newObject];

    setBoards(updatedState);
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
