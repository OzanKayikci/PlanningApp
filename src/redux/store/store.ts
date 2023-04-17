import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../state/taskSlice';
import buttonReducer from '../state/buttonActionSlice';
import listReducer from '../state/listSlice'
import modalReducer from '../state/modalSlice';
import projectReducer from '../state/projectSlice';
import selectedProjectReducer from '../state/selectedProjectSlice';
export const store = configureStore({
    
    reducer: {
         tasksReducer:taskReducer,
         saveButtonReducer: buttonReducer,
         listReducer:listReducer,
         modalReducer:modalReducer,
         projectReducer:projectReducer,
         selectedProjectReducer : selectedProjectReducer

    },
});

export type RootState = ReturnType<typeof store.getState>//for whole state
export type AppDispatch = typeof store.dispatch