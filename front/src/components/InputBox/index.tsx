import React, { forwardRef } from "react";
import styles from "./style.module.scss";
import { FieldError, UseFormRegister } from "react-hook-form";
import { IconButton } from "@/ui/atom/Icon/Icon";

type Props = {
  id: string;
  label: string;
  placeholder: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>; // register 함수 타입
  required?: boolean | string;
  pattern?: { value: RegExp; message: string };
  minLength?: { value: number; message: string }; // react-hook-form에서만 처리
  icon?: string;
  onButtonClick?: () => void;
} & Omit<
  React.ComponentPropsWithoutRef<"input">,
  "minLength" | "pattern" | "required"
>; // minLength 속성 제외

const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const {
    id,
    label,
    type,
    error,
    placeholder,
    register,
    required,
    pattern,
    minLength,
    icon,
    onButtonClick,
    ...rest
  } = props;

  const validationRules = {
    required: required ? `${id} 입력은 필수입니다` : undefined,
    pattern: pattern ? pattern : undefined,
    minLength: minLength ? minLength : undefined,
  };
  const testHandler =()=>{
    console.log(validationRules)

  }
  return (
    <div className={styles["inputbox"]}>
      <label htmlFor={id} className={styles["inputbox-label"]}>
        {label}
      </label>
      <div
        className={`${styles["inputbox-container"]} ${
          error ? styles["inputbox-error"] : ""
        }`}
      >
        <input
          className={styles["input"]}
          type={type}
          placeholder={placeholder}
          {...register(id, validationRules)} // react-hook-form 유효성 검사 처리
        />
        {icon && <IconButton onButtonClick={onButtonClick} icon={icon} />}
      </div>
      {error && (
        <div className={styles["inputbox-message"]}>{error.message}</div>
      )}
      <button onClick={testHandler}>click</button>
    </div>
  );
});

InputBox.displayName = "InputBox";

export default InputBox;
