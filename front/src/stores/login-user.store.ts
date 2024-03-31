import { User } from "@/types/interface";
import { useMemo } from "react";
import { atom, useRecoilState } from "recoil";

export const CurrUserAtom = atom<User | null>({
  key: "CurrUser",
  default: null,
});

export default function useLoginUserStore() {
  const [user, setUser] = useRecoilState(CurrUserAtom);

  return useMemo(
    () => ({
      loginUser: user,
      setLoginUser: async (user: User) => setUser(user),
      resetLoginUser: async () => setUser(null),
    }),
    [setUser]
  );
}
