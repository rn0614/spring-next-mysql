import React, { ReactNode } from "react";

type WrapperType = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperType) {
  return <div>{children}</div>;
}
