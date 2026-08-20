import type { ComponentPropsWithRef } from "react";

export type VisuallyHiddenProps = Omit<
  ComponentPropsWithRef<"span">,
  "className" | "style"
>;

export function VisuallyHidden({
  children,
  ref,
  ...props
}: VisuallyHiddenProps) {
  return (
    <span {...props} className="sr-only" ref={ref}>
      {children}
    </span>
  );
}
