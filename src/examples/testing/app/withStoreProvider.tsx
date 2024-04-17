import { Provider } from "react-redux";
import { setupStore } from "./store";
import { HOC } from "~/types";

const store = setupStore();
export const withStore: HOC = (WrappedComp) => {
  return (props) => (
    <Provider store={store}>
      <WrappedComp {...props} />
    </Provider>
  );
};
