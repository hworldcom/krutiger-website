import type { ComponentPropsWithRef } from "react";

export type ContainerSize = "shell" | "copy" | "narrow";

const sizeClasses: Record<ContainerSize, string> = {
  shell: "max-w-shell",
  copy: "max-w-copy",
  narrow: "max-w-narrow",
};

export type ContainerProps = Omit<
  ComponentPropsWithRef<"div">,
  "className" | "style"
> &
  Readonly<{
    size?: ContainerSize;
  }>;

export function Container({
  children,
  ref,
  size = "shell",
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={`mx-auto w-full px-6 lg:px-10 ${sizeClasses[size]}`}
      ref={ref}
    >
      {children}
    </div>
  );
}
