import { useCookies } from "react-cookie";

export const useLoginCookies = () => {
  const [cookies, setCookies] = useCookies();
  const now = new Date().getTime();
  const expires = new Date(now + 9 * 36000 + 60 * 600000);
  const setLoginCookie = (response: any) => {
    setCookies(
      "accessToken",
      response.token ? response.token : cookies.accessToken,
      {
        expires: expires,
        path: "/",
      }
    );
  };
  return { setLoginCookie };
};
