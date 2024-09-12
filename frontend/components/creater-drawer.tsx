import { TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent } from "./ui/tooltip";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Input } from "./ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOperator } from "@/hooks/useOperatorQuery";

const createOperatorSchema = z.object({
    name: z
      .string()
      .min(1, { message: "O nome é obrigatório" })
});

type CreateOperatorSchema = z.infer<typeof createOperatorSchema>

export default function CreaterDrawer() {
    const methods = useForm<CreateOperatorSchema>({
        resolver: zodResolver(createOperatorSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { mutate } = useCreateOperator();

    const handleCreateOperator = async (data: CreateOperatorSchema) => {
        mutate(data);
    }

    return(
        <TooltipProvider>
            <Tooltip>              
                <Drawer direction="right">
                    <DrawerTrigger asChild>
                        <TooltipTrigger asChild> 
                            <label className="cursor-pointer">
                                <figure className="flex flex-row justify-center items-center nav-logo space-x-1">
                                    <Image alt="logo" src={logo}/>
                                    <Plus/>
                                </figure>
                            </label>
                            </TooltipTrigger>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="flex items-center justify-between">
                            <DrawerTitle>Adicionar Operador</DrawerTitle>
                        </DrawerHeader>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(handleCreateOperator)} className="m-4 flex flex-col">
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
                                    <Button type="submit" className="bg-green-500 hover:bg-green-700">Adicionar</Button>
                                </DrawerFooter>
                            </form>
                    </FormProvider>
                    </DrawerContent>
                </Drawer>
                <TooltipContent side="bottom" sideOffset={8} className="bg-zinc-800 p-2 rounded z-40 border-none">
                    <p className="text-zinc-100 font-semibold">Adicionar Operador</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}