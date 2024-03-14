import { createDevTools } from "@redux-devtools/core";
import { LogMonitor } from "@redux-devtools/log-monitor";

import { DockMonitor } from "@redux-devtools/dock-monitor";
import styled from "styled-components";
import { Button, Accordion } from "@mui/material";
import { useState } from "react";

const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={true}
    defaultPosition="bottom"
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
  >
    <LogMonitor />
  </DockMonitor>
);

export const DevToolsSwitch = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <DevToolsSwitchWrapper>
      <Button variant="outlined" onClick={() => setExpanded(!expanded)}>
        DevTools
      </Button>
      {expanded && (
        <Accordion>
          <DevToolsWrapper>
            <DevTools />
          </DevToolsWrapper>
        </Accordion>
      )}
    </DevToolsSwitchWrapper>
  );
};

const DevToolsSwitchWrapper = styled.div`
  padding-top: 20px;
`;

const DevToolsWrapper = styled.div`
  height: 300px;
  > div {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
    top: auto !important;
    left: auto !important;
    > div {
      position: relative !important;
      width: 100% !important;
      height: 100% !important;
      top: auto !important;
      left: auto !important;
    }
  }
`;

export default DevTools;
