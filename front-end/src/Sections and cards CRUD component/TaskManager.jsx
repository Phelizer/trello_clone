import { useState } from "react";
import Section from "./Section";
import AddSectionButton from "./AddSectionButton";

const TaskManager = () => {
  const [sections, setSections] = useState({
    sectionArr: [
      {
        name: "Section 1",
        id: 0,
        position: 0,
      },
      {
        name: "Section 2",
        id: 1,
        position: 1,
      },
      {
        name: "Section 3",
        id: 2,
        position: 2,
      },
    ],

    taskArr: [
      {
        name: "Task 1",
        id: 0,
        section: 2,
        priority: 1,
        timestamp: new Date().getTime(),
        executorIDArr: [],
      },
      {
        name: "Task 2",
        id: 1,
        section: 0,
        priority: 2,
        timestamp: new Date().getTime(),
        executorIDArr: [],
      },
      {
        name: "Task 3",
        id: 2,
        section: 0,
        priority: 2,
        timestamp: new Date().getTime(),
        executorIDArr: [],
      },
    ],
  });

  return (
    <div className="TaskManager">
      {sections.sectionArr.map((val) => (
        <Section key={val.id} sectionName={val.name} />
      ))}
      <AddSectionButton sections={sections} setSections={setSections} />
    </div>
  );
};

export default TaskManager;
