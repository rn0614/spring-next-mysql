import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./section.module.scss";
import Text from "@/ui/atom/Text/Text";

type SectionProps = {
  title: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export default function Section({
  title,
  children,
  ...resProps
}: SectionProps) {
  return (
    <section className={styles["section"]} {...resProps}>
      <h1>
        <Text size="lg">{title}</Text>
      </h1>
      <div className={styles["content"]}>{children}</div>
    </section>
  );
}
