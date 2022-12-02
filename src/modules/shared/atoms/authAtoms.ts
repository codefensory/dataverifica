import { UserResponse } from "@app/modules/auth/domain";
import { atom } from "jotai";

export const userInfoAtom = atom<UserResponse | undefined>(undefined);
