import PropTypes from "prop-types";

const DeleteTeamButton = ({ id }) => {
  const handleClick = () => {};
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
};

export default DeleteTeamButton;
