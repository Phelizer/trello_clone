import { useContext } from "react";
import PropTypes from "prop-types";
import { CookieContext } from "../CookiesContext";

const AddTeamButton = ({ setTeams }) => {
  const [cookies] = useContext(CookieContext);
  const handleClick = () => {
    const teamName = prompt("Input team name", "New team");

    const url = "http://localhost:3000/team";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: teamName,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.JWT}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setTeams(result);
      });
  };
  return (
    <div className="AddTeamButton">
      <button type="button" onClick={handleClick}>
        Add team
      </button>
    </div>
  );
};

AddTeamButton.propTypes = {
  setTeams: PropTypes.func.isRequired,
};

export default AddTeamButton;
