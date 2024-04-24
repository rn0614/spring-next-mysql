import { IconButton } from "@/ui/atom/Icon/Icon";
import styles from "./SearchButton.module.scss";
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_PATH } from "@/constants";

export default function SearchButton() {
  const searchBtnRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const router = useRouter();

  const onSearchWordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value;
    setSearchWord(value);
  };

  const toggleButtonHandler = () => {
    setStatus((pre) => !pre);
  };

  const onSearchButtonClickHandler = () => {
    router.push(SEARCH_PATH(searchWord));
  };

  const onSearchWordKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" ) return;
    searchBtnRef.current!.click();
  };

  if (!status) {
    return (
      <IconButton
        onButtonClick={toggleButtonHandler}
        icon={"search-light-icon"}
      />
    );
  }

  return (
    <div className={styles["search-input-box"]}>
      <input
        className={styles["search-input"]}
        type="tet"
        placeholder="검색"
        onChange={onSearchWordChangeHandler}
        onKeyDown={onSearchWordKeyDownHandler}
      />
      <IconButton
        onButtonClick={onSearchButtonClickHandler}
        icon={"search-light-icon"}
        ref={searchBtnRef}
      />
    </div>
  );
}
