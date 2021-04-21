import PropTypes from "prop-types";
import "./Section.css";
import { Droppable } from "react-beautiful-dnd";
import DeleteSectionButton from "./DeleteSectionButton";
import Task from "./Task";
import AddTaskButton from "./AddTaskButton";

const Section = ({
  sectionName,
  sectionID,
  sections,
  setSections,
  tasks,
  setTasks,
}) => (
  <Droppable droppableId={`section-${sectionID}`}>
    {(provided) => (
      <div
        className="Section"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        <div>{sectionName}</div>
        <DeleteSectionButton
          sectionID={sectionID}
          sections={sections}
          setSections={setSections}
        />
        {tasks
          .filter((task) => task.section === sectionID)
          .map((task, index) => (
            <Task
              taskName={task.name}
              key={task.id}
              taskID={task.id}
              setTasks={setTasks}
              tasks={tasks}
              index={index}
            />
          ))}
        {provided.placeholder}
        <AddTaskButton sectionID={sectionID} setTasks={setTasks} />
      </div>
    )}
  </Droppable>
);

Section.propTypes = {
  sectionName: PropTypes.string.isRequired,
  sectionID: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      position: PropTypes.number,
    })
  ).isRequired,
  setSections: PropTypes.func.isRequired,
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
};

export default Section;
