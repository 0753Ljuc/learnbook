import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const initialState: Todo[] = [{ text: "Use Redux", completed: false, id: 0 }];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<string>) {
      state.push({
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.payload,
      });
    },
  },
});

export const { todoAdded } = todosSlice.actions;

export default todosSlice.reducer;

export const _sourceCode = `
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const initialState: Todo[] = [{ text: "Use Redux", completed: false, id: 0 }];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<string>) {
      state.push({
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.payload,
      });
    },
  },
});

export const { todoAdded } = todosSlice.actions;

export default todosSlice.reducer;
`;
