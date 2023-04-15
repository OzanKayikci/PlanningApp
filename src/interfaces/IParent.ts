import { ReactNode } from "react";
import { IBase } from "./IBase";

export interface IParent extends IBase{
    children?:ReactNode[];
    childGroupid?:number;
}
