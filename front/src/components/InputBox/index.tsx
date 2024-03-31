import React, {
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
} from "react";
import styles from "./style.module.scss";
import { IconButton } from "@/ui/atom/Icon/Icon";

interface Props {
  name:string;
  label: string;
  type: "text" | "password";
  placeholder: string;
  error: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  icon?: string;
  onButtonClick?: () => void;

  message?: string;

  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const {
    name,
    label,
    type,
    error,
    placeholder,
    value,
    onChange,
    onButtonClick,
    icon,
    message,
    onKeyDown,
  } = props;

  //  event handler: Key down 이벤트러치 함수  //
  const onKeyDownHandler =(e:KeyboardEvent<HTMLInputElement>)=>{
    if(!onKeyDown) return;
    onKeyDown(e);
  }

  return (
    <div className={styles["inputbox"]}>
      <div className={styles["inputbox-label"]}>{label}</div>
      <div
        className={`${styles["inputbox-container"]} ${error ? error : null}`}
      >
        <input
          name={name}
          className={styles["input"]}
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e)=>onChange(e)}
          onKeyDown={onKeyDownHandler}
        />
        {onButtonClick !== undefined && (
          <IconButton onButtonClick={onButtonClick} icon={icon}/>
        )}
      </div>
      <div className={styles["inputbox-message"]}>{message}</div>
    </div>
  );
});

InputBox.displayName = "InputBox";

export default InputBox;
