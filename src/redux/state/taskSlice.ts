import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Task from "../../models/Task";
import { RootState } from "../store/store";
import { ITask } from "../../interfaces/ITask";

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

export interface TodoState {
  tasks: ITask[];
}

const initialState: TodoState = {
  tasks: [],
};

//?Pizza gibi düşünelim.
//? root tüm dilimler ise burası o dilimin bir parçası
const taskSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    deleteTaskById: (state, action: PayloadAction<ITask["id"]>) => {
      state.tasks = state.tasks.filter((task) => task.id === action.payload);
    },

    updateTaskById: (state, action: PayloadAction<ITask>) => {
      let existingTask = state.tasks.find((task) => task.id === action.payload.id);
      if (existingTask) {
        existingTask = action.payload;
      }
    },
    getProjectTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
    toggleTaskCompletedById: (state, action: PayloadAction<ITask["id"]>) => {
      const existingTodo = state.tasks.find((task) => task.id === action.payload);
      if (existingTodo) {
        existingTodo.isCompleted = existingTodo.isCompleted;
      }
    },
  },
});

export const selectTasks = (state: RootState) => state.tasksReducer.tasks;
export const { addTask, deleteTaskById, getProjectTasks, toggleTaskCompletedById, updateTaskById } =
  taskSlice.actions;
export default taskSlice.reducer;
