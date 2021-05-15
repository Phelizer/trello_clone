import PropTypes from "prop-types";
import { useContext } from "react";
import { getPath } from "../Utils/Utils";
import { CookieContext } from "../CookiesContext";
import { SocketContext } from "../SocketContext";

const DeleteTaskButton = ({ taskID, tasks, setTasks }) => {
  const [cookies] = useContext(CookieContext);
  const { getConnection } = useContext(SocketContext);

  const handleClick = () => {
    // get array of path elements
    const path = getPath(window);
    const boardID = path[0];

    const url = `http://localhost:3000/task/${boardID}/${taskID}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.JWT}`,
      },
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
        const socket = getConnection();
        socket.emit("in-board_update", boardID);
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
