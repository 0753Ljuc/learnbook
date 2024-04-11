import { Middleware } from "@reduxjs/toolkit";

const alerter: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    alert("will dispatch: " + JSON.stringify(action));

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    alert("state after dispatch: " + JSON.stringify(getState()));

    // This will likely be the action itself, unless a middleware further in chain changed it.
    return returnValue;
  };

export default alerter;

export const _sourceCode = `import { Middleware } from "@reduxjs/toolkit";

const alerter: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    alert("will dispatch: " + JSON.stringify(action));

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    alert("state after dispatch: " + JSON.stringify(getState()));

    // This will likely be the action itself, unless a middleware further in chain changed it.
    return returnValue;
  };

export default alerter;`;
