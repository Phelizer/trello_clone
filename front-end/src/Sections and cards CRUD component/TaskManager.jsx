import { useEffect, useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Section from "./Section";
import AddSectionButton from "./AddSectionButton";
import { getPath } from "../Utils/Utils";
import { CookieContext } from "../CookiesContext";

const TaskManager = () => {
  // needed for fetch error handling
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [sections, setSections] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [currentSection, setCurrentSection] = useState(null);

  const [cookies] = useContext(CookieContext);

  // fetching the list of sections
  useEffect(() => {
    // get array of path elements
    const path = getPath(window);

    fetch(`http://localhost:3000/board/${path[0]}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.JWT}`,
      },
    })
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
  }, [cookies.JWT]);

  // fetch error handling
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // functions for handling sections drag n drop
  const dragStartHandler = (event, secID) => {
    setCurrentSection(secID);
  };
  const dragLeaveHandler = (event) => {};
  const dragEndHandler = (event) => {};
  const dragOverHandler = (event) => {
    event.preventDefault();
  };
  const dropHandler = (event, secID) => {
    event.preventDefault();

    const path = getPath(window);
    const boardID = path[0];
    const sectionID = currentSection;
    const newPos = sections.find((sec) => sec.id === secID).position;

    const url = `http://localhost:3000/board/${boardID}/${sectionID}`;
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        newPosition: newPos,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.JWT}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setSections(result);
      });
  };

  const dndHandlerBundle = {
    dragStartHandler,
    dragLeaveHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
  };

  const sortedSections = (arr) =>
    arr.sort((a, b) => (a.position < b.position ? -1 : 1));

  // handler for dropping the task into section
  const onTaskDrop = (dropResult) => {
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
        Authorization: `Bearer ${cookies.JWT}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setTasks(result);
      });
  };

  return (
    <DragDropContext onDragEnd={onTaskDrop}>
      <div className="TaskManager">
        {sortedSections(sections).map((val) => (
          <Section
            key={val.id}
            sectionName={val.name}
            sectionID={val.id}
            sections={sections}
            setSections={setSections}
            tasks={tasks}
            setTasks={setTasks}
            dndHandlers={dndHandlerBundle}
          />
        ))}
        <AddSectionButton setSections={setSections} />
      </div>
    </DragDropContext>
  );
};

export default TaskManager;
