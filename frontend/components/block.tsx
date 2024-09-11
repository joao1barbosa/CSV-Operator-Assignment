import { OperatorWithClient } from "@/@types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { OctagonX } from 'lucide-react';

interface BlockProps{
    operator: OperatorWithClient
}

export default function Block({operator}: BlockProps) {
    return (
        <Card className="operator-card shadow-xl">
            <CardHeader className="pb-3 pt-4">
                <CardTitle>{operator.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row justify-between">
                <div className="mr-4">|</div>
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