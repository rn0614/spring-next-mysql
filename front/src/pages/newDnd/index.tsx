import { HTML5toTouch } from "rdndmb-html5-to-touch";
import React from "react";
import { DndProvider } from "react-dnd-multi-backend";

// export const HTML5toTouch = {
//   backends: [
//     {
//       id: "html5",
//       backend: HTML5Backend,
//       transition: MouseTransition
//     },
//     {
//       id: "touch",
//       backend: TouchBackend,
//       options: { enableMouseEvents: true },
//       preview: true,
//       transition: TouchTransition
//     }
//   ]
// };


export default function page() {
  return (
    <DndProvider  options={HTML5toTouch}>
      <div>page</div>
    </DndProvider>
  );
}
