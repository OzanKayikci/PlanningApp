import { ReactNode } from "react";
import Task from ".";
import { Parent } from "../baseAbstracts/Parent";
import { TaskBuilder } from "./taskBuilder";
import { ParentBuilder } from "../baseAbstracts/ParentBuilder";
import { IParentTask } from "../../interfaces/IParentTask";
import { ParentTaskBuilder } from "./parentTaskBuilder";

export default class ParentTask extends Task implements IParentTask {
  private _children: ReactNode[];
  private _childGroupid: number;
  private _TaskBuilder: TaskBuilder;

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
