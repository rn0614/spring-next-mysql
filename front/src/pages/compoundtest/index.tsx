import { Toggle } from "@/components/ToggleButton/ToggleButton";
import React, { useCallback, useState } from "react";

export default function ComponentTestPage() {
  const [on, setOn] = useState(false);
  const toggle = useCallback(() => setOn((oldOn) => !oldOn), []);
  return (
    <Toggle onToggle={toggle} on={on}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  );
}
