import { Operator, OperatorWithClient } from "@/@types";
import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/operators`;

export const useCreateOperator = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createReq = async (data: Omit<Operator, 'id'>): Promise<Operator> => {
    const response = await axios.post<Operator>(baseURL, data);
    return response.data;
  };

  return useMutation<Operator, Error, Omit<Operator, 'id'>>({
    mutationFn: createReq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-cards'],
        exact: true
      });
      toast({
        title: "Operador adicionado",
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar operador",
        duration: 1500,
      })
    },
  });
}

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

export const useUpdateOperator = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateReq = async (data: Partial<Operator> & { id: number }): Promise<Operator> => {
    const { id, ...rest } = data;
    console.log(rest);
    const response = await axios.patch(`${baseURL}/${id}`, rest);
    return response.data;
  };

  return useMutation<Operator, Error, Partial<Operator> & { id: number }>({
    mutationFn: updateReq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-operators'],
        exact: true,
      });
      toast({
        title: "Operador atualizado",
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar operador",
        duration: 1500,
      })
    }
  });
};

export const useDeleteOperator = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteReq = async (id: number): Promise<Operator> => {
    const response = await axios.delete<Operator>(`${baseURL}/${id}`);
    return response.data;
  };

  return useMutation<Operator, Error, number>({
    mutationFn: deleteReq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-operators'],
        exact: true,
      });
      toast({
        title: "Operador deletado",
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao deletar operador",
        duration: 1500,
      })
    }
  });
}