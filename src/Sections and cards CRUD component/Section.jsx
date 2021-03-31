import PropTypes from "prop-types";

const Section = ({ sectionName }) => (
  <div className="Section">
    <div>{sectionName}</div>
    {/* delete section button */}
    {/* task list */}
  </div>
);

Section.propTypes = {
  sectionName: PropTypes.string.isRequired,
};

export default Section;
