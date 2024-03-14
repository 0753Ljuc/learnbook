import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store";
import { Counter } from "./features/counter/Counter";

// As of React 18
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <Counter />
  </Provider>
);
