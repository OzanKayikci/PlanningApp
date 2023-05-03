import { types } from "../../constants/types";
import { IBase } from "../../interfaces/IBase";
import { IProject } from "../../interfaces/IProject";
import Project from "../../models/Project";
import { ProjectBuilder } from "../../models/Project/projectBuilder";
import { useAppDispatch } from "../../redux/hooks/hooks";
//import { addProject } from "../../redux/state/ProjectSlice";
import { IProjectService } from "../Abstract/IProjectService";
import { deleteData, deleteStorage, getData, storeData, updateData } from "../StoringService";

export class ProjectService implements IProjectService {
  private projects: IProject[] = [];

  //TODO: create promise olarak mesaj döndürecek. o yüzden response mesaj objesi oluştur
  public async create(
    title: IProject["title"],
    color: IProject["color"],
    shape: IProject["colorShape"],
    groupId: IProject["groupId"]
  ): Promise<IProject | null> {
    const projects = await this.getAll().then((data) => {
      return data !== null ? data : [];
    });
    const nextId: number = projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;
    let newProject: Project = new ProjectBuilder(nextId, types.project, title, color, shape)
      .SetParentId(0)
      .setGroupId(groupId)
      .setChildren([])
      .setChildGroupId(0)
      .setIsParent(true)
      .setIsChild(true)
      .ProjectBuild();

    const storingStatus = await storeData(newProject.getAllItems, "projects").then((value) => {
      return value;
    });
    return storingStatus ? newProject.getAllItems : null;
  }

  public async getAll(): Promise<IProject[]> {
    const data = await getData("projects");
    this.projects = data;

    return this.projects as IProject[] ?? [];
  }
  public async getById(id: number): Promise<IProject | undefined> {
    return this.getAll().then((data) => {
      return data.find((Project) => Project.id === id);
    });
  }

  public async update(Project: Project): Promise<string> {
    return await this.getById(Project.id).then(async (data) => {
      data = Project.getAllItems;
      console.log("update", data);

      return await updateData(data, "projects");
    });
  }
  public async delete(id: IBase["id"]): Promise<string> {
    return await this.getById(id).then(async (data) => {
      return await deleteData(data, "projects");
    });
  }

  public async deleteAll(): Promise<string> {
    const result = await deleteStorage("projects");
    console.log("res", result);
    return result;
  }
}
