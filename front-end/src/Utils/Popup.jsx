/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import "./Popup.css";

const Popup = ({ children, active, setActive }) => (
  <div
    role="button"
    className={active ? "PopupBox active" : "PopupBox"}
    tabIndex="0"
    onClick={() => setActive(false)}
  >
    <div
      role="button"
      tabIndex="0"
      className="Box"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Popup;

Popup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};
