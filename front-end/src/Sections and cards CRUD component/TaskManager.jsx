import { useEffect, useState } from "react";
import Section from "./Section";
import AddSectionButton from "./AddSectionButton";
import { getPath } from "../Utils/Utils";

const TaskManager = () => {
  // needed for fetch error handling
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [sections, setSections] = useState([]);
  const [tasks, setTasks] = useState([]);

  // fetching the list of sections
  useEffect(() => {
    // get array of path elements
    const path = getPath(window);

    fetch(`http://localhost:3000/board/${path[0]}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setSections(result.sections);
          setTasks(result.tasks);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  }, []);

  // fetch error handling
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="TaskManager">
      {sections.map((val) => (
        <Section
          key={val.id}
          sectionName={val.name}
          sectionID={val.id}
          sections={sections}
          setSections={setSections}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
      <AddSectionButton setSections={setSections} />
    </div>
  );
};

export default TaskManager;
