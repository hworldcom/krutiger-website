import Link from "next/link";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { VisuallyHidden } from "./visually-hidden";

export type IconLinkProps = Omit<
  ComponentPropsWithRef<typeof Link>,
  "aria-label" | "children" | "className" | "style"
> &
  Readonly<{
    icon: ReactNode;
    label: string;
  }>;

export function IconLink({ icon, label, ref, ...props }: IconLinkProps) {
  return (
    <Link
      {...props}
      className="inline-flex size-11 items-center justify-center rounded-control border border-line text-copy transition-colors hover:border-copy hover:bg-panel active:bg-panel-raised"
      ref={ref}
    >
      <span aria-hidden="true" className="size-5">
        {icon}
      </span>
      <VisuallyHidden>{label}</VisuallyHidden>
    </Link>
  );
}
