import authFetch from "@/utils/axios/axiosInstance";
import { queryClient } from "@/utils/react-query/queryClient";
import axios from "axios";
import { useMutation } from "react-query";
const PATCH_NICNAME_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/user/nickname`;
const PATCH_PROFILEIMAGE_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/user/profile-image`;
const GET_USER_INFO = (email:string) => `${process.env.NEXT_PUBLIC_API_BACK}/user/${email}`;

export const getUserInfo = async (email:string) => {
  const result = await axios
    .get(GET_USER_INFO(email))
    .then((response) => response.data)
    .catch((error) => error);
    console.log('result',result);
  return result;
};


export const patchNicknameRequest = async (requestBody) => {
  const result = await authFetch()
    .patch(PATCH_NICNAME_URL(), requestBody)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const patchProfileImageRequest = async (requestBody) => {
  const result = await authFetch()
    .patch(PATCH_PROFILEIMAGE_URL(), requestBody)
    .then((response) => response)
    .catch((error) => error);
  return result;
};


export function useNicknameChange(){
  const { mutate } = useMutation(patchNicknameRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  return mutate;
}

export function useProfileChange(){
  const { mutate } = useMutation(patchProfileImageRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  return mutate;
}