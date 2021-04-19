import PropTypes from "prop-types";
import "./Task.css";
import DeleteTaskButton from "./DeleteTaskButton";

const Task = ({ taskName }) => (
  <div className="Task">
    <div>{taskName}</div>
    <DeleteTaskButton />
    <div>Executors tbd</div>
  </div>
);

Task.propTypes = {
  taskName: PropTypes.string.isRequired,
};

export default Task;
