import PropTypes from "prop-types";
// import "./AddSectionButton.css";

function AddSectionButton({ sections, setSections }) {
  const handleClick = () => {
    const newObject = {
      name: "added section",
      id:
        // random id
        Math.floor(Math.random() * (Number.MAX_VALUE - 0)) + 0,
      position: 0,
    };
    const updatedState = [...sections, newObject];
    setSections(updatedState);
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
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      position: PropTypes.number,
    })
  ).isRequired,
  setSections: PropTypes.func.isRequired,
};

export default AddSectionButton;
