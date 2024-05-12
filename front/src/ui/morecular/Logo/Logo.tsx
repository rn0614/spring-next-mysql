import Icon from "@/ui/atom/Icon/Icon";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Logo.module.scss";
import Text from "@/ui/atom/Text/Text";

type Logo = {
  children?: ReactNode;
  icon: string;
  size?: "lg"|"md"|"sm";
}& ComponentPropsWithoutRef<"div">;

export default function Logo({ children, icon, size = "sm", ...restProps }: Logo) {
  return (
    <div className={styles["logo-box"]} {...restProps}>
      <Icon icon={icon} heading={size==="lg"} />
      <Text size={size}>{children}</Text>
    </div>
  );
}
