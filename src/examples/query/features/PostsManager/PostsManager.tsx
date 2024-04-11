import { Backdrop, CircularProgress } from "@mui/material";
import { useGetPostsQuery } from "../../app/services/api";
import { createContext, useContext, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  RefreshWrapper,
  CursorPointer,
  HeaderWrapper,
  StyledSnackbar,
} from "./styled.components";
import { PostList } from "./PostList";
import { AddPost } from "./AddPost";

interface StatusContext {
  backdrop: boolean;
  showBackdrop: () => void;
  hideBackdrop: () => void;
  showSnackbar: (content: string) => void;
}
const statusContext = createContext<StatusContext | null>(null);

export const useStateContext = () => useContext(statusContext)!;

export const PostsManager = () => {
  const [backdrop, setBackdrop] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const { data: posts, isLoading, refetch, isError } = useGetPostsQuery();

  const value: StatusContext = {
    showSnackbar: (msg) => {
      setSnackbarMsg(msg);
      setSnackbar(true);
    },
    showBackdrop: () => setBackdrop(true),
    hideBackdrop: () => setBackdrop(false),
    backdrop,
  };

  return (
    <statusContext.Provider value={value}>
      <div>
        <HeaderWrapper>
          <h3>Posts</h3>
          <RefreshWrapper>
            <CursorPointer>
              <RefreshIcon
                color="primary"
                onClick={refetch}
                titleAccess="refresh"
              />
            </CursorPointer>
          </RefreshWrapper>
        </HeaderWrapper>
        {isLoading ? (
          <div>loading...</div>
        ) : posts ? (
          <>
            <PostList posts={posts} />
            <AddPost />
          </>
        ) : (
          <div>
            <h4>No posts available!</h4>
            {isError && (
              <p>👉🏻 Click the `WORKER START` and refetch the posts!</p>
            )}
          </div>
        )}
        <Backdrop open={backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <StyledSnackbar
          open={snackbar}
          message={snackbarMsg}
          onClose={() => setSnackbar(false)}
        />
      </div>
    </statusContext.Provider>
  );
};

export const _sourceCode = `interface StatusContext {
  backdrop: boolean;
  showBackdrop: () => void;
  hideBackdrop: () => void;
  showSnackbar: (content: string) => void;
}
const statusContext = createContext<StatusContext | null>(null);

export const useStateContext = () => useContext(statusContext)!;

export const PostsManager = () => {
  const [backdrop, setBackdrop] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const { data: posts, isLoading, refetch, isError } = useGetPostsQuery();

  const value: StatusContext = {
    showSnackbar: (msg) => {
      setSnackbarMsg(msg);
      setSnackbar(true);
    },
    showBackdrop: () => setBackdrop(true),
    hideBackdrop: () => setBackdrop(false),
    backdrop,
  };

  return (
    <statusContext.Provider value={value}>
      <div>
        <HeaderWrapper>
          <h3>Posts</h3>
          <RefreshWrapper>
            <CursorPointer>
              <RefreshIcon
                color="primary"
                onClick={refetch}
                titleAccess="refresh"
              />
            </CursorPointer>
          </RefreshWrapper>
        </HeaderWrapper>
        {isLoading ? (
          <div>loading...</div>
        ) : posts ? (
          <>
            <PostList posts={posts} />
            <AddPost />
          </>
        ) : (
          <div>
            <h4>No posts available!</h4>
            {isError && (
              <p>👉🏻 Click the \`WORKER START\` and refetch the posts!</p>
            )}
          </div>
        )}
        <Backdrop open={backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <StyledSnackbar
          open={snackbar}
          message={snackbarMsg}
          onClose={() => setSnackbar(false)}
        />
      </div>
    </statusContext.Provider>
  );
};`;
