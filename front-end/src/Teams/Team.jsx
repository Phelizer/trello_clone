import { useContext, useState } from "react";
import PropTypes from "prop-types";
import DeleteTeamButton from "./DeleteTeamButton";
import "./Team.css";
import { CurrentTeamContext } from "../CurrentTeamContext";
import Popup from "../Utils/Popup";

const Team = ({ name, id, setTeams, allBoards, setBoards }) => {
  const [currTeamID, setCurrTeamID] = useContext(CurrentTeamContext);
  const [popupActive, setPopupActive] = useState(false);

  const changeTeam = () => {
    const newBoards = allBoards.filter((board) => board.team_id === id);
    setBoards(newBoards);
    setCurrTeamID(id);
  };

  const submitAddHandler = () => {};
  const submitRemoveHandler = () => {};
  const addUserChangeHandler = () => {};
  const deleteUserChangeHandler = () => {};

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
