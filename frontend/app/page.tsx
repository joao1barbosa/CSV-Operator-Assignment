'use client'
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Separator } from "@/components/ui/separator";
import { useReadOperators } from "@/hooks/useOperatorQuery";
import Block from "@/components/block";

export default function Home() {
  const { data: operatorsResponse } = useReadOperators();

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <header className="flex w-full pt-6 pb-4 px-2 justify-center items-center">
        <nav className="flex flex-row whitespace-nowrap justify-between w-full sm:w-3/4">
          <a href="https://sinkalogistica.com.br/home">
            <figure className="nav-logo">
              <Image alt="logo" src={logo}/>
            </figure>
          </a>
          <div className="flex items-center">
            buttons case
          </div>
        </nav>
      </header>
      <div className="flex w-full sm:w-3/4 justify-center opacity-30">
        <Separator className="w-[97%]"/>
      </div>
      <main className="flex w-full justify-center items-start p-4 gap-4 flex-wrap">
        {operatorsResponse?.map((operator) => {
          return(
            <Block key={operator.id} operator={operator}/>
          )
        })}
      </main>
    </div>
  );
}
