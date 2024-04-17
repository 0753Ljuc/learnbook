import { ComponentType } from "react";

export type HOC<P extends object = object> = (
  wrappedComp: ComponentType<P>,
  ...args: unknown[]
) => ComponentType<P>;
