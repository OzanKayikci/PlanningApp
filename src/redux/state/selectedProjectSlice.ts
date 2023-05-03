import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Project from "../../models/Project";
import { RootState } from "../store/store";
import { IProject } from "../../interfaces/IProject";

// const GetProject1 = () => {
//     const text =
//       "Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir";
//     const title = "mangata bitir";
//     let Project: IProject = new ProjectBuilder(1, types.Project, title, text, LightColors.ProjectColors[10], shapes.circle, 2)
//       .SetParentId(1)
//       .setPriority(priorities.low)
//       .ProjectBuild();
//       return Project;
//   };

export interface projectState {
  Project: IProject;
}

const initialState: projectState = {
  Project: null,
};

//?Pizza gibi düşünelim.
//? root tüm dilimler ise burası o dilimin bir parçası
const SelectedProjectSlice = createSlice({
  name: "selectedProject",
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<IProject>) => {
      state.Project = action.payload;
    },
  },
});

export const selectSelectedProject = (state: RootState) => state.selectedProjectReducer.Project;
export const { setSelectedProject } = SelectedProjectSlice.actions;
export default SelectedProjectSlice.reducer;
