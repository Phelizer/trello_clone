import PropTypes from "prop-types";
// import "./DeleteBoardButton.css";

function DeleteSectionButton({ sectionID, sections, setSections }) {
  const handleClick = () => {
    const updatedState = sections.filter((sect) => sect.id !== sectionID);

    setSections(updatedState);
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
