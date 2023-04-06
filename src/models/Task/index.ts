import { priorities } from "../../constants/types";
import { ITask } from "../../interfaces/ITask";
import { Base } from "../baseAbstracts/Base";
import { BaseBuilder } from "../baseAbstracts/BaseBuilder";
import { TaskBuilder } from "./taskBuilder";

export default class Task extends Base implements ITask {
  private _hasDate: boolean;
  private _startDate?: number;
  private _endDate?: number;
  private _listId: number;
  private _priority?: priorities;
  private _text: string;

  constructor(builder: typeof TaskBuilder.prototype) {
    super(builder);
    this._hasDate = builder.hasDate;
    this._startDate = builder.startDate;
    this._endDate = builder.endDate;
    this._listId = builder.listId;
    this._priority = builder.priority;
    this._text = builder.text;
  }
  public get hasDate(): boolean {
    return this._hasDate;
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
}
