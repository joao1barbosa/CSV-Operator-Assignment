import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";
import { Client, ErrorResponse } from "@/@types";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/clients`;

export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
  
    const deleteReq = async (id: number): Promise<Client> => {
      const response = await axios.delete<Client>(`${baseURL}/${id}`);
      return response.data;
    };
  
    return useMutation<Client, Error, number>({
      mutationFn: deleteReq,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get-operators'],
          exact: true,
        });
        toast({
          title: "Cliente deletado",
          duration: 1500,
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Erro ao deletar Cliente",
          duration: 1500,
        })
      }
    });
  }

export const useUploadClients = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const uploadReq = async (file: File): Promise<void> => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            await axios.post<void>(
                `${baseURL}/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data as ErrorResponse;
            }
        }
    };

    return useMutation<void, ErrorResponse, File>({
        mutationFn: uploadReq,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-operators"],
                exact: true,
            });
            toast({ title: "Arquivo enviado com sucesso", duration: 1500 });
        },
        onError: (error: ErrorResponse) => {
            toast({ 
                variant: "destructive",
                title: "Falha ao enviar arquivo", 
                description: error.message,
                duration: 1500,
            });
        },
    });
};

export const useDownloadClients = () => {
    const { toast } = useToast();

    const downloadReq = async (): Promise<void> => {
        const response = await axios.get(`${baseURL}/download`, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'text/csv' });
        const fileUrl = window.URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = fileUrl;
        anchor.download = 'clients.csv';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(fileUrl);
    };

    return useMutation({
        mutationFn: downloadReq,
        onSuccess: () => {
            toast({
                title: "Arquivo CSV baixado",
                duration: 1500,
            });
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Erro ao baixar arquivo CSV",
                duration: 1500,
            });
        }
    });
}

export const useRedistributeClients = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const redistributeReq = async (): Promise<void> => {
        return await axios.get(`${baseURL}/redistribute`);
    }

    return useMutation({
        mutationFn: redistributeReq,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['get-operators'],
            exact: true,
          });
          toast({
            title: "Clientes Redistribuídos",
            duration: 1500,
          });
        },
      });
}