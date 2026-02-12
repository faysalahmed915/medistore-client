import axiosInstance from "@/lib/axios";
import { GetAllMedicinesOptions } from "@/types/validations/medicine";


export const MedicineService = {
  getAll: async (params: Partial<GetAllMedicinesOptions>) => {
    const { data } = await axiosInstance.get("/api/medicines", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axiosInstance.get(`/api/medicines/${id}`);
    return data;
  },
};