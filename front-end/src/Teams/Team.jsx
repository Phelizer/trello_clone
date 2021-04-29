import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DeleteTeamButton from "./DeleteTeamButton";
import "./Team.css";

const Team = ({ name }) => {
  const clickHandler = () => {};
  return (
    <div className="Team">
      <button type="button" onClick={clickHandler}>
        {name}
      </button>
      <Link className="Members" to="">
        🧍
      </Link>
      <DeleteTeamButton />
    </div>
  );
};

Team.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Team;
