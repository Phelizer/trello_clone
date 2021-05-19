import PropTypes from "prop-types";
import { useContext } from "react";
import { CookieContext } from "../CookiesContext";

const DeleteTeamButton = ({ id, setTeams }) => {
  const [cookies] = useContext(CookieContext);
  const handleClick = () => {
    const url = `http://localhost:3000/team/${id}`;
    fetch(url, {
      method: "DELETE",
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
    <div className="DeleteTeamButton">
      <button type="button" className="DeleteButton" onClick={handleClick}>
        ×
      </button>
    </div>
  );
};

DeleteTeamButton.propTypes = {
  id: PropTypes.number.isRequired,
  setTeams: PropTypes.func.isRequired,
};

export default DeleteTeamButton;
