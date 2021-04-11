import PropTypes from "prop-types";
import "./Section.css";
import DeleteSectionButton from "./DeleteSectionButton";

const Section = ({ sectionName, sectionID, sections, setSections }) => (
  <div className="Section">
    <div>{sectionName}</div>
    <DeleteSectionButton
      sectionID={sectionID}
      sections={sections}
      setSections={setSections}
    />
    {/* task list */}
  </div>
);

Section.propTypes = {
  sectionName: PropTypes.string.isRequired,
  sectionID: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      position: PropTypes.number,
    })
  ).isRequired,
  setSections: PropTypes.func.isRequired,
};

export default Section;
