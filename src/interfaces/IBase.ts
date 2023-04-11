import { shapes, types } from "../constants/types";

export interface IBase{
    id:number;
    type:types;
    title:string;
    IsParent?:boolean;
    isChild?:boolean;
    parentId?:number;
    groupId?:number;
    color:string;
    colorShape: string;
}