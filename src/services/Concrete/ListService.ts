import { types } from "../../constants/types";
import { IList } from "../../interfaces/IList";
import List from "../../models/List";
import { ListBuilder } from "../../models/List/listBuilder";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { deletelistById } from "../../redux/state/listSlice";
//import { addlist } from "../../redux/state/listSlice";
import { IListService } from "../Abstract/IListService";
import { deleteData, deleteStorage, getData, storeData } from "../StoringService";

export class ListService implements IListService {
  private lists: IList[] = [];

  //TODO: create promise olarak mesaj döndürecek. o yüzden response mesaj objesi oluştur
  public async create(
    title: IList["title"],
    color: IList["color"],
    shape: IList["colorShape"]
  ): Promise<IList | null> {
    const lists = await this.getAll().then((data) => {
      return data;
    });
    const netId: number = lists !== null ? lists[lists.length - 1].id + 1 : 100;
    let newList: List = new ListBuilder(netId, types.list, title, color, shape)
      .SetParentId(0)
      .setGroupId(0)
      .setChildren([])
      .setChildGroupId(0)
      .setIsParent(true)
      .setIsChild(true)
      .listBuild();

    const storingStatus = await storeData(newList.getAllItems, "lists").then((value) => {
      return value;
    });
    return storingStatus ? newList.getAllItems : null;
  }

  public async getAll(): Promise<IList[]> {
    const data = await getData("lists");
    this.lists = data;
    return this.lists as IList[];
  }
  public async getById(id: number): Promise<IList | undefined> {
    return this.getAll().then((data) => {
      return data.find((list) => list.id === id);
    });
  }

  public async update(list: IList): Promise<string> {
    const dispatch = useAppDispatch();

    // this.getById(list.id).then((data) => {
    //   data = list;
    //   storeData(data, "lists").then((value) => {
    //     value && data ? dispatch(addlist(data)) : null;
    //     return "success";
    //   });
    // });
    return "fail";
  }
  public async delete(id: number): Promise<string> {
   return await this.getById(id).then(async (data) => {
     return await deleteData(data, "lists")
    });
  }

  public async deleteAll(): Promise<string> {
    const result = await deleteStorage("lists");
    console.log("res", result);
    return result;
  }
}
