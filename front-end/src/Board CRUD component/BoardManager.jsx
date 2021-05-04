import PropTypes from "prop-types";
import Board from "./Board";
import AddBoardButton from "./AddBoardButton";

const BoardManager = ({ boards, setBoards, setAllBoards }) => (
  <div className="BoardManager">
    {boards.map((val) => (
      <Board
        boardName={val.name}
        boardID={val.id}
        boards={boards}
        setBoards={setBoards}
        key={val.id}
        setAllBoards={setAllBoards}
      />
    ))}
    <AddBoardButton setBoards={setBoards} setAllBoards={setAllBoards} />
  </div>
);

BoardManager.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBoards: PropTypes.func.isRequired,
  setAllBoards: PropTypes.func.isRequired,
};

export default BoardManager;
