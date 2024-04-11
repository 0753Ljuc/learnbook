import { Alert, Snackbar } from "@mui/material";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { copyToClipboard } from "~/utils/copyToClipboard";
import { formatter } from "~/utils/formatter";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";

interface CopySnackbarProps {
  highlightableCode?: string;
  className?: string;
}
export const CopySnackbar = ({
  highlightableCode,
  className,
}: CopySnackbarProps) => {
  const [snackbar, setSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();

  const onClick = useCallback(async () => {
    if (!highlightableCode) {
      setIsSuccess(false);
      setSnackbar(true);
      return;
    }

    formatter("typescript", highlightableCode)
      .then(copyToClipboard)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((e) => {
        console.error(e);
        setIsSuccess(false);
      })
      .finally(() => {
        setSnackbar(true);
      });
  }, [highlightableCode]);

  return (
    <StyledWrapper className={className}>
      {snackbar ? (
        <LibraryAddCheckRoundedIcon fontSize="small" />
      ) : (
        <StyledContentCopyIcon onClick={onClick} />
      )}
      <Snackbar
        open={snackbar}
        autoHideDuration={1000}
        transitionDuration={{ enter: 500, exit: 500 }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSnackbar(false)}
      >
        {isSuccess ? (
          <Alert severity="success">Copied!</Alert>
        ) : (
          <Alert severity="error">Copy Failed!</Alert>
        )}
      </Snackbar>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const StyledContentCopyIcon = styled(ContentCopyRoundedIcon).attrs({
  fontSize: "small",
})`
  cursor: pointer;
`;
