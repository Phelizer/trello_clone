import { useContext, useState } from "react";
import PropTypes from "prop-types";
import DeleteTeamButton from "./DeleteTeamButton";
import "./Team.css";
import { CurrentTeamContext } from "../CurrentTeamContext";
import Popup from "../Utils/Popup";
import { CookieContext } from "../CookiesContext";

const Team = ({ name, id, setTeams, allBoards, setBoards }) => {
  const [currTeamID, setCurrTeamID] = useContext(CurrentTeamContext);
  const [popupActive, setPopupActive] = useState(false);

  const [currEmailToAdd, setCurrEmailToAdd] = useState("");
  const [currEmailToDelete, setCurrEmailToDelete] = useState("");

  const [cookies] = useContext(CookieContext);

  const changeTeam = () => {
    const newBoards = allBoards.filter((board) => board.team_id === id);
    setBoards(newBoards);
    setCurrTeamID(id);
  };

  const submitAddHandler = (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/team/users/${id}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: currEmailToAdd,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.JWT}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  const submitRemoveHandler = () => {};
  const addUserChangeHandler = (e) => {
    setCurrEmailToAdd(e.target.value);
  };
  const deleteUserChangeHandler = (e) => {
    setCurrEmailToDelete(e.target.value);
  };

  return (
    <div className="Team">
      <button type="button" onClick={changeTeam}>
        {name}
      </button>
      <button
        type="button"
        className="Members"
        onClick={() => setPopupActive(true)}
      >
        🧍
      </button>
      <DeleteTeamButton id={id} setTeams={setTeams} />

      <Popup active={popupActive} setActive={setPopupActive}>
        <form onSubmit={submitAddHandler}>
          <label htmlFor="userToAdd">
            Add user by email:
            <input
              type="text"
              id="userToAdd"
              name="userToAdd"
              onChange={addUserChangeHandler}
            />
          </label>
        </form>

        <form onSubmit={submitRemoveHandler}>
          <label htmlFor="userToAdd">
            Remove user by email:
            <input
              type="text"
              id="userToDelete"
              name="userToDelete"
              onChange={deleteUserChangeHandler}
            />
          </label>
        </form>
      </Popup>
    </div>
  );
};

Team.propTypes = {
  name: PropTypes.string.isRequired,
  setTeams: PropTypes.func.isRequired,
  allBoards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBoards: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Team;
