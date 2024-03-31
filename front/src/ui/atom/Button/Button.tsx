import React, { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  color?: string;
  onClick?:any
} ;

export default function Button({
  children,
  color = "black",
  onClick,
}: ButtonProps) {
  return (
    <div className={`${styles["button"]} ${styles[color]}`} onClick={onClick}>
      {children}
    </div>
  );
}
