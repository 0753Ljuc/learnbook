import styled from "styled-components";
import { Paper } from "@mui/material";

export const StyledPaper = styled(Paper).attrs({
  square: true,
  variant: "outlined",
})`
  padding: 20px 10px;
`;

export const Diagram = styled.img<{ size?: "full" | "small" | "large" }>`
  width: ${(p) =>
    p.size === "full"
      ? "100%"
      : p.size === "large"
      ? "80%"
      : p.size === "small"
      ? "40%"
      : "60%"};
`;
