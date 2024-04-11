import { createDevTools } from "@redux-devtools/core";
import { LogMonitor } from "@redux-devtools/log-monitor";
import { DockMonitor } from "@redux-devtools/dock-monitor";
import { PropsWithChildren, useRef, useMemo, useState, useEffect } from "react";

import { createPortal } from "react-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import { Unstyled } from "@storybook/blocks";

const DefaultDevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={true}
    defaultSize={1}
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
  >
    <LogMonitor />
  </DockMonitor>
);

export const Devtools = () => {
  const [expanded, setExpanded] = useState(false);
  const subWinRef = useRef<Window>();

  useEffect(() => () => subWinRef.current?.close(), []);

  return (
    <StyledWrapper>
      <Button
        variant="contained"
        onClick={() => {
          if (expanded) {
            setExpanded(false);
            subWinRef.current?.close();
          } else {
            setExpanded(true);
          }
        }}
      >
        {expanded ? "DevTools Off" : "DevTools On"}
      </Button>
      {expanded && (
        <Unstyled>
          <NewWindow
            configSubWindow={(win) => {
              win.onbeforeunload = () => setExpanded(false);
              window.onbeforeunload = () => win.close();
              subWinRef.current = win;
            }}
          >
            <DefaultDevTools />
          </NewWindow>
        </Unstyled>
      )}
    </StyledWrapper>
  );
};

interface NewWindowProps {
  configSubWindow?: (win: Window) => void;
}

const NewWindow = ({
  children,
  configSubWindow,
}: PropsWithChildren<NewWindowProps>) => {
  const newWindow = useMemo(
    () =>
      window.open(
        "about:blank",
        "newWin",
        `width=400,height=${window.innerHeight},left=${window.innerWidth - 400},top=0`
      ),
    []
  );
  if (newWindow) {
    configSubWindow?.(newWindow);
  }

  return newWindow && createPortal(children, newWindow.document.body);
};

export default DefaultDevTools;

const StyledWrapper = styled.div`
  margin: 16px 0;
`;
