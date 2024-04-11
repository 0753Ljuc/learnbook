import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Unstyled } from "@storybook/blocks";

const StyledPaperSub = styled(Paper).attrs({
  square: true,
  variant: "elevation",
  elevation: 2,
})`
  padding: 20px 10px;
  opacity: 0.7;
`;

export const StyledPaper = ({ children }: PropsWithChildren) => {
  return (
    <Unstyled>
      <StyledPaperSub> {children}</StyledPaperSub>
    </Unstyled>
  );
};

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
