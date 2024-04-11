import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import styled from "styled-components";

type QAChild =
  | React.ReactElement<typeof Question>
  | React.ReactElement<typeof Answer>;

interface QABoxProps {
  children: QAChild | QAChild[];
}

const QABox = ({ children }: QABoxProps) => {
  const items = Array.isArray(children) ? children : [children];

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <IconWrapper>
          <QuestionAnswerIcon color="warning" />
        </IconWrapper>
        <StyledText>{items[0]}</StyledText>
      </AccordionSummary>

      <StyledAccordionDetails>
        <IconWrapper>
          <QuestionAnswerIcon
            color="warning"
            style={{ visibility: "hidden" }}
          />
        </IconWrapper>
        <StyledText>{items[1]}</StyledText>
      </StyledAccordionDetails>
    </Accordion>
  );
};

interface QAProps {
  children: string;
}

const Question = ({ children }: QAProps) => {
  return <StyledText>{children}</StyledText>;
};
const Answer = ({ children }: QAProps) => {
  return <StyledText>{children}</StyledText>;
};

QABox.Question = Question;
QABox.Answer = Answer;

const StyledText = styled(Typography)`
  padding-right: 0.8rem;
`;

const IconWrapper = styled("div")`
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
`;

export default QABox;
