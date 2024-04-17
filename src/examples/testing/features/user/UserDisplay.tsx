import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { fetchUser, selectUserName, selectUserFetchStatus } from "./userSlice";

export function UserDisplay() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);
  const userFetchStatus = useAppSelector(selectUserFetchStatus);

  const renderUser = () => {
    switch (userFetchStatus) {
      case "loading":
        return <p>Fetching user...</p>;
      case "failure":
        return <p>Fetching Fail!</p>;
      default:
        return <p>{userName}</p>;
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => dispatch(fetchUser())}>
        Fetch user
      </Button>
      {renderUser()}
    </div>
  );
}

export const _sourceCode = `import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { fetchUser, selectUserName, selectUserFetchStatus } from "./userSlice";

export function userDisplay() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);
  const userFetchStatus = useAppSelector(selectUserFetchStatus);

  const renderUser = () => {
    switch (userFetchStatus) {
      case "loading":
        return <p>Fetching user...</p>;
      case "failure":
        return <p>Fetching Fail!</p>;
      default:
        return <p>{userName}</p>;
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => dispatch(fetchUser())}>
        Fetch user
      </Button>
      {renderUser()}
    </div>
  );
}`;
