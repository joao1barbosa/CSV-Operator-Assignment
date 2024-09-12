'use client'
import { Separator } from "@/components/ui/separator";
import { useReadOperators } from "@/hooks/useOperatorQuery";
import Block from "@/components/block";
import NavButtons from "@/components/nav-buttons";
import CreaterDrawer from "@/components/creater-drawer";

import { useRefetch } from "@/hooks/useRefetch";
import { useEffect } from "react";

export default function Home() {
  const { data: operatorsResponse, refetch } = useReadOperators();
  const { setRefetch } = useRefetch();

  useEffect(() => {
    setRefetch(() => refetch);
  }, [refetch, setRefetch]);

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <header className="flex w-full pt-6 pb-4 px-2 justify-center items-center">
        <nav className="flex flex-row whitespace-nowrap justify-between w-full sm:w-3/4">
          <CreaterDrawer/>
          <NavButtons/>
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
