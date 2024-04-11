import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../services/hooks";

import { decrement, increment } from "../services/counterSlice";
import styled from "styled-components";

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h4>counter: {count}</h4>
      <StyledButton onClick={() => dispatch(increment())}>+</StyledButton>
      <StyledButton onClick={() => dispatch(decrement())}>-</StyledButton>
    </div>
  );
}

const StyledButton = styled(Button).attrs({
  size: "small",
  variant: "outlined",
})`
  margin-right: 20px !important;
`;

export const _sourceCode = `export function Counter() {
  // The \`state\` arg is correctly typed as \`RootState\` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h4>counter: {count}</h4>
      <StyledButton onClick={() => dispatch(increment())}>+</StyledButton>
      <StyledButton onClick={() => dispatch(decrement())}>-</StyledButton>
    </div>
  );
}
`;
