import PropTypes from "prop-types";
import "./Board.css";
import { Link } from "react-router-dom";
import DeleteBoardButton from "./DeleteBoardButton";

const Board = ({ boardName, boardID, boards, setBoards }) => (
  <div className="Board">
    <Link to={`/${boardID}`}>
      <div id="BoardName">{boardName}</div>
    </Link>
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
