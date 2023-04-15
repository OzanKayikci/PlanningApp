import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Base } from "../../models/baseAbstracts/Base";
import { ITask } from "../../interfaces/ITask";
import { TaskBuilder } from "../../models/Task/taskBuilder";
import { priorities, shapes, types } from "../../constants/types";
import { LightColors } from "../../constants/Colors";
import Task from "../../models/Task";
import { RootState } from "../store/store";



export interface ButtonState {
  action:boolean;
  type:"delete"|"save"|"";
}

const initialState: ButtonState = {
  action: false,
  type:""
};


//?Pizza gibi düşünelim.
//? root tüm dilimler ise burası o dilimin bir parçası
const buttonSlice = createSlice({
  name: "buttonAction",
  initialState,
  reducers: {
    setButtonAction: (state, action: PayloadAction<[boolean,typeof state.type]>) => {
      console.log("insideslice", action.payload)
      state.action = action.payload[0];
      state.type =action.payload[1];
    },
  
  
  },
});

export const selectButtonAction = (state:RootState) => state.saveButtonReducer.action;
export const selectButtonType= (state:RootState) => state.saveButtonReducer.type;
export const { setButtonAction} = buttonSlice.actions;
export default buttonSlice.reducer;
