import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter/counterSlice";
import alerter from "./middlewares/alerter";

const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
  middleware: (getDefailtMiddlewares) => {
    return getDefailtMiddlewares({}).concat(alerter);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
