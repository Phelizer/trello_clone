import PropTypes from "prop-types";
import { useContext } from "react";
import { getPath } from "../Utils/Utils";
import { CookieContext } from "../CookiesContext";

const AddTaskButton = ({ setTasks, sectionID }) => {
  const [cookies] = useContext(CookieContext);

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
        Authorization: `Bearer ${cookies.JWT}`,
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
