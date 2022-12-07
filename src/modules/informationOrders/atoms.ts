import { atomsWithQuery } from "jotai-tanstack-query";
import { getInformationOrders } from "./services";
import { informationsOrderKeys } from "./utils";

export const [, informationOrderDefaultDataAtom] = atomsWithQuery(() => ({
  queryKey: informationsOrderKeys.MAIN,
  queryFn: () => getInformationOrders(),
  refetchOnMount: false,
}));
