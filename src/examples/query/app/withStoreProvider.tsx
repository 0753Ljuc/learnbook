import { Provider } from "react-redux";
import { store } from "./store";
import DevTools, { Devtools } from "~/components/Devtools";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { HOC } from "~/types";

const storeWithDevtools = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(DevTools.instrument()),
});

export const withStore: HOC = (WrappedComp) => {
  return (props) => (
    <Provider store={store}>
      <WrappedComp {...props} />
    </Provider>
  );
};

export const withDevtools: HOC = (WrappedComp) => {
  return (props) => (
    <Provider store={storeWithDevtools}>
      <WrappedComp {...props} />
      <Devtools />
    </Provider>
  );
};
