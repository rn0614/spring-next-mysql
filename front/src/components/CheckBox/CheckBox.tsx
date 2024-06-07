import Icon from "@/ui/atom/Icon/Icon";
import {
  ComponentPropsWithoutRef,
  forwardRef
} from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import styles from "./CheckBox.module.scss";

type Props = {
  id: string;
  label: string;
  error: FieldError | undefined;
  checked:boolean;
  register: UseFormRegister<any>;
} & ComponentPropsWithoutRef<"input">;

const CheckBox = forwardRef<HTMLInputElement, Props>((props: Props) => {
  const { id, label, error, placeholder, register, checked } = props;

  return (
    <div className={styles["checkbox"]}>
      <label htmlFor={id} className={styles["inputbox-label"]}>
        {label}
        <Icon
          icon={checked ? "check-round-fill-icon" : "check-ring-light-icon"}
        />
      </label>
      <div
        className={`${styles["inputbox-container"]} ${error ? error : null}`}
      >
        <input
          id={id}
          className={styles["input"]}
          type="checkbox"
          placeholder={placeholder}
          {...register(id, {
            required: "사용자 정보에 동의 부탁드립니다.",
          })}
          style={{display:"none"}}
        />
      </div>
      <div className={styles["inputbox-message"]}>{error?.message}</div>
    </div>
  );
});

CheckBox.displayName = "CheckBox";

export default CheckBox;
