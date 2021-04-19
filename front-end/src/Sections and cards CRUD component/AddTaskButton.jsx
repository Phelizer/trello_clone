import PropTypes from "prop-types";

const AddTaskButton = () => {
  const handleClick = () => {};

  return (
    <div className="AddTaskButton">
      <button type="button" onClick={handleClick}>
        Add section
      </button>
    </div>
  );
};

// AddTaskButton.propTypes = {
//   setTasks: PropTypes.func.isRequired,
// };

export default AddTaskButton;
