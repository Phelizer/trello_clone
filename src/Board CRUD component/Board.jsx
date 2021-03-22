import PropTypes from "prop-types";

const Board = ({ boardName }) => (
  <div>
    <div>{boardName}</div>
  </div>
);

Board.propTypes = {
  boardName: PropTypes.string.isRequired,
};

export default Board;
