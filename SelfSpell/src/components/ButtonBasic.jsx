import PropTypes from 'prop-types';

const ButtonBasic = ({ text, ...props }) => {
  return (
    <button
      {...props}
      className="bg-state-blue-gradient border-primary rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]"
    >
      {text}
    </button>
  );
};

ButtonBasic.propTypes = {
  text: PropTypes.string.isRequired, // Validate that 'text' is a required string
};


export default ButtonBasic;
