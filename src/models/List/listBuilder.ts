import { ReactNode } from "react";
import { IList } from "../../interfaces/IList";
import { ParentBuilder } from "../baseAbstracts/ParentBuilder";
import List from ".";
import { shapes, types } from "../../constants/types";

export class ListBuilder extends ParentBuilder implements IList {
  constructor(id: number, type: types, title: string, color: string, colorShape: string) {
    super(id, type, title, color, colorShape);
  }

  public setChildren(children: ReactNode[]): ListBuilder {
    this.children = children;
    return this;
  }
  public setChildGroupId(childGroupid: number): ListBuilder {
    this.childGroupid = childGroupid;
    return this;
  }
  public SetParentId(parentId: number): ListBuilder {
    this.parentId = parentId;
    return this;
  }
  public setIsChild(isChild: boolean): ListBuilder {
    this.isChild = isChild;
    return this;
  }
  public setIsParent(IsParent: boolean): ListBuilder {
    this.IsParent = IsParent;
    return this;
  }
  public setGroupId(groupId: number): ListBuilder {
    this.groupId = groupId;
    return this;
  }
  public listBuild = (): List => {
    return new List(this);
  };
}
