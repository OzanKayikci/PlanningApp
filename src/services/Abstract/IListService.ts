import { IList } from "../../interfaces/IList";

export interface IListService {
  getAll(): Promise<IList[]>;
  getById(id: number): Promise<IList | undefined>;
  create(title: IList["title"], color: IList["color"], shape: IList["colorShape"]): Promise<IList | null>;
  update(list: IList): Promise<string>;
  delete(id: number): Promise<string>;
  deleteAll(): Promise<string>;
}
