import React from "react";
import { css } from "@emotion/react";

const pageStyles = {
  wrapper: css`
    position: relative;
    background-color: red;
  `,
};

export default function index() {
  return <div css={pageStyles.wrapper}>index</div>;
}
