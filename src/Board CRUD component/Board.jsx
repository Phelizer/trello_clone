import PropTypes from "prop-types";
import "./Board.css";
import DeleteBoardButton from "./DeleteBoardButton";

const Board = ({ boardName, boardID, boards, setBoards }) => (
  <div className="Board">
    <div id="BoardName">{boardName}</div>
    <DeleteBoardButton
      boardID={boardID}
      boards={boards}
      setBoards={setBoards}
    />
  </div>
);

Board.propTypes = {
  boardName: PropTypes.string.isRequired,
  boardID: PropTypes.number.isRequired,
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBoards: PropTypes.func.isRequired,
};

export default Board;
