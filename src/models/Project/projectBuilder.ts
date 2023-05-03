import { ReactNode } from "react";
import { IProject } from "../../interfaces/IProject";
import { ParentBuilder } from "../baseAbstracts/ParentBuilder";
import Project from ".";
import { shapes, types } from "../../constants/types";

export class ProjectBuilder extends ParentBuilder implements IProject {
  constructor(id: number, type: types, title: string, color: string, colorShape: string) {
    super(id, type, title, color, colorShape);
  }

  public setChildren(children: ReactNode[]): ProjectBuilder {
    this.children = children;
    return this;
  }
  public setChildGroupId(childGroupid: number): ProjectBuilder {
    this.childGroupid = childGroupid;
    return this;
  }
  public SetParentId(parentId: number): ProjectBuilder {
    this.parentId = parentId;
    return this;
  }
  public setIsChild(isChild: boolean): ProjectBuilder {
    this.isChild = isChild;
    return this;
  }
  public setIsParent(IsParent: boolean): ProjectBuilder {
    this.IsParent = IsParent;
    return this;
  }
  public setGroupId(groupId: number): ProjectBuilder {
    this.groupId = groupId;
    return this;
  }
  public ProjectBuild = (): Project => {
    return new Project(this);
  };
}
