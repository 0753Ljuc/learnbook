import { Input, Snackbar } from "@mui/material";
import styled from "styled-components";

export const RefreshWrapper = styled.div`
  flex-basis: 0;
  width: 100%;
  text-align: right;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CursorPointer = styled.div`
  cursor: pointer;
`;

export const BaselineLayout = styled.div`
  display: flex;
  align-items: baseline;
`;

export const StyledSnackbar = styled(Snackbar).attrs({
  // autoHideDuration: 1000,
  transitionDuration: { enter: 500, exit: 500 },
  anchorOrigin: { vertical: "top", horizontal: "center" },
})`
  .MuiSnackbarContent-message {
    width: 100%;
    text-align: center;
  }
`;

export const StyledInput = styled(Input)``;

export const EditableWrapper = styled.div`
  display: flex;
  align-items: center;
`;
