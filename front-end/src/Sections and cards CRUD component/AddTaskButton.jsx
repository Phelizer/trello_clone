import PropTypes from "prop-types";
import { useContext } from "react";
import { getPath } from "../Utils/Utils";
import { CookieContext } from "../CookiesContext";
import { SocketContext } from "../SocketContext";

const AddTaskButton = ({ setTasks, sectionID }) => {
  const [cookies] = useContext(CookieContext);
  const { getConnection } = useContext(SocketContext);

  const handleClick = () => {
    const taskName = prompt("Input task");

    // get array of path elements
    const path = getPath(window);
    const boardID = path[0];

    const url = `http://localhost:3000/task/${boardID}/${sectionID}`;

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
        const socket = getConnection();
        socket.emit("in-board_update", boardID);
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
