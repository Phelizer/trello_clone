import PropTypes from "prop-types";
import "./DeleteBoardButton.css";

function DeleteBoardButton({ boardID, boards, setBoards }) {
  const handleClick = () => {
    const url = `http://localhost:3000/boards/${boardID}`;
    fetch(url, {
      method: "DELETE",
    });
    // fetch error handling to be done

    // const updatedState = boards.filter((board) => board.id !== boardID);
    // setBoards(updatedState);
  };
  return (
    <div className="DeleteBoardButton">
      <button type="button" className="DeleteButton" onClick={handleClick}>
        ×
      </button>
    </div>
  );
}

DeleteBoardButton.propTypes = {
  boardID: PropTypes.number.isRequired,
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBoards: PropTypes.func.isRequired,
};

export default DeleteBoardButton;
