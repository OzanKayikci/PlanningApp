import { ReactNode } from "react";
import Task from ".";
import { priorities, shapes, types } from "../../constants/types";
import { IParentTask } from "../../interfaces/IParentTask";
import { ITask } from "../../interfaces/ITask";
import { BaseBuilder } from "../baseAbstracts/BaseBuilder";
import { TaskBuilder } from "./taskBuilder";
import ParentTask from "./parentTask";

export class ParentTaskBuilder extends TaskBuilder implements IParentTask {
  children: ReactNode[];
  childGroupid: number;

  constructor(task: ITask) {
    super(task.id, task.type, task.title, task.text, task.color, task.colorShape, task.listId);
    this.SetParentId(task.parentId);
    this.setStartDate(task.startDate);
    this.setEndDate(task.endDate);
    this.setPriority(task.priority);
    this.setIsChild(task.isChild);
    this.SetParentId(task.parentId);
    this.setGroupId(task.groupId);
    this.setParentType(task.parentType);
    this.serIsCompleted(task.isCompleted);
  }
  public setIsParent(IsParent: boolean): ParentTaskBuilder {
    this.IsParent = IsParent;
    return this;
  }
  public setChildren(children: ReactNode[]): ParentTaskBuilder {
    this.children = children;
    return this;
  }
  public setChildGroupId(childGroupid: number): ParentTaskBuilder {
    this.childGroupid = childGroupid;
    return this;
  }

  public parentTaskBuild(): IParentTask {
    return new ParentTask(this);
  }
}
