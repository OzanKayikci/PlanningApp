import { ReactNode } from "react";
import { IParent } from "../../interfaces/IParent";
import { BaseBuilder } from "./BaseBuilder";
import { Parent } from "./Parent";
import { IBase } from "../../interfaces/IBase";
import { shapes, types } from "../../constants/types";

export abstract class ParentBuilder extends BaseBuilder implements IParent {
  children: ReactNode[];
  childGroupid: number;

  
  constructor(id: number, type: types, title: string, color: string, colorShape: shapes) {
    super();
    this.id = id;
    this.type = type;
    this.title = title;
    this.color = color;
    this.colorShape = colorShape;
  }
  public setChildren(children: ReactNode[]): ParentBuilder {
    this.children = children;
    return this;
  }
  public setChildGroupId(childGroupid: number): ParentBuilder {
    this.childGroupid = childGroupid;
    return this;
  }

  public setIsChild(isChild: boolean): ParentBuilder {
      this.isChild = isChild;
      return this
  }
  public setIsParent(IsParent: boolean): ParentBuilder {
      this.IsParent = IsParent;
      return this
  }
  public setGroupId(groupId: number): ParentBuilder {
      this.groupId = groupId;
      return this
  }
  parentBuild(): IParent {
    const {baseBuild, ...rest} = this;
    return rest
  }

}
