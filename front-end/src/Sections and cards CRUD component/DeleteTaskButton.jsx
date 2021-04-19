import PropTypes from "prop-types";

const DeleteTaskButton = ({}) => {
  const handleClick = () => {};

  return (
    <div className="DeleteTaskButton">
      <button type="button" onClick={handleClick} className="DeleteButton">
        ×
      </button>
    </div>
  );
};

// DeleteTaskButton.propTypes = {
//   taskID: PropTypes.number.isRequired,
//   tasks: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string,
//       id: PropTypes.number,
//       position: PropTypes.number,
//     })
//   ).isRequired,
//   setTasks: PropTypes.func.isRequired,
// };

export default DeleteTaskButton;
