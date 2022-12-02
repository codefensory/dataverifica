import { useEffect } from "react";
import useSWR from "swr";
import { useSetAtom } from "jotai";
import { userInfoAtom } from "@app/modules/shared/atoms";

export const useUser = (redirectTo: string = "") => {
  const { data: user, mutate: mutateUser } = useSWR("/api/user");

  const setUserInfo = useSetAtom(userInfoAtom);

  useEffect(() => {
    if (!user) {
      return;
    }

    setUserInfo(user.data);

    if (user.data.isLoggedIn) {
      window.location.pathname = redirectTo;
    }
  }, [user, redirectTo]);

  return {
    user,
    mutateUser,
  };
};
