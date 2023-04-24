import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import list from "../../models/List";
import { RootState } from "../store/store";
import { IList } from "../../interfaces/IList";

// const Getlist1 = () => {
//     const text =
//       "Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir";
//     const title = "mangata bitir";
//     let list: Ilist = new listBuilder(1, types.list, title, text, LightColors.listColors[10], shapes.circle, 2)
//       .SetParentId(1)
//       .setPriority(priorities.low)
//       .listBuild();
//       return list;
//   };

export interface TodoState {
  lists: IList[];
  allLists: IList[];
}

const initialState: TodoState = {
  lists: [],
  allLists: [],
};

//?Pizza gibi düşünelim.
//? root tüm dilimler ise burası o dilimin bir parçası
const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addlist: (state, action: PayloadAction<IList>) => {
      state.lists = [...state.lists, action.payload];
      state.allLists = [...state.allLists, action.payload];
    },
    getProjectLists: (state, action: PayloadAction<[IList[], IList["groupId"]]>) => {
      state.lists =
        action.payload[0] !== null
          ? action.payload[0].filter((list) => list.groupId === action.payload[1])
          : [];
    },
    getAllLists: (state, action: PayloadAction<IList[]>) => {
      console.log(action.payload)
      state.allLists = action.payload !== null ? action.payload : [];
    },
    deletelistById: (state, action: PayloadAction<IList["id"]>) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
      state.allLists = state.allLists.filter((list) => list.id !== action.payload);
    },

    updatelistById: (state, action: PayloadAction<IList>) => {
      let newLists: IList[] = state.lists.map((list: any) =>
        list.id === action.payload.id ? action.payload : list
      );
      let newAllLists: IList[] = state.allLists.map((list: any) =>
        list.id === action.payload.id ? action.payload : list
      );
      state.lists = newLists;
      state.allLists = newAllLists;
    },
  },
});

export const selectlists = (state: RootState) => state.listReducer.lists;
export const selectAlllists = (state: RootState) => state.listReducer.allLists;
export const { addlist, deletelistById, updatelistById, getProjectLists, getAllLists } = listSlice.actions;
export default listSlice.reducer;
