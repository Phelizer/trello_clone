import PropTypes from "prop-types";
import "./Section.css";
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
  <div className="Section">
    <div>{sectionName}</div>
    <DeleteSectionButton
      sectionID={sectionID}
      sections={sections}
      setSections={setSections}
    />
    {tasks
      .filter((task) => task.section === sectionID)
      .map((task) => (
        <Task taskName={task.name} key={task.id} setTasks={setTasks} />
      ))}
    <AddTaskButton sectionID={sectionID} setTasks={setTasks} />
  </div>
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
