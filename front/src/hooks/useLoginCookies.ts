import { useCookies } from "react-cookie";

export const useLoginCookies = () => {
  const [cookies, setCookies] = useCookies();
  const now = new Date().getTime();
  const expires = new Date(now + 10 * 3600000);
  const setLoginCookie = (response: any) => {
    if (
      (response?.token !== null &&
      response?.token !== undefined) ||
      cookies.accessToken
    ) {
      setCookies(
        "accessToken",
        response?.token ? response.token : cookies.accessToken,
        {
          expires: expires,
          path: "/",
        }
      );
    }
  };
  return { setLoginCookie };
};
