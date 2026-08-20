import Link from "next/link";
import type { ComponentPropsWithRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "compact" | "default";

type ButtonStyleProps = Readonly<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  stretch?: boolean;
}>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-brand-ink hover:bg-brand-hover active:bg-brand-hover disabled:bg-panel-raised disabled:text-copy-muted",
  secondary:
    "border border-line bg-transparent text-copy hover:border-copy hover:bg-panel active:bg-panel-raised disabled:border-line disabled:text-copy-muted",
  ghost:
    "bg-transparent text-copy hover:bg-panel active:bg-panel-raised disabled:text-copy-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  compact: "min-h-10 px-4 py-2 text-base",
  default: "min-h-12 px-6 py-3 text-lg",
};

export function getButtonClassName({
  variant = "primary",
  size = "default",
  stretch = false,
}: ButtonStyleProps = {}): string {
  return [
    "inline-flex items-center justify-center gap-2 rounded-control font-display font-bold tracking-wide uppercase transition-colors duration-150 ease-brand",
    "disabled:cursor-not-allowed disabled:opacity-65",
    variantClasses[variant],
    sizeClasses[size],
    stretch ? "w-full" : "w-auto",
  ].join(" ");
}

export type ButtonProps = Omit<
  ComponentPropsWithRef<"button">,
  "className" | "style"
> &
  ButtonStyleProps;

export function Button({
  children,
  ref,
  size,
  stretch,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={getButtonClassName({ size, stretch, variant })}
      ref={ref}
      type={type}
    >
      {children}
    </button>
  );
}

export type ButtonLinkProps = Omit<
  ComponentPropsWithRef<typeof Link>,
  "children" | "className" | "style"
> &
  ButtonStyleProps &
  Readonly<{ children: ReactNode }>;

export function ButtonLink({
  children,
  ref,
  size,
  stretch,
  variant,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={getButtonClassName({ size, stretch, variant })}
      ref={ref}
    >
      {children}
    </Link>
  );
}
