import PropTypes from "prop-types";

const week = ({ name }) => {
  return <span>{name}</span>;
};

week.propTypes = {
  name: PropTypes.string.isRequired,
};

export default week;
