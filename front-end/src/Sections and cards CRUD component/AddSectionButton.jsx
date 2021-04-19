import PropTypes from "prop-types";
// import "./AddSectionButton.css";
import { getPath } from "../Utils/Utils";

function AddSectionButton({ setSections }) {
  const handleClick = () => {
    const sectionName = prompt("Input section name", "New section");

    // get array of path elements
    const path = getPath(window);

    const url = `http://localhost:3000/board/${path[0]}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: sectionName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setSections(result);
      });
  };

  return (
    <div className="AddSectionButton">
      <button type="button" onClick={handleClick}>
        Add section
      </button>
    </div>
  );
}

AddSectionButton.propTypes = {
  /* sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      position: PropTypes.number,
    })
  ).isRequired, */
  setSections: PropTypes.func.isRequired,
};

export default AddSectionButton;
