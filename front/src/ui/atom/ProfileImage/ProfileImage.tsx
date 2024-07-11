import React, { ReactNode, useContext } from "react";
import style from "./ProfileIamge.module.scss";

type ProfileType = {
  writerProfileImage: string | null;
  size?: "lg" | "md" | "sm";
  writerNickname?: string;
  writerDatetime?: string;
  color?: "white" | "black";
  children: ReactNode;
};

const WrapperContext = React.createContext<ProfileType | null>(null);

function useProfileContext() {
  const context = useContext(WrapperContext);
  if (!context) {
    throw new Error(`설정하지 않은 Context사용이 발견됐습니다.`);
  }
  return context;
}

function Profile(props: ProfileType) {
  return (
    <WrapperContext.Provider value={props}>
      {props.children}
    </WrapperContext.Provider>
  );
}

const ProfileImage: React.FC<any> = () => {
  const { writerProfileImage, size = "sm" } = useProfileContext();
  return (
    writerProfileImage ?? (
      <div
        className={`style["profile-image"] ${style["size-" + size]}`}
        style={{
          backgroundImage: `url(${
            writerProfileImage
              ? writerProfileImage
              : "/image/default-profile-image.png"
          })`,
          backgroundSize: "cover",
        }}
      ></div>
    )
  );
};
Profile.Image = ProfileImage;

const ProfileWriteBox: React.FC<any> = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
  );
};
Profile.WriteBox = ProfileWriteBox;

const ProfileNickName: React.FC = () => {
  const { writerNickname } = useProfileContext();
  return (
    writerNickname && (
      <div className={style["board-list-item-nickname"]}>
        {writerNickname}
      </div>
    )
  );
};
Profile.NickName = ProfileNickName;

const ProfileWriteDate: React.FC = () => {
  const { writerDatetime } = useProfileContext();
  return (
    writerDatetime && (
      <div
        className={style["board-list-item-write-datetime"]}
        suppressHydrationWarning
      >
        {writerDatetime}
      </div>
    )
  );
};
Profile.WriteDate = ProfileWriteDate;

export { Profile };
