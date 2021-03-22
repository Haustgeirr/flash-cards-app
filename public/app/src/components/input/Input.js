const defaultStyles =
  'appearance-none rounded-none relative block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-800 transition duration-150 ease-out hover:border-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 focus:z-50 disabled:bg-gray-100 disabled:border-gray-200 sm:text-sm';

const Input = ({ className = defaultStyles, ...props }) => {
  const {
    autoComplete,
    autoFocus,
    disabled,
    id,
    invalid,
    name,
    placeholder,
    required,
    type,
    value,
    onChange,
  } = props;

  return (
    <div>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        aria-invalid={invalid}
        autoComplete={autoComplete ? autoComplete : 'off'}
        autoFocus={autoFocus}
        className={className}
        disabled={disabled}
        required={required}
        type={type ? type : 'text'}
        value={value}
        onChange={onChange ? onChange : () => {}}
      />
    </div>
  );
};

export default Input;
