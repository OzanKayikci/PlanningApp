import { ParentTypes, priorities } from "../constants/types";
import { IBase } from "./IBase";

export interface ITask extends IBase {
  hasDate: boolean;
  startDate?: number;
  endDate?: number;
  listId: number;
  priority?: priorities;
  text:string;
  parentType:ParentTypes;
  isCompleted:boolean;
}
