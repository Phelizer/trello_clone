import PropTypes from "prop-types";
import "./AddBoardButton.css";

function AddBoardButton({ boards, setBoards }) {
  const handleClick = () => {
    const newObject = { name: "added board", link: "to be done" };
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
