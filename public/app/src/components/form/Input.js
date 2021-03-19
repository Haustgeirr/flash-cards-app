import { computeStyles, mergeStyles } from '../../utils/styles';

const defaultStyles = {
  base:
    'appearance-none rounded-none relative block w-full mt-1 px-3 py-2 border rounded-md placeholder-gray-500 text-gray-800 transition duration-150 ease-out',
  actions: {
    hover: ' border-gray-500',
    focus:
      'outline-none ring-4 ring-gray-500 border-gray-500 ring-opacity-20 z-50',
    active: '',
  },
  states: {
    disabled: 'bg-gray-100 border-gray-200',
    valid: 'border-gray-300',
    invalid: 'border-red-400',
  },
  responsive: {
    sm: 'text-sm',
    md: '',
    lg: '',
  },
};

const Input = ({ styles = defaultStyles, ...props }) => {
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

  styles = mergeStyles(defaultStyles, styles);
  const computedStyles = computeStyles(styles, disabled, invalid);

  return (
    <div>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type ? type : 'text'}
        value={value}
        aria-invalid={invalid}
        autoComplete={autoComplete ? autoComplete : 'off'}
        autoFocus={autoFocus}
        disabled={disabled}
        required={required}
        className={computedStyles}
        onChange={onChange ? onChange : () => {}}
      />
    </div>
  );
};

export default Input;
