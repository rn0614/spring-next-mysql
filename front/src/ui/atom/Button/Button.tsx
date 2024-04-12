import React, {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  isDisable?: boolean;
  color?: string;
  onClick?: any;
};

export default function Button({
  children,
  color = "black",
  isDisable = false,
  onClick,
}: ButtonProps) {
  return (
    <div
      className={`${styles["button"]} ${styles[isDisable ? "gray" : color]}`}
      onClick={isDisable?()=>{}:onClick}
    >
      {children}
    </div>
  );
}
