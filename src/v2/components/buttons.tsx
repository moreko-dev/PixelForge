import React from "react";
import { CgSpinnerTwo } from "react-icons/cg";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

// ***************************** //
// TYPES and CONSTANTS //
// ***************************** //

export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
};

type TextButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
};

type IconOnlyButtonProps = {
  children?: never;
  icon: React.ReactNode;
  iconPosition?: never;
};

export type AppButtonProps = BaseProps &
  (TextButtonProps | IconOnlyButtonProps);

const BASE = cn(
  "cursor-pointer relative inline-flex shrink-0 select-none items-center justify-center",
  "whitespace-nowrap rounded-lg font-medium leading-normal",
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out",
  "active:scale-[0.98]",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "disabled:cursor-not-allowed disabled:active:scale-100",
  "motion-reduce:transition-none motion-reduce:active:scale-100",
);

const SIZES: Record<
  ButtonSize,
  {
    text: string;
    iconOnly: string;
    withIconStart: string;
    withIconEnd: string;
    icon: string;
  }
> = {
  sm: {
    text: "h-8 px-3 text-sm gap-1.5",
    iconOnly: "size-8 p-0",
    withIconStart: "pl-2.5",
    withIconEnd: "pr-2.5",
    icon: "size-4",
  },
  md: {
    text: "h-10 px-4 text-sm gap-2",
    iconOnly: "size-10 p-0",
    withIconStart: "pl-3.5",
    withIconEnd: "pr-3.5",
    icon: "size-[18px]",
  },
  lg: {
    text: "h-12 px-6 text-base gap-2.5",
    iconOnly: "size-12 p-0",
    withIconStart: "pl-5",
    withIconEnd: "pr-5",
    icon: "size-5",
  },
};

const DESTRUCTIVE_SOLID = cn(
  "bg-destructive text-destructive-foreground shadow-sm",
  "hover:bg-destructive-hover active:bg-destructive-active",
  "focus-visible:outline-destructive",
  "disabled:opacity-50 disabled:shadow-none",
);

const DESTRUCTIVE_SOFT = cn(
  "border border-destructive-border bg-destructive-soft text-destructive",
  "hover:bg-destructive-hover hover:text-destructive-foreground hover:border-transparent",
  "active:bg-destructive-active active:text-destructive-foreground active:border-transparent",
  "focus-visible:outline-destructive",
  "disabled:opacity-50",
);

export type DestructiveButtonProps = AppButtonProps & {
  appearance?: "solid" | "soft";
};

export type IconButtonProps = Omit<BaseProps, "fullWidth"> & {
  icon: React.ReactNode;
  shape?: "square" | "circle";
};

// ***************************** //
// COMPONENTS //
// ***************************** //

const Spinner = () => (
  <CgSpinnerTwo className="size-full animate-spin motion-reduce:animate-none" />
);

function createButton(displayName: string, variantClasses: string) {
  function Component(props: AppButtonProps) {
    const {
      size = "md",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "start",
      children,
      className,
      disabled,
      type = "button",
      onClick,
      ...rest
    } = props as BaseProps & {
      children?: React.ReactNode;
      icon?: React.ReactNode;
      iconPosition?: "start" | "end";
    };

    const s = SIZES[size];

    const hasText =
      children !== undefined && children !== null && children !== false;

    const isIconOnly = !hasText && !!icon;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) {
        e.preventDefault();
        return;
      }

      onClick?.(e);
    };

    const iconSlot = (node: React.ReactNode) => (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center [&>svg]:size-full",
          s.icon,
        )}
      >
        {node}
      </span>
    );

    const startSlot =
      loading && (iconPosition === "start" || isIconOnly || !icon)
        ? iconSlot(<Spinner />)
        : icon && iconPosition === "start"
          ? iconSlot(icon)
          : null;

    const endSlot =
      icon && iconPosition === "end" && hasText
        ? iconSlot(loading && !startSlot ? <Spinner /> : icon)
        : null;

    return (
      <button
        type={type}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          BASE,
          variantClasses,
          isIconOnly ? s.iconOnly : s.text,
          !isIconOnly &&
            icon &&
            hasText &&
            (iconPosition === "end" ? s.withIconEnd : s.withIconStart),
          fullWidth && "w-full",
          className,
        )}
        {...rest}
      >
        {startSlot}
        {hasText && <span className="truncate">{children}</span>}
        {endSlot}
      </button>
    );
  }

  Component.displayName = displayName;
  return Component;
}

