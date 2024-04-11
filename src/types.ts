import { ComponentType } from "react";

export type HOC<P extends object = {}> = (
  wrappedComp: ComponentType<P>
) => ComponentType<P>;
