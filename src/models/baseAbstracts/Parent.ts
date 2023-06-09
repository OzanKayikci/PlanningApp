import { ReactNode } from "react";
import { IParent } from "../../interfaces/IParent";
import { Base } from "./Base";
import { ParentBuilder } from "./ParentBuilder";

export abstract class Parent extends Base implements IParent {
   #_children: ReactNode[];
   #_childGroupid: number;

  constructor(builder: typeof ParentBuilder.prototype){
    super(builder);
    this.#_children = builder.children;
    this.#_childGroupid =builder.childGroupid;
  }
  
  public get children(): ReactNode[] { 
    return this.#_children;
  }

  public get childGroupid(): number {
    return this.#_childGroupid;
  }

}
