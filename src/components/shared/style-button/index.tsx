import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconProp;
  action?: string;
  type_button?: string;
  active?: boolean;
};

const StyleButton: React.FC<ButtonProps> = ({
  icon,
  action,
  type_button,
  active = false,
  ...rest
}) => {
  return (
    <Button
      className={`
        ${type_button == "red" ? styles.red_button : styles.blue_button}  
        ${active ? "active" : ""}
        `}
      {...rest}
    >
      {icon && <FontAwesomeIcon icon={icon} className={action && "mr-2"} />}{" "}
      {action}
    </Button>
  );
};

export default StyleButton;
