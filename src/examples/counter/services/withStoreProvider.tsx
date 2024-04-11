import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import alerter from "./middlewares/alerter";
import DevTools, { Devtools } from "~/components/Devtools";

import { Provider } from "react-redux";
import store from "./store";
import { HOC } from "~/types";

const storeWithDevtools = configureStore({
  reducer: {
    counter: counterSlice,
  },
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(DevTools.instrument()),
});

const storeWithAlerter = configureStore({
  reducer: {
    counter: counterSlice,
  },
  middleware: (getDefailtMiddlewares) => {
    return getDefailtMiddlewares({}).concat(alerter);
  },
});

export const withAlerter: HOC = (WrapperComp) => {
  return (props) => (
    <Provider store={storeWithAlerter}>
      <WrapperComp {...props} />
    </Provider>
  );
};

export const withDevtools: HOC = (WrapperComp) => {
  return (props) => (
    <Provider store={storeWithDevtools}>
      <WrapperComp {...props} />
      <Devtools />
    </Provider>
  );
};

export const withStore: HOC = (WrapperComp) => {
  return (props) => (
    <Provider store={store}>
      <WrapperComp {...props} />
    </Provider>
  );
};
