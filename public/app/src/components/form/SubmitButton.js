const SubmitButton = (props) => {
  const { className, disabled } = props;
  const defaultStyle =
    'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-800 focus:ring-opacity-20';

  return (
    <button
      type='submit'
      disabled={disabled}
      className={className ? className : defaultStyle}
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
