import PropTypes from "prop-types";
import "./DeleteBoardButton.css";

function DeleteBoardButton({ boardID, boards, setBoards }) {
  const handleClick = () => {
    const url = `http://localhost:3000/boards/${boardID}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          // if there is already no board with that id on server side
          // than we simply delete it from client's state
          const updatedState = boards.filter((board) => board.id !== boardID);
          setBoards(updatedState);
          return;
        }
        // if everything is ok and there is a board
        // that we want to remove on server side
        // than we wet new state to BoardManager with
        // all the rest boards
        setBoards(result);
      });
    // TODO: fetch error handling to be done
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
