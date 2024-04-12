import { MutationCache, QueryCache, QueryClient } from "react-query";
import { toast } from "react-toastify";

export function queryErrorHandler(error: unknown) {
  console.log("에러 발생 공통처리");
  const title =
    error instanceof Error ? error.message : "error connecting to server";
  toast.error(title);
}

export const generateQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 데이터변경이 잦지 않은 경우 보수적으로 잡은상태
        //staleTime: 600000,
        cacheTime: 900000,
        //refetchOnMount: false,
        //refetchOnReconnect: false,
        // refetchOnWindowFocus: false,
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
