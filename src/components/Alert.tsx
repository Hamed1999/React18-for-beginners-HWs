import { ReactNode } from "react";
import Button from "./Button";

interface AlertProps {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: AlertProps) => {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {children}
      <Button color="close" onClick={onClose} />
    </div>
  );
};

export default Alert;
