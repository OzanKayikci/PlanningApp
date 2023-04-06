import Task from ".";
import { priorities, shapes, types } from "../../constants/types";
import { ITask } from "../../interfaces/ITask";
import { BaseBuilder } from "../baseAbstracts/BaseBuilder";

export class TaskBuilder extends BaseBuilder implements ITask {
  hasDate: boolean;
  startDate?: number;
  endDate?: number;

  listId: number;
  priority?:  priorities;
  text: string;
  constructor(id: number, type: types, title: string, text:string, color: string, colorShape: shapes, listId: number) {
    super();
    this.id = id;
    this.type = type;
    this.title = title;
    this.color = color;
    this.colorShape = colorShape;
    this.listId = listId;
    this.text = text;
  }

  public setStartDate(date: number): TaskBuilder {
    this.hasDate = date > 0 ? true : false;
    this.startDate = date;
    return this;
  }
  public setEndDate(date: number): TaskBuilder {
    this.hasDate = date > 0 ? true : false;
    this.endDate = date;
    return this;
  }
  public setPriority(priority:  priorities): TaskBuilder {
    this.priority = priority;
    return this;
  }

  public setIsChild(isChild: boolean): TaskBuilder {
    this.isChild = isChild;
    return this;
  }
  public SetParentId(parentId: number): TaskBuilder {
    this.parentId = parentId;
    return this;
  }
  public setGroupId(groupId: number): TaskBuilder {
    this.groupId = groupId;
    return this;
  }
  public taskBuild() :ITask{
    return new Task(this)
  }
}
