import { userInfoAtom } from "@app/modules/auth/atoms";
import { SimpleUser, UserResponseAuth } from "@app/modules/auth/domain";
import { atom } from "jotai";

export const simpleUserAtom = atom<SimpleUser | undefined | null>((get) => {
  return get(userInfoAtom).data?.user;
});
