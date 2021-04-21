import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
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

  // handler for dropping the task into section
  const onDrop = (dropResult) => {
    if (!dropResult.destination) return;
    const sectionID = parseInt(
      dropResult.destination.droppableId.split("-")[1],
      10
    );
    const taskID = parseInt(dropResult.draggableId.split("-")[1], 10);
    const path = getPath(window);
    const boardID = path[0];

    const url = `http://localhost:3000/task/${boardID}/${taskID}`;
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        newSection: sectionID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setTasks(result);
      });
  };

  return (
    <DragDropContext onDragEnd={onDrop}>
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
    </DragDropContext>
  );
};

export default TaskManager;
