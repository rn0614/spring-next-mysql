import React, { ReactNode, useContext } from "react";
import style from "./ProfileIamge.module.scss";
import { Box } from "@mui/material";
import Image from "next/image";

const profileStyles = {
  sm: {
    width: 16,
    height: 16,
  },
  md: {
    width: 32,
    height: 32,
  },
  lg: {
    width: 48,
    height: 48,
  },
};

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
  const { writerProfileImage, size = "md" } = useProfileContext();
  return (
    <Box
      height={profileStyles[size].height}
      width={profileStyles[size].width}
      borderRadius={"100%"}
      overflow={"hidden"}
    >
      <Image
        height={profileStyles[size].height}
        width={profileStyles[size].width}
        src={
          writerProfileImage
            ? writerProfileImage
            : "/image/default-profile-image.png"
        }
        alt="프로필 이미지"
      />
    </Box>
  );
};
Profile.Image = ProfileImage;

const ProfileNickName: React.FC = () => {
  const { writerNickname } = useProfileContext();
  return (
    writerNickname && (
      <Box className={style["board-list-item-nickname"]}>{writerNickname}</Box>
    )
  );
};
Profile.NickName = ProfileNickName;

const ProfileWriteDate: React.FC = () => {
  const { writerDatetime } = useProfileContext();
  return (
    writerDatetime && (
      <Box className={style["board-list-item-write-datetime"]}>
        {writerDatetime}
      </Box>
    )
  );
};
Profile.WriteDate = ProfileWriteDate;

export { Profile, ProfileImage };
