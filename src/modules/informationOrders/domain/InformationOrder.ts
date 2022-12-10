import { InformationOrder, PDF, User } from "@prisma/client";

export type InformationOrderData = {
  User: {
    email: string;
    companyName: string;
    ruc: string;
    phone: string;
  };
  PDF: PDF;
} & InformationOrder;

export type InformationOrderResponse = {
  orders: InformationOrderData[];
  pages: number;
};
