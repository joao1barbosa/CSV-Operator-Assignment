import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Upload } from "lucide-react";
import { useUploadClients } from "@/hooks/useClientQuery";

export default function UploadButton(){
    const { mutate: upload } = useUploadClients();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          upload(file);
        }
    };

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="size-12 p-3 primary-btn cursor-pointer">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
                <Upload className="size-full"/>
            </label>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8} className="bg-zinc-800 p-1 rounded z-40">
              <p className="text-zinc-100">Enviar arquivo CSV</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
}