export const PrimaryButton = createButton(
  "PrimaryButton",
  cn(
    "bg-primary text-primary-foreground shadow-sm",
    "hover:bg-primary-hover active:bg-primary-active",
    "focus-visible:outline-primary",
    "disabled:bg-primary-disabled disabled:shadow-none disabled:text-primary-foreground/70",
  ),
);

export const SecondaryButton = createButton(
  "SecondaryButton",
  cn(
    "bg-secondary text-secondary-foreground",
    "hover:bg-secondary-hover active:bg-secondary-active",
    "focus-visible:outline-primary",
    "disabled:bg-secondary-disabled disabled:text-secondary-foreground/50",
  ),
);

export const GhostButton = createButton(
  "GhostButton",
  cn(
    "bg-transparent text-ghost-foreground",
    "hover:bg-ghost-hover active:bg-ghost-active",
    "focus-visible:outline-primary",
    "disabled:bg-transparent disabled:text-ghost-foreground/40",
  ),
);

export const OutlineButton = createButton(
  "OutlineButton",
  cn(
    "border border-outline-border bg-outline text-outline-foreground",
    "hover:bg-outline-hover active:bg-outline-active",
    "focus-visible:outline-primary",
    "disabled:border-border-disabled disabled:bg-transparent disabled:text-outline-foreground/40",
  ),
);

const DestructiveSolid = createButton("DestructiveSolid", DESTRUCTIVE_SOLID);
const DestructiveSoft = createButton("DestructiveSoft", DESTRUCTIVE_SOFT);

export const DestructiveButton = (props: DestructiveButtonProps) => {
  const { appearance = "solid", ...rest } = props;
  const Comp = appearance === "soft" ? DestructiveSoft : DestructiveSolid;
  return <Comp {...(rest as AppButtonProps)} />;
};
DestructiveButton.displayName = "DestructiveButton";

export const SuccessButton = createButton(
  "SuccessButton",
  cn(
    "bg-success text-success-foreground shadow-sm",
    "hover:bg-[color-mix(in_srgb,var(--success),black_12%)]",
    "active:bg-[color-mix(in_srgb,var(--success),black_22%)]",
    "focus-visible:outline-success",
    "disabled:opacity-50 disabled:shadow-none",
  ),
);

export const WarningButton = createButton(
  "WarningButton",
  cn(
    "bg-warning text-warning-foreground shadow-sm",
    "hover:bg-[color-mix(in_srgb,var(--warning),black_12%)]",
    "active:bg-[color-mix(in_srgb,var(--warning),black_22%)]",
    "focus-visible:outline-warning",
    "disabled:opacity-50 disabled:shadow-none",
  ),
);

export const ErrorButton = createButton(
  "ErrorButton",
  cn(
    "bg-error text-error-foreground shadow-sm",
    "hover:bg-[color-mix(in_srgb,var(--error),black_12%)]",
    "active:bg-[color-mix(in_srgb,var(--error),black_22%)]",
    "focus-visible:outline-error",
    "disabled:opacity-50 disabled:shadow-none",
  ),
);

export const InfoButton = createButton(
  "InfoButton",
  cn(
    "bg-info text-info-foreground shadow-sm",
    "hover:bg-[color-mix(in_srgb,var(--info),black_12%)]",
    "active:bg-[color-mix(in_srgb,var(--info),black_22%)]",
    "focus-visible:outline-info",
    "disabled:opacity-50 disabled:shadow-none",
  ),
);

export const IconButton = ({
  icon,
  size = "md",
  shape = "square",
  loading = false,
  className,
  type = "button",
  onClick,
  ...rest
}: IconButtonProps) => {
  const s = SIZES[size];

  return (
    <button
      type={type}
      onClick={(e) => (loading ? e.preventDefault() : onClick?.(e))}
      className={cn(
        BASE,
        s.iconOnly,
        shape === "circle" && "rounded-full",
        "bg-transparent text-icon-button-foreground " +
          "hover:bg-icon-button-hover active:bg-icon-button-active " +
          "focus-visible:outline-primary " +
          "disabled:bg-transparent disabled:text-icon-button-disabled",
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center [&>svg]:size-full",
          s.icon,
        )}
      >
        {loading ? <Spinner /> : icon}
      </span>
    </button>
  );
};
IconButton.displayName = "IconButton";
