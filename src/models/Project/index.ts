
import { IProject } from "../../interfaces/IProject";
import { Base } from "../baseAbstracts/Base";
import { Parent } from "../baseAbstracts/Parent";
import { ProjectBuilder } from "./projectBuilder";

export default class Project extends Parent implements IProject{
  constructor(builder: typeof ProjectBuilder.prototype) {
    super(builder);
  }

  public get getAllItems(): IProject {
    const newProject = {
      id: this.id,
      type: this.type,
      title: this.title,
      children: this.children,
      childGroupid: this.childGroupid,
      IsParent: this.IsParent,
      isChild: this.isChild,
      parentId: this.parentId,
      groupId: this.groupId,
      color: this.color,
      colorShape: this.colorShape,
    }
    return newProject;
  }
}
