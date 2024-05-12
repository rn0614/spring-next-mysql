import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

type ButtonProps = {
  secondary?: boolean;
  bgColor?: string;
  ftColor?: string;
  width?: string;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  secondary = false,
  bgColor,
  ftColor,
  width,
  ...restProps
}: ButtonProps) {
  const composeClassess = classNames(
    styles.button,
    secondary ? styles.secondary : styles.primary
  );
  const style = {
    backgroundColor: bgColor || "",
    color: ftColor || "",
    width: width || "",
  };

  return <button className={composeClassess} style={style} {...restProps} />;
}
