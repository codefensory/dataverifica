import { axios } from "@app/modules/shared";
import { InformationOrderResponse } from "../domain";

export const getInformationOrders = (page: number) =>
  axios
    .get<InformationOrderResponse>("/api/information-orders?page=" + page)
    .then((data) => data.data);

export const createInformationOrders = (requestData: any) =>
  axios.post("/api/information-orders", requestData).then((data) => data.data);

export const completeInformationOrder = (requestData: any) =>
  axios
    .post("/api/information-orders/process", requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => data.data);

export const saveInformationOrder = (requestData: any) =>
  axios
    .post("/api/information-orders/save", requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => data.data);
