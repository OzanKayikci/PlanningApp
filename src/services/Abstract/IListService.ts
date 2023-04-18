import { IList } from "../../interfaces/IList";

export interface IListService {
  getAll(): Promise<IList[]>;
  getById(id: number): Promise<IList | undefined>;
  create(title: IList["title"], color: IList["color"], shape: IList["colorShape"], groupId:IList["groupId"]): Promise<IList | null>;
  update(list:IList): Promise<string>;
  delete(id: IList["id"]): Promise<string>;
  deleteByGroupId(groupId: IList["groupId"]): Promise<string>;
  deleteAll(): Promise<string>;
}
