import { ParentTypes, priorities } from "../../constants/types";
import { ITask } from "../../interfaces/ITask";
import { Base } from "../baseAbstracts/Base";
import { BaseBuilder } from "../baseAbstracts/BaseBuilder";
import { TaskBuilder } from "./taskBuilder";

export default class Task extends Base implements ITask {
  private _hasStartDate: boolean = false;
  private _hasEndDate: boolean = false;
  private _startDate?: number;
  private _endDate?: number;
  private _listId: number;
  private _priority?: priorities;
  private _text: string;
  private _parentType: ParentTypes;
  private _isCompleted: boolean;
  constructor(builder: typeof TaskBuilder.prototype) {
    super(builder);
    this._hasStartDate = builder.hasStartDate;
    this._hasEndDate = builder.hasEndDate;
    this._startDate = builder.startDate;
    this._endDate = builder.endDate;
    this._listId = builder.listId;
    this._priority = builder.priority;
    this._text = builder.text;
    this._parentType = builder.parentType;
    this._isCompleted = builder.isCompleted;
  }

  public get isCompleted(): boolean {
    return this._isCompleted;
  }

  public get parentType(): ParentTypes {
    return this._parentType;
  }

  public get hasStartDate(): boolean {
    return this._hasStartDate;
  }
  public get hasEndDate(): boolean {
    return this._hasEndDate;
  }

  public get startDate(): number {
    return this._startDate;
  }

  public get endDate(): number {
    return this._endDate;
  }

  public get listId(): number {
    return this._listId;
  }

  public get priority(): priorities {
    return this._priority;
  }
  get text(): string {
    return this._text;
  }

  public get getAllItems(): ITask {
    const newTask = {
      id: this.id,
      type: this.type,
      title: this.title,
      IsParent: this.IsParent,
      isChild: this.isChild,
      parentId: this.parentId,
      groupId: this.groupId,
      color: this.color,
      colorShape: this.colorShape,
      text: this.text,
      startDate: this.startDate,
      endDate: this.endDate,
      priority: this.priority,
      listId: this.listId,
      parentType: this.parentType,
      isCompleted: this.isCompleted,
      hasStartDate: this.hasStartDate,
      hasEndDate: this.hasEndDate,
    };
    return newTask;
  }
}
