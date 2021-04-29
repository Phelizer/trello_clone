import { useState } from "react";
import Team from "./Team";
import { data } from "../data";
import "./TeamManager.css";

const TeamManager = () => {
  const [teams, setTeams] = useState(data);
  return (
    <div className="TeamManager">
      {teams.map((team) => (
        <Team name={team.name} key={team.id} id={team.id} />
      ))}
      {/* Add Team Butt. */}
    </div>
  );
};

export default TeamManager;
