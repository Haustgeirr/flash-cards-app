const Button = ({ className = 'btn', children, ...props }) => {
  const { disabled, type, onClick } = props;

  return (
    <button
      disabled={disabled}
      type={type ? type : 'button'}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
