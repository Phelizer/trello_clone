import PropTypes from "prop-types";
import "./Task.css";
import DeleteTaskButton from "./DeleteTaskButton";

const Task = ({ taskName, setTasks, tasks, taskID }) => (
  <div className="Task">
    <div>{taskName}</div>
    <DeleteTaskButton taskID={taskID} tasks={tasks} setTasks={setTasks} />
    <div>Executors tbd</div>
  </div>
);

Task.propTypes = {
  taskName: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      section: PropTypes.number,
      priority: PropTypes.number,
      timestamp: PropTypes.number,
      executorIDArr: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
  taskID: PropTypes.number.isRequired,
};

export default Task;
