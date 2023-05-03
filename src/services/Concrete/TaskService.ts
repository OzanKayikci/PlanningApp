import { ParentTypes, priorities, types } from "../../constants/types";
import { IBase } from "../../interfaces/IBase";
import { ITask } from "../../interfaces/ITask";
import Task from "../../models/Task";
import { TaskBuilder } from "../../models/Task/taskBuilder";

//import { addTask } from "../../redux/state/TaskSlice";
import { ITaskService } from "../Abstract/ITaskService";
import { deleteData, deleteStorage, getData, storeData, updateData } from "../StoringService";

export class TaskService implements ITaskService {
  private Tasks: ITask[] = [];

  //TODO: create promise olarak mesaj döndürecek. o yüzden response mesaj objesi oluştur
  public async create(
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
  ): Promise<ITask | null> {
    const Tasks = await this.getAll().then((data) => {
     
      return data !== null ? data : [];

    });

    
    const netId: number = Tasks.length >0 ? Tasks[Tasks.length - 1].id + 1 : 200;
    let newTask: Task = new TaskBuilder(netId, types.task, title, text, color, shape, listId)
      .SetParentId(0)
      .setGroupId(groupId)
      .setIsParent(false)
      .setIsChild(true)
      .setPriority(priority)
      .setEndDate(endDate)
      .setStartDate(startDate)
      .setParentType(parentType)
      .taskBuild();

    const storingStatus = await storeData(newTask.getAllItems, "Tasks").then((value) => {
      return value;
    });
    return storingStatus ? newTask.getAllItems : null;
  }

  public async getAll(): Promise<ITask[]> {
    const data = await getData("Tasks");
    this.Tasks = data;
    return this.Tasks as ITask[];
  }
  public async getById(id: number): Promise<ITask | undefined> {
    return this.getAll().then((data) => {
      return data.find((Task) => Task.id === id);
    });
  }

  public async update(Task: Task): Promise<string> {
    return await this.getById(Task.id).then(async (data) => {
      data = Task.getAllItems;
      console.log("update", data);

      return await updateData(data, "Tasks");
    });
  }
  public async delete(id: IBase["id"]): Promise<string> {
    return await this.getById(id).then(async (data) => {
      return await deleteData(data, "Tasks");
    });
  }

  //?if project is deleting, delete all tasks in project
  public async deleteByGroupId(groupId: number): Promise<string> {
    await this.getAll().then(async (data) => {
      data.map(async (Task) => {
        if (Task.groupId === groupId) {
          await this.delete(Task.id);
        }
      });
      return "success";
    });
    return "fail";
  }
  public async getByGroupId(groupId: number): Promise<ITask[]> {
    return await this.getAll().then((data) => {
      return data !== null ? data.filter((Task) => Task.groupId === groupId) : null;
    });
  }
  public async getByListId(listId: number): Promise<ITask[]> {
    return await this.getAll().then((data) => {
      return data !== null ? data.filter((Task) => Task.listId === listId) : null;
    });
  }
  public async deleteByListId(listId: number): Promise<string> {
    await this.getAll().then(async (data) => {
      data.map(async (Task) => {
        if (Task.listId === listId) {
          await this.delete(Task.id);
        }
      });
      return "success";
    });
    return "fail";
  }
  public async deleteAll(): Promise<string> {
    const result = await deleteStorage("Tasks");
    console.log("res", result);
    return result;
  }
}
