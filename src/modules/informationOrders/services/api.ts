import { axios } from "@app/modules/shared";
import { InformationOrder } from "@prisma/client";

export const getInformationOrders = (cookie?: string) =>
  axios
    .get<InformationOrder[]>("/api/information-orders", { headers: { cookie } })
    .then((data) => data.data);

export const createInformationOrders = (data: any) =>
  axios.post("/api/information-orders", data).then((data) => data.data);
