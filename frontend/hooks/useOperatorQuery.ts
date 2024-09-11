import { OperatorWithClient } from "@/@types";
import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/operators`;

export const useReadOperators = () => {
    return useQuery<OperatorWithClient[]>({
      queryKey: ['get-operators'],
      queryFn: async () => {
        const response = await axios.get(baseURL);
        return response.data;
      },
      placeholderData: keepPreviousData
    });
};