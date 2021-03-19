export function composeStyles(styles) {
  if (!styles) return '';
  let res = '';
  Object.keys(styles).forEach((key) => {
    res += ' ' + key + ':' + styles[key].split(' ').join(' ' + key + ':');
  });

  return res;
}

export function computeStyles(styles, disabled = false, invalid = false) {
  const { actions, states, responsive } = styles;

  let computedStyles = styles.base + composeStyles(responsive);
  if (disabled) {
    computedStyles += states.disabled;
  } else {
    computedStyles += invalid ? ' ' + states.invalid : ' ' + states.valid;
    computedStyles += composeStyles(actions);
  }

  return computedStyles;
}

export function mergeStyles(defaultStyles, styles) {
  return Object.assign(Object.assign({}, defaultStyles), styles);
}
