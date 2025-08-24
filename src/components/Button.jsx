
const Button = ({ title, className, onClick, disabled, children }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children ? children : title}
    </button>
  );
};

export default Button;
