import PropTypes from "prop-types";
// import "./DeleteBoardButton.css";
import { getPath } from "../Utils/Utils";

function DeleteSectionButton({ sectionID, sections, setSections }) {
  const handleClick = () => {
    // get array of path elements
    const path = getPath(window);

    const url = `http://localhost:3000/board/${path[0]}/${sectionID}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          // if there is already no section with that id on server side
          // than we simply delete it from client's state
          const updatedState = sections.filter(
            (board) => board.id !== sectionID
          );
          setSections(updatedState);
        }

        setSections(result);
      });
  };
  return (
    <div className="DeleteSectionButton">
      <button type="button" className="DeleteButton" onClick={handleClick}>
        ×
      </button>
    </div>
  );
}

DeleteSectionButton.propTypes = {
  sectionID: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      position: PropTypes.number,
    })
  ).isRequired,
  setSections: PropTypes.func.isRequired,
};

export default DeleteSectionButton;
