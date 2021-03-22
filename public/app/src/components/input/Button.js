const defaultStyles =
  'inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-gray-700 text-white transition duration-150 ease-out disabled:bg-gray-300 disabled:text-gray-50 disabled:cursor-not-allowed  hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-20 focus:z-50 sm:text-sm';

const Button = ({ className = defaultStyles, ...props }) => {
  const { disabled, type, onClick } = props;

  return (
    <button
      disabled={disabled}
      type={type ? type : 'button'}
      className={className}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
