import PropTypes from "prop-types";
import "./Board.css";

const Board = ({ boardName }) => (
  <div className="Board">
    <div>{boardName}</div>
  </div>
);

Board.propTypes = {
  boardName: PropTypes.string.isRequired,
};

export default Board;
