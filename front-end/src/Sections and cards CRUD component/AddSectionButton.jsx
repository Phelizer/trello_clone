import PropTypes from "prop-types";
// import "./AddSectionButton.css";
import { useContext } from "react";
import { getPath } from "../Utils/Utils";
import { CookieContext } from "../CookiesContext";
import { SocketContext } from "../SocketContext";

function AddSectionButton({ setSections }) {
  const [cookies] = useContext(CookieContext);
  const { getConnection } = useContext(SocketContext);

  const handleClick = () => {
    const sectionName = prompt("Input section name", "New section");

    // get array of path elements
    const path = getPath(window);
    const boardID = path[0];

    const url = `http://localhost:3000/board/${boardID}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: sectionName,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.JWT}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setSections(result);
        const socket = getConnection();
        socket.emit("in-board_update", boardID);
      });
  };

  return (
    <div className="AddSectionButton">
      <button type="button" onClick={handleClick}>
        Add section
      </button>
    </div>
  );
}

AddSectionButton.propTypes = {
  setSections: PropTypes.func.isRequired,
};

export default AddSectionButton;
