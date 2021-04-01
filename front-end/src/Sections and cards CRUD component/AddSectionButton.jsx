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
    const sectionsCopy = sections;
    const updatedState = {
      sectionArr: [...sectionsCopy.sectionArr, newObject],
      taskArr: [...sectionsCopy.taskArr],
    };
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
  sections: PropTypes.shape({
    sectionArr: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        position: PropTypes.number,
      })
    ),

    taskArr: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        section: PropTypes.number,
        priority: PropTypes.number,
        timestamp: PropTypes.number,
        executor: PropTypes.arrayOf(PropTypes.number),
      })
    ),
  }).isRequired,
  setSections: PropTypes.func.isRequired,
};

export default AddSectionButton;
