import PrimaryButton from "@/components/primary-button";
import { RefreshCcw } from "lucide-react";

export default function NavButtons(){
    return(
        <div className="flex flex-row items-center">
            
            <PrimaryButton Icon={RefreshCcw} tip={"Redistribuir Clientes"}/>
        </div>
    );
}