
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IBase } from "../../interfaces/IBase";
import { RootState } from "../store/store";
import { ModalTypes } from "../../constants/types";

export interface ModalState {
  modalState: { type?: ModalTypes; isOpen: boolean; elementId?: IBase["id"]; title:IBase["title"] };
}

const initialState: ModalState = {
  modalState: {
    type: null,
    isOpen: false,
    elementId: null,
    title: "",
  },
};

//?Pizza gibi düşünelim.
//? root tüm dilimler ise burası o dilimin bir parçası
const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    addModalState: (state, action: PayloadAction<[ModalTypes,IBase["id"]?,IBase["title"]?]>) => {
      state.modalState = {
        type: action.payload[0],
        isOpen: true,
        elementId:action.payload[1],
        title:action.payload[2],
      };
    },


    deleteModalState: (state) => {
      state.modalState = {
        type: null,
        isOpen: false,
        elementId: null,
        title: "",
      };
    },
  },
});

export const selectModalState = (state: RootState) => state.modalReducer.modalState.isOpen;
export const selectModalType = (state: RootState) => state.modalReducer.modalState.type;
export const selectModal = (state: RootState) => state.modalReducer.modalState;
export const { addModalState, deleteModalState } = modalSlice.actions;
export default modalSlice.reducer;
