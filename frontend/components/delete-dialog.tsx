import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from 'lucide-react';
import { useDeleteOperator } from "@/hooks/useOperatorQuery";
import { useDeleteClient } from "@/hooks/useClientQuery";
import { useRefetch } from "@/hooks/useRefetch";

interface DeleteDialogProps{
  to: 'client' | 'operator';
  color?: 'red' | 'green'
  id: number;
}

export function DeleteDialog({ to, id, color = 'red' }: DeleteDialogProps) {
  const { mutate: deleteOperator } = useDeleteOperator();
  const { mutate: deleteClient } = useDeleteClient();

  const buttonColor = (color === 'red') ? 'bg-red-700 hover:bg-red-950' : 'bg-green-900 hover:bg-green-700';

  const handleConfirm = () =>{
    (to === 'operator') ? deleteOperator(id) : deleteClient(id);
  }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className={`size-6 p-1 text-white ${buttonColor}`}>
              <Trash2/>
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-72 bg-zinc-800 border-0">
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso apagará o registo permanetemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-700 hover:bg-red-950 text-white"
              onClick={handleConfirm}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
  