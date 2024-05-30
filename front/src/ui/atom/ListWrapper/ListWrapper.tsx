import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from './ListWrapper.module.scss';
import classNames from "classnames";


type ListWrapperProps = {
  name?: string;
  gap?: string;
} & ComponentPropsWithoutRef<"div">;

export default function ListWrapper({
  name = "row",
  gap = "10px",
  ...restProps
}: ListWrapperProps) {
  const composeClassess = classNames(
    styles['list-wrapper'],
    name ? styles[name] : null
    
  );
  return (
    <div className={composeClassess} {...restProps}/>
  );
}
