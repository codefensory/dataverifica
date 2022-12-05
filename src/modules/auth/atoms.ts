import axios from "axios";
import { atomsWithQuery } from "jotai-tanstack-query";
import { UserResponseAuth } from "./domain";

const isServer = typeof window === "undefined";

export const [, userInfoAtom] = atomsWithQuery((get) => ({
  queryKey: ["user"],
  queryFn: () =>
    isServer
      ? null
      : axios.get<UserResponseAuth>("/api/user").then((data) => data.data),
}));
