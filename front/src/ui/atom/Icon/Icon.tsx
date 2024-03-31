import React, { forwardRef } from "react";
import styles from "./Icon.module.scss";

type IconProps = {
  icon: string;
  heading?: boolean;
  name?: string;
  onClick?: any;
};

export default function Icon({
  icon,
  heading = false,
  onClick,
}: IconProps) {
  return (
    <div
      className={heading ? styles["heading-box"] : styles["icon-box"]}
      onClick={onClick}
    >
      <div className={`${styles["icon"]} ${styles[icon]}`}></div>
    </div>
  );
}

type IconButtonProps = {
  onButtonClick: () => void;
  icon: string | undefined;
  position?:string;
};

export const IconButton = forwardRef<HTMLDivElement, IconButtonProps>(
  ({ onButtonClick, icon, position }, ref) => {
    return (
      <div className={`${styles["icon-button"]} ${position&&styles["position-"+position]}`} onClick={onButtonClick} ref={ref}>
        {icon !== undefined && (
          <div className={`${styles["icon"]} ${styles[icon]}`}></div>
        )}
      </div>
    );
  }
);

IconButton.displayName = "IconButton";
