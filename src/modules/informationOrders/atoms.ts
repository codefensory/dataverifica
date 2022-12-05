import { atom } from "jotai";
import { InformationOrder } from "@prisma/client";

const initialPersonsData: InformationOrder[] = [
  {
    personType: "Natural",
    documentType: "DNI",
    documentNumber: "145281820",
    name: "Yeferson Mejias",
    requestInformation: "cv;seniat",
    isComplete: false,
    userId: 2,
  } as InformationOrder,
  {
    personType: "Natural",
    documentType: "DNI",
    documentNumber: "125515012",
    name: "Juan Perez Medina",
    requestInformation: "cv;seniat",
    isComplete: false,
    userId: 2,
  } as InformationOrder,
  {
    personType: "Natural",
    documentType: "DNI",
    documentNumber: "55124141",
    name: "Rafael Jose Petro",
    requestInformation: "cv;seniat",
    isComplete: false,
    userId: 2,
  } as InformationOrder,
  {
    personType: "Juridical",
    documentType: "RUC",
    documentNumber: "1414155515151",
    name: "Constructora Ramirez",
    requestInformation: "cv;seniat",
    isComplete: false,
    userId: 2,
  } as InformationOrder,
  {
    personType: "Natural",
    documentType: "DNI",
    documentNumber: "145281820",
    name: "Pedro Jual Ramirez",
    requestInformation: "cv;seniat",
    isComplete: true,
    userId: 2,
  } as InformationOrder,
];

export const informationOrderDefaultDataAtom =
  atom<InformationOrder[]>(initialPersonsData);
