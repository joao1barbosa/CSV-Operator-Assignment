import { OperatorWithClient } from "@/@types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { OctagonX } from 'lucide-react';
import OperatorOptions from "./operator-options";

interface BlockProps{
    operator: OperatorWithClient
}

export default function Block({operator}: BlockProps) {
    const sideBarSize = 3*(operator.clients.length || 1);

    return (
        <Card className="operator-card shadow-xl">
            <CardHeader className="flex flex-row justify-between items-center py-4">
                <div className="flex flex-row items-center">
                    <CardTitle>{operator.name}</CardTitle>
                    &nbsp;
                    <p>({operator.id})</p>
                </div>
                <OperatorOptions operator={operator}/>
            </CardHeader>
            <CardContent className="flex flex-row justify-between">
                <div className="flex flex-col mr-4">
                    {Array.from({ length: sideBarSize}, (_, index) => (
                        <p key={index}>|</p>
                    ))}
                </div>
                <div className="space-y-2 text-zinc-200">
                    {(operator.clients.length === 0) ?
                        <div className="flex justify-center items-center space-x-2">
                            <OctagonX/>
                            <p className="font-semibold">Nenhum Cliente Atribuído</p>
                            
                        </div>
                    :
                        <>
                        {operator.clients.map((client) => {
                            return(
                                <div key={client.id} className="flex flex-col items-center space-y-2">
                                    <Separator className="w-[95%] opacity-30"/>
                                    <div className="flex justify-between w-full">
                                        <p className="font-semibold">{client.name}</p>
                                        |
                                        <p>{client.birth_date}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="whitespace-nowrap">R$ {client.value/100}</p>
                                        &nbsp;|&nbsp;
                                        <p>{client.email}</p>
                                    </div>
                                </div>
                            )
                        })}
                        </>
                    }
                </div>
            </CardContent>
        </Card>
    );
}