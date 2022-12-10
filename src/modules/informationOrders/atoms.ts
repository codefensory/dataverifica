import { isServer } from "@tanstack/react-query";
import { atom } from "jotai";
import { atomsWithInfiniteQuery } from "jotai-tanstack-query";
import { getInformationOrders } from "./services";
import { informationsOrderKeys } from "./utils";

export const informationOrderPageAtom = atom(0);

export const [, informationOrderDataAtom] = atomsWithInfiniteQuery((get) => ({
  queryKey: [...informationsOrderKeys.MAIN, get(informationOrderPageAtom)],
  queryFn: ({ queryKey: [, page] }) =>
    isServer ? undefined : getInformationOrders(page as number),
}));
