import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  forwardRef,
} from "react";
import styles from "./style.module.scss";
import { IconButton } from "@/ui/atom/Icon/Icon";
import { FieldError, UseFormRegister } from "react-hook-form";

type Props ={
  id:string;
  label: string;
  placeholder: string;
  error: FieldError|undefined;
  register:UseFormRegister<any>;
  icon?: string;
  onButtonClick?: () => void;
  message?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}&ComponentPropsWithoutRef<"input">;

const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const {
    id,
    label,
    type,
    error,
    placeholder,
    register,
    onButtonClick,
    icon,
    message
  } = props;


  return (
    <div className={styles["inputbox"]}>
      <label htmlFor={id} className={styles["inputbox-label"]}>{label}</label>
      <div
        className={`${styles["inputbox-container"]} ${error ? error : null}`}
      >
        <input
          id={id}
          className={styles["input"]}
          type={type}
          placeholder={placeholder}
          {...register(id, {
            required: id+" 입력은 필수입니다",
            // pattern: {
            //   value: /\S+@\S+\.\S+/,
            //   message: "이메일 형식에 맞지 않습니다",
            // },
            // maxLength: 80,
          })}
        />
        {onButtonClick !== undefined && (
          <IconButton onButtonClick={onButtonClick} icon={icon}/>
        )}
      </div>
      <div className={styles["inputbox-message"]}>{error?.message}</div>
    </div>
  );
});

InputBox.displayName = "InputBox";

export default InputBox;
