import { Operator, OperatorWithClient } from "@/@types";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Ellipsis } from 'lucide-react';
import { DeleteDialog } from "./delete-dialog";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useUpdateOperator } from "@/hooks/useOperatorQuery";

interface OperatorOptionsProps{
    operator: OperatorWithClient
}

const updateOperatorSchema = z.object({
    id: z.number(),
    name: z
      .string()
      .min(1, { message: "O nome é obrigatório" })
});

type UpdateOperatorSchema = z.infer<typeof updateOperatorSchema>

export default function OperatorOptions({ operator }: OperatorOptionsProps) {
    const methods = useForm<UpdateOperatorSchema>({
        resolver: zodResolver(updateOperatorSchema),
        defaultValues: {id: operator.id}
    });
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { mutate } = useUpdateOperator();

    const handleUpdateOperator = async (data: UpdateOperatorSchema) => {
        mutate(data);
    }

    return(
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button className="primary-btn size-6 p-1">
                    <Ellipsis className="size-full"/>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="flex items-center justify-between">
                    <DrawerTitle>Editar {operator.name}</DrawerTitle>
                    <DeleteDialog to="operator" id={operator.id}/>
                </DrawerHeader>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(handleUpdateOperator)} className="m-4 flex flex-col">
                        <label>Nome:</label>
                        <Input
                            id='name'
                            type='text'
                            {...register('name')}
                            placeholder="Novo Nome"
                            className="text-black bg-zinc-300 mt-2"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm pt-2 pl-1">{errors.name.message}</p>
                        )}

                        <DrawerFooter className="flex flex-row w-full justify-end p-0 mt-4">
                            <DrawerClose asChild>
                                <Button type='button' variant='outline'>Cancelar</Button>
                            </DrawerClose>
                            <Button type="submit" className="bg-green-500 hover:bg-green-700">Editar</Button>
                        </DrawerFooter>
                    </form>
                </FormProvider>
            </DrawerContent>
        </Drawer>
    );
}