import PropTypes from "prop-types";
import "./Board.css";
import { Link } from "react-router-dom";
import DeleteBoardButton from "./DeleteBoardButton";

const Board = ({
  boardName,
  boardID,
  boards,
  setBoards,
  setAllBoards,
  socket,
}) => (
  <div className="Board">
    <Link to={`/${boardID}`}>
      <div id="BoardName">{boardName}</div>
    </Link>
    <DeleteBoardButton
      boardID={boardID}
      boards={boards}
      setBoards={setBoards}
      setAllBoards={setAllBoards}
      socket={socket}
    />
  </div>
);

Board.propTypes = {
  boardName: PropTypes.string.isRequired,
  boardID: PropTypes.number.isRequired,
  //  to be fixed
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBoards: PropTypes.func.isRequired,
  setAllBoards: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  socket: PropTypes.object.isRequired,
};

export default Board;
