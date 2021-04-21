import PropTypes from "prop-types";
import "./Task.css";
import { Draggable } from "react-beautiful-dnd";
import DeleteTaskButton from "./DeleteTaskButton";

const Task = ({ taskName, setTasks, tasks, taskID, index }) => (
  <Draggable draggableId={`task-${taskID}`} index={index}>
    {(provided) => (
      <div
        className="Task"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...provided.draggableProps}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <div>{taskName}</div>
        <DeleteTaskButton taskID={taskID} tasks={tasks} setTasks={setTasks} />
        <div>Executors tbd</div>
      </div>
    )}
  </Draggable>
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
  index: PropTypes.number.isRequired,
};

export default Task;
