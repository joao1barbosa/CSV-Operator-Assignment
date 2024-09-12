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

interface DeleteDialogProps{
  to: 'client' | 'operator';
  id: number;
}

export function DeleteDialog({ to, id }: DeleteDialogProps) {
  const { mutate: deleteOperator } = useDeleteOperator();

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className="size-8 p-1 bg-red-700 hover:bg-red-950 text-white">
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
              onClick={()=> deleteOperator(id)}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
  