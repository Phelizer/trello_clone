import PropTypes from "prop-types";
import Team from "./Team";
import "./TeamManager.css";
import AddTeamButton from "./AddTeamButton";

const TeamManager = ({ teams, setTeams, setBoards, allBoards }) => (
  <div className="TeamManager">
    {teams.map((team) => (
      <Team
        name={team.name}
        key={team.id}
        id={team.id}
        setTeams={setTeams}
        allBoards={allBoards}
        setBoards={setBoards}
      />
    ))}
    <AddTeamButton setTeams={setTeams} />
  </div>
);

TeamManager.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  ).isRequired,
  setTeams: PropTypes.func.isRequired,
  allBoards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBoards: PropTypes.func.isRequired,
};

export default TeamManager;
