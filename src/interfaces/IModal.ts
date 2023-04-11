import { ReactNode } from "react";
import { ModalTypes } from "../constants/types";

export interface IModalView {
    // header:ReactNode;
    // body: ReactNode;
    type: ModalTypes;
    children:ReactNode;
    isVisible:boolean,
    action:React.Dispatch<React.SetStateAction<boolean>>,
}