import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DeleteTeamButton from "./DeleteTeamButton";
import "./Team.css";
import { CurrentTeamContext } from "../CurrentTeamContext";

const Team = ({ name, id, setTeams, allBoards, setBoards }) => {
  const [currTeamID, setCurrTeamID] = useContext(CurrentTeamContext);

  const changeTeam = () => {
    const newBoards = allBoards.filter((board) => board.team_id === id);
    setBoards(newBoards);
    setCurrTeamID(id);
  };

  return (
    <div className="Team">
      <button type="button" onClick={changeTeam}>
        {name}
      </button>
      <Link className="Members" to="">
        🧍
      </Link>
      <DeleteTeamButton id={id} setTeams={setTeams} />
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
