type colorOptions =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "close";

interface ButtonProps {
  children?: string;
  optionalClass?: string;
  color?: colorOptions;
  onClick: () => void;
}

const Button = ({
  children,
  onClick,
  optionalClass = "",
  color = "primary",
}: ButtonProps) => {
  const extraProps = color === "close" && {
    "data-bs-dismiss": "alert",
    "aria-label": "Close",
  };
  return (
    <button
      className={`btn rounded-pill ${optionalClass} btn-${color}`}
      onClick={onClick}
      {...extraProps}
    >
      {children}
    </button>
  );
};

export default Button;
