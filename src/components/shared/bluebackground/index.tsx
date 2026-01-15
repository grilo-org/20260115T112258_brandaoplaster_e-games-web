import React, { ReactNode } from "react";
import styles from "./styles.module.css";

interface BlueBackgroundProps {
  children?: ReactNode;
}

const BlueBackground: React.FC<BlueBackgroundProps> = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};

export default BlueBackground;
