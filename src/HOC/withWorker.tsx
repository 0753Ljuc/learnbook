import { Button } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import { worker } from "~/examples/query/mocks/browser";
import { HOC } from "~/types";

const WorkerWrapper = ({ children }: PropsWithChildren) => {
  const [runWorker, setRunWorker] = useState(false);

  useEffect(() => {
    worker.stop();
  }, []);

  const onClick = () => {
    if (!runWorker) {
      worker.start({
        serviceWorker: {
          url:
            process.env.NODE_ENV === "production"
              ? "/learnbook/mockServiceWorker.js"
              : "/mockServiceWorker.js",
        },
      });
      setRunWorker(true);
    } else {
      worker.stop();
      setRunWorker(false);
    }
  };

  return (
    <div>
      {children}
      <Button variant="contained" onClick={onClick}>
        {runWorker ? "Worker Stop" : "Worker Start"}
      </Button>
    </div>
  );
};

export const withWorker: HOC = (Wrapped) => {
  return (props) => (
    <WorkerWrapper>
      <Wrapped {...props} />
    </WorkerWrapper>
  );
};
