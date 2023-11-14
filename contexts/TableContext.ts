"use client"

import { createContext } from "react";
import SimpleRepo from "../interfaces/SimpleRepo";

export const TableContext = createContext( {
    table: {} as { unstarredRepos: Array<SimpleRepo> } ,
    setTable: (data: any) => {}
})