import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../state/taskSlice';
import buttonReducer from '../state/buttonActionSlice';
import listReducer from '../state/listSlice'
export const store = configureStore({
    
    reducer: {
         tasksReducer:taskReducer,
         saveButtonReducer: buttonReducer,
         listReducer:listReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>//for whole state
export type AppDispatch = typeof store.dispatch