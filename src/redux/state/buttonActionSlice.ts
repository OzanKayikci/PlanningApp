import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Base } from "../../models/baseAbstracts/Base";
import { ITask } from "../../interfaces/ITask";
import { TaskBuilder } from "../../models/Task/taskBuilder";
import { priorities, shapes, types } from "../../constants/types";
import { LightColors } from "../../constants/Colors";
import Task from "../../models/Task";
import { RootState } from "../store/store";


// const GetTask1 = () => {
//     const text =
//       "Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir";
//     const title = "mangata bitir";
//     let task: ITask = new TaskBuilder(1, types.task, title, text, LightColors.listColors[10], shapes.circle, 2)
//       .SetParentId(1)
//       .setPriority(priorities.low)
//       .taskBuild();
//       return task;
//   };

export interface ButtonState {
  isSaving:boolean;
}

const initialState: ButtonState = {
    isSaving: false,
};

//?Pizza gibi düşünelim.
//? root tüm dilimler ise burası o dilimin bir parçası
const buttonSlice = createSlice({
  name: "saveButton",
  initialState,
  reducers: {
    setButtonAction: (state, action: PayloadAction<boolean>) => {
      console.log("insideslice", action.payload)
      state.isSaving = action.payload;
    },
  
  
  },
});

export const selectButtonAction = (state:RootState) => state.saveButtonReducer.isSaving;
export const { setButtonAction} = buttonSlice.actions;
export default buttonSlice.reducer;
