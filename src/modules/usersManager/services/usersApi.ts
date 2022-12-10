import { axios } from "@app/modules/shared";
import { UserResponse } from "../domain";

export const getUsers = (page: number) =>
  axios.get<UserResponse>("/api/users?page=" + page).then((res) => res.data);

export const getAdmins = (page: number) =>
  axios.get<UserResponse>("/api/admins?page=" + page).then((res) => res.data);

export const createUser = (data: any) => axios.put("/api/users", data);

export const updateUser = (data: any) => axios.post("/api/users", data);

// TODO: user token expired if delete
export const deleteUser = (id: number) => axios.delete("/api/users?id=" + id);
