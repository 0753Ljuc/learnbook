import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@mui/material";
import { Unstyled } from "@storybook/blocks";
import styled from "styled-components";
const steps = [
  {
    label: "Component Dispatch",
    description:
      "A component dispatches a Redux Query action creator to initiate an async operation.",
  },
  {
    label: "Update State",
    description: [
      "Redux Query updates the store to indicate that the request is pending.",
      "The state is typically updated to indicate that the query is in a loading state (isLoading is set to true) and that no data is available yet (data is undefined).",
    ],
  },
  {
    label: "Subscribe to Cache Updates (Optional)",
    description: [
      "If there are active subscriptions associated with the query, Redux Toolkit Query subscribes to real-time updates for the query data from the server.",
    ],
  },
  {
    label: "API Request",
    description:
      "Redux Query makes the API request by configured `baseQuery` function.",
  },
  {
    label: "Update Query State (Success)",
    description: [
      "The isLoading flag is set to false, indicating that the loading process is complete.",
      "The data field is populated with the fetched data from the API response.",
    ],
  },
  {
    label: "Update Query State (Error):",
    description: [
      "The isLoading flag remains false, and the error field is populated with the error object containing details about the failure.",
    ],
  },
  {
    label: "Handle Subscription Updates (Optional)",
    description: [
      "If there are active subscriptions, Redux Toolkit Query receives real-time updates from the server.",
      "Subscribed data updates are automatically reflected in the Redux store, triggering state updates and UI re-renders as necessary.",
    ],
  },
] as const;

export function ReduxQueryFlowStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Unstyled>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel onClick={() => setActiveStep(index)}>
              {step.label}
            </StepLabel>
            <StepContent>
              {Array.isArray(step.description) ? (
                step.description.map((v, i) => (
                  <StyledContentText key={i}>{v}</StyledContentText>
                ))
              ) : (
                <StyledContentText>{step.description}</StyledContentText>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Unstyled>
  );
}

const StyledContentText = styled(Typography).attrs({ variant: "body2" })`
  text-indent: 1em;
`;
