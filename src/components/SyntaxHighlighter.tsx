import { Unstyled } from "@storybook/blocks";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";

import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { Tab, Tabs } from "@mui/material";
import { CopySnackbar } from "./CopySnackbar";

interface SyntaxHighlighterProps {
  schema: {
    [Path: string]: string;
  }[];
  copyable?: boolean;
}

const defaultLanguage = "ts";
export const SyntaxHighlighter = ({
  schema,
  copyable = true,
}: SyntaxHighlighterProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const [selectedSuffix, selectedCodeSource] = useMemo(() => {
    const [path, code] = Object.entries(schema[tabIndex])?.[0];
    return [path.match(/.*\.(.+)$/)?.[1] || defaultLanguage, code];
  }, [schema, tabIndex]);

  return (
    <Unstyled>
      <Wrapper>
        <Header>
          <StyledTabs
            value={tabIndex}
            $showIndicator={schema.length === 1}
            onChange={(_, newIndex) => setTabIndex(newIndex)}
          >
            {schema.map((obj) => (
              <Tab label={Object.keys(obj)?.[0] || ""} />
            ))}
          </StyledTabs>
          {copyable && <CopySnackbar highlightableCode={selectedCodeSource} />}
        </Header>

        <div>
          <ReactSyntaxHighlighter
            language={selectedSuffix}
            style={nightOwl}
            customStyle={{
              margin: "0px",
              fontSize: "14px",
              maxHeight: "480px",
            }}
          >
            {selectedCodeSource}
          </ReactSyntaxHighlighter>
        </div>
      </Wrapper>
    </Unstyled>
  );
};

const StyledTabs = styled(Tabs)<{ $showIndicator?: boolean }>`
  .MuiTabs-indicator {
    background-color: #d1eaff !important;
    ${(props) => {
      return !props.$showIndicator
        ? "height: 1px !important;"
        : "height: 0 !important;";
    }}
  }

  .MuiTab-root {
    color: #c3c3c3 !important;
    text-transform: none !important;
  }
  .Mui-selected {
    color: white !important;
  }
`;

const Header = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  position: relative;
  background-color: rgb(1, 22, 39);
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0;
  border-radius: 4px;
  overflow: hidden;
  color: white;
`;
