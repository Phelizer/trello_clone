import PropTypes, { string } from "prop-types";
import "./Task.css";

const Task = ({ taskName }) => (
  <div className="Task">
    <div>{taskName}</div>
    <div>Executors tbd</div>
  </div>
);

Task.propTypes = {
  taskName: PropTypes.string.isRequired,
};

export default Task;
