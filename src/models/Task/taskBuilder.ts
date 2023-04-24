import Task from ".";
import { ParentTypes, priorities, shapes, types } from "../../constants/types";
import { ITask } from "../../interfaces/ITask";
import { BaseBuilder } from "../baseAbstracts/BaseBuilder";

export class TaskBuilder extends BaseBuilder implements ITask {
  hasDate: boolean = false;
  startDate?: number;
  endDate?: number;
  isCompleted: boolean;
  listId: number;
  priority?: priorities;
  text: string;
  parentType: ParentTypes;
  
  constructor(
    id: number,
    type: types,
    title: string,
    text: string,
    color: string,
    colorShape: string,
    listId: number
  ) {
    super();
    this.id = id;
    this.type = type;
    this.title = title;
    this.color = color;
    this.colorShape = colorShape;
    this.listId = listId;
    this.text = text;
    this.isCompleted = false;
    this.parentType = ParentTypes.list;
  }

  public serIsCompleted(isCompleted: boolean): TaskBuilder {
    this.isCompleted = isCompleted;
    return this;
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
  public setPriority(priority: priorities): TaskBuilder {
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
  public setIsParent(IsParent: boolean): TaskBuilder {
    this.IsParent = IsParent;
    return this;
  }
  public setGroupId(groupId: number): TaskBuilder {
    this.groupId = groupId;
    return this;
  }
  public setParentType(parentType: ParentTypes): TaskBuilder {
    this.parentType = parentType;
    return this;
  }
  public taskBuild(): Task {
    return new Task(this);
  }
}
