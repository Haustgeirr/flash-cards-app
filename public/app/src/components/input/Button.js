import { computeStyles, mergeStyles } from '../../utils/styles';

const defaultStyles = {
  base:
    'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-gray-700 text-white transition duration-150 ease-out ',
  actions: {
    hover: ' bg-gray-400',
    focus: 'outline-none ring-4 ring-gray-500 ring-opacity-20 z-50',
  },
  states: {
    disabled: 'bg-gray-600 text-gray-300 cursor-wait',
  },
  responsive: {
    sm: 'text-sm',
  },
};

const Button = ({ styles = defaultStyles, ...props }) => {
  const { disabled, type } = props;

  styles = mergeStyles(defaultStyles, styles);
  const computedStyles = computeStyles(styles, disabled);

  return (
    <button
      disabled={disabled}
      type={type ? type : 'button'}
      className={computedStyles}
    >
      {props.children}
    </button>
  );
};

export default Button;
