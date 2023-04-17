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
  Projects: IProject[];
}

const initialState: projectState = {
  Projects: [],
};

//?Pizza gibi düşünelim.
//? root tüm dilimler ise burası o dilimin bir parçası
const ProjectSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<IProject>) => {
      state.Projects = [...state.Projects, action.payload];
    },
    getAllProjects: (state, action: PayloadAction<IProject[]>) => {
      state.Projects = action.payload !== null ? action.payload : [];
    },
    deleteProjectById: (state, action: PayloadAction<IProject["id"]>) => {
      state.Projects = state.Projects.filter((Project) => Project.id !== action.payload);
    },

    updateProjectById: (state, action: PayloadAction<IProject>) => {
      let newProjects: IProject[] = state.Projects.map((Project: any) =>
        Project.id === action.payload.id ? action.payload : Project
      );
      state.Projects = newProjects;
    },
  },
});

export const selectProjects = (state: RootState) => state.projectReducer.Projects;
export const { addProject, deleteProjectById, updateProjectById, getAllProjects } = ProjectSlice.actions;
export default ProjectSlice.reducer;
