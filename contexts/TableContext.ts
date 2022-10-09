import { createContext } from "react";

export const TableContext = createContext( {
    table: {} as any,
    setTable: (data: any) => {}
})