import { IProject } from "../../interfaces/IProject";

export interface IProjectService {
  getAll(): Promise<IProject[]>;
  getById(id: number): Promise<IProject | undefined>;
  create(title: IProject["title"], color: IProject["color"], shape: IProject["colorShape"],groupId: IProject["groupId"]): Promise<IProject | null>;
  update(list:IProject): Promise<string>;
  delete(id: IProject["id"]): Promise<string>;
  deleteAll(): Promise<string>;
}
