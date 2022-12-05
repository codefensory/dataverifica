import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../atoms";

export const useRedirectByUser = (redirectTo: string = "") => {
  const { data: user, refetch, isLoading } = useAtomValue(userInfoAtom);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.isLoggedIn) {
      window.location.pathname = redirectTo;
    }
  }, [user, redirectTo]);

  return {
    user: user,
    isLoading,
    userRefetch: refetch,
  };
};
