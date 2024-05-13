import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from './ListWrapper.module.scss';

type ListWrapperProps = {
  flex?: string;
  gap?: string;
} & ComponentPropsWithoutRef<"div">;

export default function ListWrapper({
  flex = "flex",
  gap = "10px",
  ...restProps
}: ListWrapperProps) {
  return (
    <div className={styles["top3-contents"]} {...restProps}/>
  );
}
