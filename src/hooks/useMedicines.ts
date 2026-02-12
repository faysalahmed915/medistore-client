import { useQuery } from "@tanstack/react-query";
import { MedicineService } from "@/services/medicine";
import { GetAllMedicinesOptions } from "@/types/validations/medicine";

export const useMedicines = (params: Partial<GetAllMedicinesOptions>) => {
  return useQuery({
    queryKey: ["medicines", params],
    queryFn: () => MedicineService.getAll(params),
  });
};