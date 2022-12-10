import { isServer } from "@tanstack/react-query";
import { atom } from "jotai";
import { atomsWithInfiniteQuery } from "jotai-tanstack-query";
import { getAdmins, getUsers } from "./services";
import { adminsKey, usersKey } from "./utils";

export const usersPageAtom = atom(0);

export const adminPageAtom = atom(0);

export const [, usersDataAtom] = atomsWithInfiniteQuery((get) => ({
  queryKey: [...usersKey, get(usersPageAtom)],
  queryFn: ({ queryKey: [, page] }) =>
    isServer ? undefined : getUsers(page as number),
}));

export const [, adminsDataAtom] = atomsWithInfiniteQuery((get) => ({
  queryKey: [...adminsKey, get(adminPageAtom)],
  queryFn: ({ queryKey: [, page] }) =>
    isServer ? undefined : getAdmins(page as number),
}));
