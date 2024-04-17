import { Button } from "@mui/material";
import { SetupWorker } from "msw/lib/browser";
import { PropsWithChildren, useEffect, useState } from "react";
import { HOC } from "~/types";

const WorkerWrapper = ({
  children,
  worker,
}: PropsWithChildren<{ worker: SetupWorker }>) => {
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
      <div style={{ margin: "16px 0" }}>
        <Button variant="contained" onClick={onClick}>
          {runWorker ? "Worker Stop" : "Worker Start"}
        </Button>
      </div>
    </div>
  );
};

export const withWorker: HOC = (Wrapped, worker) => {
  return (props) => (
    <WorkerWrapper worker={worker as SetupWorker}>
      <Wrapped {...props} />
    </WorkerWrapper>
  );
};
