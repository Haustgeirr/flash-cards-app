const Input = ({ className = 'input-default', ...props }) => {
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
