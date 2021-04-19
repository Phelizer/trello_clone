import { useEffect, useState } from "react";
import Section from "./Section";
import AddSectionButton from "./AddSectionButton";
import { getPath } from "../Utils/Utils";

const TaskManager = () => {
  // needed for fetch error handling
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // sections is a list of sections,
  // which should be fetched from the server
  const [sections, setSections] = useState([]);

  // fetching the list of sections
  useEffect(() => {
    // get array of path elements
    const path = getPath(window);

    fetch(`http://localhost:3000/board/${path[0]}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setSections(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  }, []);

  const [tasks, setTasks] = useState([
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
  ]);

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
      <AddSectionButton sections={sections} setSections={setSections} />
    </div>
  );
};

export default TaskManager;
