const TextField = (props) => {
  const {
    name,
    type,
    required,
    placeholder,
    autoComplete,
    autoFocus,
    inputMode,
    value,
    onChange,
    className,
  } = props;

  return (
    <div>
      <input
        id={name}
        name={name}
        type={type ? type : 'text'}
        value={value}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete ? autoComplete : 'off'}
        inputMode={inputMode ? inputMode : 'text'}
        autoFocus={autoFocus}
        className={`${className} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 focus:z-50 sm:text-sm`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextField;
