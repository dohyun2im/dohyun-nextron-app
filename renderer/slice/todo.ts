import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface TodoState {
  list: any[];
}

const initialState: TodoState = {
  list: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setTodo } = todoSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default todoSlice.reducer;