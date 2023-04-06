import { shapes, types } from "../../constants/types";
import { IBase } from "../../interfaces/IBase";
import { Base } from "./Base";

export abstract class BaseBuilder {
  id: number;
  type: types;
  title: string;
  IsParent: boolean = false;
  isChild: boolean = false;
  parentId?: number;
  groupId?: number;
  color: string;
  colorShape: shapes;

  public startBaseBuild(id: number, type: types, title: string, color: string, colorShape: shapes) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.color = color;
    this.colorShape = colorShape;
    return this;
  }

  public setIsParent(IsParent: boolean): BaseBuilder {
    this.IsParent = IsParent;
    return this;
  }
  public setIsChild(isChild: boolean): BaseBuilder {
    this.isChild = isChild;
    return this;
  }
  public SetParentId(parentId: number): BaseBuilder {
    this.parentId = parentId;
    return this;
  }
  public setGroupId(groupId: number): BaseBuilder {
    this.groupId = groupId;
    return this;
  }

  public baseBuild = (): IBase => {
    return new Base(this);
  };
}

// export abstract class BaseBuilder {
//   private _base: IBase;
// //   constructor() {
// //     this._base = new Base(this);
// //   }
//   public abstract setId(id: number): BaseBuilder
//   public abstract setType(type: string): BaseBuilder
//   public abstract setTitle(title: string): BaseBuilder
//   public abstract setIsParent(IsParent: boolean): BaseBuilder
//   public abstract setIsChild(isChild: boolean): BaseBuilder
//   public abstract SetParentId(parentId: number): BaseBuilder
//   public abstract setGroupId(groupId: number): BaseBuilder
//   public abstract setColor(color: string): BaseBuilder
//   public abstract setColorShape(colorShape: string): BaseBuilder

//   public  baseBuild = (): IBase => this._base;
// }

// export abstract class BaseBuilder implements IBase {
//     private _id: number;
//     private _type: string;
//     private _title: string;
//     private _IsParent: boolean;
//     private _isChild: boolean;
//     private _parentId: number;
//     private _groupId: number;
//     private _color: string;
//     private _colorShape: string;

//     public setId(id: number): BaseBuilder {
//       this.id = id;
//       return this;
//     }
//     public setType(type: string): BaseBuilder {
//       this.type = type;
//       return this;
//     }
//     public setTitle(title: string): BaseBuilder {
//       this.title = title;
//       return this;
//     }
//     public setIsParent(IsParent: boolean): BaseBuilder {
//       this.IsParent = IsParent;
//       return this;
//     }
//     public setIsChild(isChild: boolean): BaseBuilder {
//       this.isChild = isChild;
//       return this;
//     }
//     public SetParentId(parentId: number): BaseBuilder {
//       this.parentId = parentId;
//       return this;
//     }
//     public setGroupId(groupId: number): BaseBuilder {
//       this.groupId = groupId;
//       return this;
//     }
//     public setColor(color: string): BaseBuilder {
//       this.color = color;
//       return this;
//     }
//     public setColorShape(colorShape: string): BaseBuilder {
//       this.colorShape = colorShape;
//       return this;
//     }

//     public abstract build(): Base;

//     public get id(): number {
//       return this.id;
//     }

//     public get type(): string {
//       return this.type;
//     }

//     public get title(): string {
//       return this.title;
//     }

//     public get IsParent(): boolean {
//       return this.IsParent;
//     }

//     public get isChild(): boolean {
//       return this.isChild;
//     }

//     public get parentId(): number {
//       return this.parentId;
//     }

//     public get groupId(): number {
//       return this.groupId;
//     }

//     public get color(): string {
//       return this.color;
//     }

//     public get colorShape(): string {
//       return this.colorShape;
//     }
//   }
