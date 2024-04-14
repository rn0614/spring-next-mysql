import axios from "axios";

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // 이 쿠키가 요청한 이름과 일치하는지 확인
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const authFetch = (accessToken?: string, contentType?: string) => {
  const Instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACK,
    timeout: 60000,
    headers: {
      "Content-Type": contentType ? contentType : "application/json",
    },
  });

  Instance.interceptors.request.use(
    (request) => {
      const token = accessToken ? accessToken : getCookie("accessToken"); // 'accessToken' 쿠키에서 액세스 토큰을 가져옴
      if (token !== null || token !== "null")
        request.headers.Authorization = `Bearer ${token}`;
      return request;
    },
    (error) => {
      console.log("requestError", error);
    }
  );

  Instance.interceptors.response.use(
    (request) => {
      return request;
    },
    (error) => {
      return error;
    }
  );

  return Instance;
};

export default authFetch;
