import { PropsWithChildren, createContext, useState, Dispatch } from 'react';
import { QueryObserverResult } from '@tanstack/react-query';

interface RefetchContextType {
  refetch: (() => Promise<QueryObserverResult>) | null;
  setRefetch: Dispatch<React.SetStateAction<(() => Promise<QueryObserverResult>) | null>>;
}

export const RefetchContext = createContext<RefetchContextType | undefined>(undefined);

export function RefetchProvider ( { children }: PropsWithChildren ) {
  const [refetch, setRefetch] = useState<(() => Promise<QueryObserverResult>) | null>(null);

  return (
    <RefetchContext.Provider value={{ refetch, setRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};