import { IList } from "../../interfaces/IList";
import { Base } from "../baseAbstracts/Base";
import { Parent } from "../baseAbstracts/Parent";
import { ListBuilder } from "./listBuilder";

export default class List extends Parent implements IList {
  constructor(builder: typeof ListBuilder.prototype) {
    super(builder);
  }

  public get getAllItems(): IList {
    const newlist = {
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
    return newlist;
  }
}
