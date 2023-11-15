'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'
import SimpleRepo from "../interfaces/SimpleRepo";

type TableContextProviderProps = {
  children: ReactNode
}

type TableContextType = {
  table: Array<SimpleRepo | string>,
  setTable: Dispatch<SetStateAction<any>>,
}

export const TableContext = createContext<TableContextType | null>(null)

export const TableContextProvider = ({ children }: TableContextProviderProps) => {
  const [table, setTable] = useState<any>()
  return (
    <TableContext.Provider value={{ table, setTable }}>{children}</TableContext.Provider>
  )
}