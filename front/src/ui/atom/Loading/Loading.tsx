import { ReactElement } from "react";
import { useIsFetching, useIsMutating } from "react-query";
import styles from "./Loading.module.scss";

export default function Loading(): ReactElement {
  const isFetching = useIsFetching();
  const isMutatuing = useIsMutating();

  const display = isFetching || isMutatuing ? "block" : "none";
  return (
    <div className={styles.wrapper} style={{ display: display }}>
      <svg className={styles.circlewrapper} viewBox="25 25 50 50">
        <circle className={styles.circle} r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}
