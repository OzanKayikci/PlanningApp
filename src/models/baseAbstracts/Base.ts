import { shapes, types } from "../../constants/types";
import { IBase } from "../../interfaces/IBase";
import { BaseBuilder } from "./BaseBuilder";
export class Base implements IBase {
  private _id: number;
  private _type: types;
  private _title: string;
  private _IsParent: boolean;
  private _isChild: boolean;
  private _parentId: number;
  private _groupId: number;
  private _color: string;
  private _colorShape: shapes;

  constructor(builder: typeof BaseBuilder.prototype ){

    this._id = builder.id;
    this._type = builder.type;
    this._title = builder.title;
    this._IsParent = builder.IsParent;
    this._isChild = builder.isChild;
    this._parentId = builder.parentId;
    this._groupId = builder.groupId;
    this._color = builder.color;
    this._colorShape = builder.colorShape;
  }

  public get id(): number {
    return this._id;
  }

  public get type(): types {
    return this._type;
  }

  public get title(): string {
    return this._title;
  }

  public get IsParent(): boolean {
    return this._IsParent;
  }

  public get isChild(): boolean {
    return this._isChild;
  }

  public get parentId(): number {
    return this._parentId;
  }

  public get groupId(): number {
    return this._groupId;
  }

  public get color(): string {
    return this._color;
  }

  public get colorShape(): shapes {
    return this._colorShape;
  }
  
}

// export abstract class Base implements IBase{
//     private _id: number;
//     private _type: string;
//     private _title: string;
//     private _IsParent: boolean;
//     private _isChild: boolean;
//     private _parentId: number;
//     private _groupId: number;
//     private _color: string;
//     private _colorShape: string;

//     constructor(props:IBase){
//         this._id= props.id;
//         this._type= props.type;
//         this._title= props.title;
//         this._IsParent= props.IsParent;
//         this._isChild= props.isChild;
//         this._parentId= props.parentId;
//         this._groupId= props.groupId;
//         this._color= props.color;
//         this._colorShape= props.colorShape;
//       }
//       public get id(): number {
//         return this._id;
//       }
//       public set id(value: number) {
//         this._id = value;
//       }

//       public get type(): string {
//         return this._type;
//       }
//       public set type(value: string) {
//         this._type = value;
//       }

//       public get title(): string {
//         return this._title;
//       }
//       public set title(value: string) {
//         this._title = value;
//       }

//       public get IsParent(): boolean {
//         return this._IsParent;
//       }
//       public set IsParent(value: boolean) {
//         this._IsParent = value;
//       }

//       public get isChild(): boolean {
//         return this._isChild;
//       }
//       public set isChild(value: boolean) {
//         this._isChild = value;
//       }

//       public get parentId(): number {
//         return this._parentId;
//       }
//       public set parentId(value: number) {
//         this._parentId = value;
//       }
//       public get groupId(): number {
//         return this._groupId;
//       }
//       public set groupId(value: number) {
//         this._groupId = value;
//       }
//       public get color(): string {
//         return this._color;
//       }
//       public set color(value: string) {
//         this._color = value;
//       }

//       public get colorShape(): string {
//         return this._colorShape;
//       }
//       public set colorShape(value: string) {
//         this._colorShape = value;
//       }

// }
