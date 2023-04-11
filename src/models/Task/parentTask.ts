import { ReactNode } from "react";
import Task from ".";

import { IParentTask } from "../../interfaces/IParentTask";
import { ParentTaskBuilder } from "./parentTaskBuilder";

export default class ParentTask extends Task implements IParentTask {
  private _children: ReactNode[];
  private _childGroupid: number;


  constructor(parentTaskBuilder: typeof ParentTaskBuilder.prototype) {
    super(parentTaskBuilder);
    this._children = parentTaskBuilder.children;
    this._childGroupid = parentTaskBuilder.childGroupid;
  }

  public get children(): ReactNode[] {
    return this._children;
  }

  public get childGroupid(): number {
    return this._childGroupid;
  }

}
