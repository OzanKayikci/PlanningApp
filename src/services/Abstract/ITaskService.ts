import { ITask } from "../../interfaces/ITask";

export interface ITaskService {
  getAll(): Promise<ITask[]>;
  getById(id: number): Promise<ITask | undefined>;
  create(
    title: ITask["title"],
    color: ITask["color"],
    shape: ITask["colorShape"],
    groupId: ITask["groupId"],
    text: ITask["text"],
    listId: ITask["listId"],
    priority: ITask["priority"],
    startDate: ITask["startDate"],
    endDate: ITask["endDate"],
    parentType: ITask["parentType"]
  ): Promise<ITask | null>;
  update(Task: ITask): Promise<string>;
  getByGroupId(groupId: ITask["groupId"]): Promise<ITask[]>;
  getByListId(groupId: ITask["listId"]): Promise<ITask[]>;
  delete(id: ITask["id"]): Promise<string>;
  deleteByGroupId(groupId: ITask["groupId"]): Promise<string>;
  deleteByListId(groupId: ITask["listId"]): Promise<string>;
  deleteAll(): Promise<string>;
}
