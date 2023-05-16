import PropTypes from "prop-types";

function Button({ text, onClick, classname }) {
  return (
    <button onClick={onClick} className={classname}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
