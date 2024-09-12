import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel 
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from 'lucide-react';
import logo from "@/public/logo.svg";
import Image from "next/image";

export default function OptionMenu(){
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <label className="cursor-pointer">
            <figure className="flex flex-row justify-center items-center nav-logo space-x-1">
              <Image alt="logo" src={logo}/>
              <ChevronDown/>
            </figure>
        </label>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} className="bg-zinc-800 p-1 rounded z-40">
        <DropdownMenuLabel>CRUD</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}