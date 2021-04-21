import PropTypes from "prop-types";
import { getPath } from "../Utils/Utils";

const AddTaskButton = ({ setTasks, sectionID }) => {
  const handleClick = () => {
    const taskName = prompt("Input task");

    // get array of path elements
    const path = getPath(window);

    const url = `http://localhost:3000/task/${path[0]}/${sectionID}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: taskName,
        priority: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setTasks(result);
      });
  };

  return (
    <div className="AddTaskButton">
      <button type="button" onClick={handleClick}>
        Add task
      </button>
    </div>
  );
};

AddTaskButton.propTypes = {
  sectionID: PropTypes.number.isRequired,
  setTasks: PropTypes.func.isRequired,
  //   setTasks: PropTypes.func.isRequired,
};

export default AddTaskButton;
