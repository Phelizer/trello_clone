import PropTypes from "prop-types";
import { getPath } from "../Utils/Utils";

const DeleteTaskButton = ({ taskID, tasks, setTasks }) => {
  const handleClick = () => {
    // get array of path elements
    const path = getPath(window);

    const url = `http://localhost:3000/task/${path[0]}/${taskID}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          // if there is already no task with that id on server side
          // than we simply delete it from client's state
          const updatedState = tasks.filter((task) => task.id !== taskID);
          setTasks(updatedState);
        }

        setTasks(result);
      });
  };

  return (
    <div className="DeleteTaskButton">
      <button type="button" onClick={handleClick} className="DeleteButton">
        ×
      </button>
    </div>
  );
};

DeleteTaskButton.propTypes = {
  taskID: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      position: PropTypes.number,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default DeleteTaskButton;
