import PrimaryButton from "@/components/primary-button";
import { useDownloadClients, useRedistributeClients } from "@/hooks/useClientQuery";
import { RefreshCcw, Download } from "lucide-react";
import UploadButton from "./upload-button";
import { useRefetch } from "@/hooks/useRefetch";

export default function NavButtons(){
    const { mutate: download } = useDownloadClients();
    const { mutate: redistribute } = useRedistributeClients();

    return(
        <div className="flex flex-row items-center space-x-2 sm:space-x-4">
            <UploadButton/>
            <PrimaryButton
                Icon={Download} tip={"Baixar Lista de Clientes"}
                onClick={()=> download()}
            />
            <PrimaryButton 
                Icon={RefreshCcw} tip={"Redistribuir Clientes"}
                onClick={()=> redistribute()}
            />
        </div>
    );
}