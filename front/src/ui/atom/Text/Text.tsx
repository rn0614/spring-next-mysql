import React, { ReactNode } from "react";
import styles from "./Text.module.scss";

type TextProps = {
  children: ReactNode;
  size?: "lg" | "md" | "sm";
  color?: string;
};

export default function Text({
  children,
  size = "md",
  color = "primary",
}: TextProps) {
  return (
    <div className={`${styles["size-" + size]} ${styles["color-" + color]}`}>
      {children}
    </div>
  );
}
