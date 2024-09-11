import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface PrimatyButtonProps {
    Icon: LucideIcon;
    tip: string;
}

export default function PrimaryButton({ Icon, tip }: PrimatyButtonProps){
    return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="size-12 p-3 primary-btn">
                <Icon className="size-full"/>
            </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8} className="bg-zinc-800 p-1 rounded z-40">
              <p className="text-zinc-100">{tip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
}