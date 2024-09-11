import { Client } from "./Client";

export interface Operator {
    id: number,
    name: string,
}

export interface OperatorWithClient extends Operator{
    clients: Client[]
}