import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { Unstyled } from "@storybook/blocks";

import styled from "styled-components";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PropsWithChildren } from "react";
import { CopySnackbar } from "./CopySnackbar";

interface CustomCodeProps extends PropsWithChildren {
  className?: string;
  language?: string;
}

export const CustomCode = (props: CustomCodeProps) => {
  const { children, className, language } = props;

  if (!className && !language) {
    return <code>{children}</code>;
  }
  if (typeof children !== "string") {
    return children;
  }

  const lang = language ?? className?.match(/language-(.*)/)?.[1] ?? className;

  return (
    <Unstyled>
      <Wrapper>
        <ReactSyntaxHighlighter
          language={lang}
          style={nightOwl}
          customStyle={{ margin: "0px", fontSize: "14px", maxHeight: "480px" }}
        >
          {children}
        </ReactSyntaxHighlighter>
        <StyledCopySnackbar highlightableCode={children} />
      </Wrapper>
    </Unstyled>
  );
};

const Wrapper = styled.div`
  margin-bottom: 16px;
  position: relative;
  background-color: rgb(1, 22, 39);
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0;
  border-radius: 4px;
  overflow: hidden;
  color: white;
`;

const StyledCopySnackbar = styled(CopySnackbar)`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.5s;

  ${Wrapper}:hover & {
    opacity: 0.4;
  }

  &:hover {
    opacity: 1 !important;
  }
`;
