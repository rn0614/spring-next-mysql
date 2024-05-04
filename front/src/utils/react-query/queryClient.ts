import { MutationCache, QueryCache, QueryClient } from "react-query";

export function queryErrorHandler(error: any) {
  const code = error?.code || "UN";
  switch (code) {
    case "DBE":
      alert("데이터 베이스 오류");
      break;
    case "NB":
      alert("게시글이 존재하지 않습니다.");
      break;
    case "NU":
      alert("유저정보가 올바르지 않습니다.");
      break;
    case "SF" || "VF":
      alert("인증 오류");
      break;
    case "SF" || "VF":
      alert("데이터 베이스 오류");
      break;
    case "SF" || "VF":
      alert("데이터 베이스 오류");
      break;
    default:
      alert("알수없는 오류");
  }
}

export const generateQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 데이터변경이 잦지 않은 경우 보수적으로 잡은상태
        //staleTime: 600000,
        retry: 0,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: queryErrorHandler,
    }),
    mutationCache: new MutationCache({
      onError: queryErrorHandler,
    }),
  });
};

export const queryClient = generateQueryClient();
