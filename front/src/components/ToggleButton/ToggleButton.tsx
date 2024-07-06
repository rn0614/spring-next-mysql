import React, { ReactElement, ReactNode, useContext } from "react";

type ToggleType = {
  on: boolean;
  onToggle: any;
  children: ReactNode;
};

// 전체적인 Context
const WarapperContext = React.createContext<ToggleType | null>(null);

// Props 영역공유 지점
function Toggle(props: ToggleType) {
  return (
    //Toggle의 자식요소는 ToggleContext.Provider가 제공하는 value에 접근이 가능하다.
    <WarapperContext.Provider value={props}>
      {props.children}
    </WarapperContext.Provider>
  );
}

// useContext를 이용하면 상위 Context에 있는
function useToggleContext() {
  const context = useContext(WarapperContext);
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`
    );
  }
  return context;
}

const On: React.FC<any> = ({ children }) => {
  const { on } = useToggleContext();
  return on ? children : null;
};
Toggle.On = On;

const Off: React.FC<any> = ({ children }) => {
  const { on } = useToggleContext();
  return on ? null : children;
};
Toggle.Off = Off;

const Button: React.FC<any> = (props: any) => {
  const { on, onToggle } = useToggleContext();
  return <input type="checkbox" on={on} onClick={onToggle} {...props} />;
};
Toggle.Button = Button;

export { Toggle };
