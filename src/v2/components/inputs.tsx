import React, { useEffect, useState } from "react";
import {
  LuCheck,
  LuChevronDown,
  LuEye,
  LuEyeOff,
  LuMinus,
  LuPlus,
  LuSearch,
  LuUpload,
} from "react-icons/lu";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

// ***************************** //
// TYPES and CONSTANTS //
// ***************************** //

export type InputSize = "sm" | "md" | "lg";

type FieldSizeConfig = {
  field: string;
  padX: string;
  icon: string;
  padStart: string;
  padEnd: string;
  startInset: string;
  endInset: string;
  stepper: string;
  swatch: string;
};

const FIELD_SIZES: Record<InputSize, FieldSizeConfig> = {
  sm: {
    field: "h-8 text-sm",
    padX: "px-2.5",
    icon: "size-4",
    padStart: "pl-8",
    padEnd: "pr-8",
    startInset: "left-2.5",
    endInset: "right-2.5",
    stepper: "w-7",
    swatch: "size-5",
  },
  md: {
    field: "h-10 text-sm",
    padX: "px-3",
    icon: "size-[18px]",
    padStart: "pl-10",
    padEnd: "pr-10",
    startInset: "left-3",
    endInset: "right-3",
    stepper: "w-9",
    swatch: "size-6",
  },
  lg: {
    field: "h-12 text-base",
    padX: "px-4",
    icon: "size-5",
    padStart: "pl-11",
    padEnd: "pr-11",
    startInset: "left-3.5",
    endInset: "right-3.5",
    stepper: "w-11",
    swatch: "size-7",
  },
};

// Native text-like controls (input, textarea, select)
const FIELD_BASE = cn(
  "block min-w-0 rounded-lg border bg-input text-input-foreground",
  "placeholder:text-input-placeholder",
  "transition-[border-color,background-color,box-shadow] duration-200 ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-1",
  "disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-input-disabled disabled:text-input-disabled-foreground",
  "read-only:bg-input-readonly",
  "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
);

const fieldState = (invalid: boolean) =>
  invalid
    ? "border-error enabled:hover:border-error focus-visible:border-error focus-visible:outline-error"
    : "border-input-border enabled:hover:border-input-hover-border focus-visible:border-input-focus-border focus-visible:outline-ring";

// Composite controls (number, color): the wrapper owns border + focus ring
const SHELL_BASE = cn(
  "items-stretch overflow-hidden rounded-lg border bg-input text-input-foreground",
  "transition-[border-color,background-color,box-shadow] duration-200 ease-out",
  "focus-within:outline-2 focus-within:outline-offset-1",
);

const shellState = (
  invalid: boolean,
  disabled?: boolean,
  readOnly?: boolean,
) => {
  if (disabled) {
    return "cursor-not-allowed border-border-disabled bg-input-disabled text-input-disabled-foreground";
  }
  return cn(
    invalid
      ? "border-error hover:border-error focus-within:border-error focus-within:outline-error"
      : "border-input-border focus-within:border-input-focus-border focus-within:outline-ring",
    !invalid && !readOnly && "hover:border-input-hover-border",
    readOnly && "bg-input-readonly",
  );
};

const SHELL_INNER_INPUT = cn(
  "min-w-0 flex-1 border-0 bg-transparent text-inherit outline-none",
  "placeholder:text-input-placeholder focus-visible:outline-none",
  "disabled:cursor-not-allowed",
);

const STEPPER_BUTTON = cn(
  "inline-flex shrink-0 cursor-pointer items-center justify-center",
  "text-icon-button-foreground transition-colors duration-200",
  "hover:bg-icon-button-hover active:bg-icon-button-active",
  "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-icon-button-disabled",
);

const clamp = (n: number, min?: number, max?: number) => {
  let result = n;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
};

const decimalsOf = (n: number) => String(n).split(".")[1]?.length ?? 0;

const roundTo = (n: number, precision?: number) =>
  precision === undefined ? n : Number(n.toFixed(precision));

const formatNumber = (n: number | null, precision?: number) => {
  if (n === null) return "";
  return precision !== undefined ? n.toFixed(precision) : String(n);
};

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

const normalizeHex = (input: string): string | null => {
  const match = HEX_RE.exec(input.trim());
  if (!match) return null;
  let hex = match[1]!.toLowerCase();
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return `#${hex}`;
};

const matchesAccept = (file: File, accept?: string) => {
  if (!accept) return true;
  return accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .some((token) => {
      if (token.startsWith(".")) return file.name.toLowerCase().endsWith(token);
      if (token.endsWith("/*"))
        return file.type.toLowerCase().startsWith(token.slice(0, -1));
      return file.type.toLowerCase() === token;
    });
};

// ***************************** //
// SHARED PIECES //
// ***************************** //

const IconSlot = ({ node, size }: { node: React.ReactNode; size: string }) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center justify-center [&>svg]:size-full",
      size,
    )}
  >
    {node}
  </span>
);

// ***************************** //
// FIELD (label + hint + error) //
// ***************************** //

export type FieldProps = {
  label?: React.ReactNode;
  htmlFor?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  layout?: "stack" | "inline";
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
};

export function Field({
  label,
  htmlFor,
  hint,
  error,
  layout = "stack",
  className,
  labelClassName,
  children,
}: FieldProps) {
  const labelNode = label ? (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-foreground-secondary"
    >
      {label}
    </label>
  ) : null;

  const message = error ? (
    <p className="text-xs text-error">{error}</p>
  ) : hint ? (
    <p className="text-xs text-muted-foreground">{hint}</p>
  ) : null;

  if (layout === "inline") {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <div className="flex items-center justify-between gap-3">
          {labelNode && (
            <span className={`shrink-0 ${labelClassName}`}>{labelNode}</span>
          )}
          <div className="min-w-0">{children}</div>
        </div>
        {message}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {labelNode}
      {children}
      {message}
    </div>
  );
}
Field.displayName = "Field";

// ***************************** //
// TEXT INPUT (text, email, url, tel, password, search) //
// ***************************** //

export type TextInputType =
  | "text"
  | "email"
  | "url"
  | "tel"
  | "password"
  | "search";

export type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  type?: TextInputType;
  size?: InputSize;
  invalid?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export function TextInput({
  type = "text",
  size = "md",
  invalid = false,
  fullWidth = true,
  startIcon,
  endIcon,
  className,
  disabled,
  ...rest
}: TextInputProps) {
  const [visible, setVisible] = useState(false);
  const s = FIELD_SIZES[size];

  const isPassword = type === "password";
  const resolvedStart = startIcon ?? (type === "search" ? <LuSearch /> : null);
  const hasEnd = isPassword || !!endIcon;

  return (
    <div
      className={cn("relative", fullWidth ? "w-full" : "w-auto inline-block")}
    >
      {resolvedStart && (
        <span
          className={cn(
            "pointer-events-none absolute inset-y-0 flex items-center text-muted-foreground",
            s.startInset,
          )}
        >
          <IconSlot node={resolvedStart} size={s.icon} />
        </span>
      )}

      <input
        type={isPassword && visible ? "text" : type}
        disabled={disabled}
        className={cn(
          FIELD_BASE,
          "w-full",
          s.field,
          s.padX,
          fieldState(invalid),
          (resolvedStart as boolean) && s.padStart,
          hasEnd && s.padEnd,
          className,
        )}
        {...rest}
      />

      {isPassword ? (
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          onClick={() => setVisible((v) => !v)}
          className={cn(
            "absolute inset-y-0 flex cursor-pointer items-center text-icon-button-foreground",
            "transition-colors duration-200 hover:text-foreground",
            "disabled:cursor-not-allowed disabled:text-icon-button-disabled",
            s.endInset,
          )}
        >
          <IconSlot node={visible ? <LuEyeOff /> : <LuEye />} size={s.icon} />
        </button>
      ) : (
        endIcon && (
          <span
            className={cn(
              "pointer-events-none absolute inset-y-0 flex items-center text-muted-foreground",
              s.endInset,
            )}
          >
            <IconSlot node={endIcon} size={s.icon} />
          </span>
        )
      )}
    </div>
  );
}
TextInput.displayName = "TextInput";

// ***************************** //
// NUMBER INPUT (value, unit, stepper, clamp) //
// ***************************** //

// export type NumberInputProps = Omit<
//   React.InputHTMLAttributes<HTMLInputElement>,
//   | "size"
//   | "type"
//   | "value"
//   | "defaultValue"
//   | "onChange"
//   | "min"
//   | "max"
//   | "step"
// > & {
//   value: number | null;
//   onValueChange: (value: number | null) => void;
//   min?: number;
//   max?: number;
//   step?: number;
//   precision?: number;
//   unit?: string;
//   size?: InputSize;
//   invalid?: boolean;
//   fullWidth?: boolean;
//   hideStepper?: boolean;
// };

// /** `className` is applied to the root wrapper. */
// export function NumberInput({
//   value,
//   onValueChange,
//   min = 0,
//   max = 10,
//   step = 1,
//   precision = 2,
//   unit,
//   size = "md",
//   invalid = false,
//   fullWidth = true,
//   hideStepper = false,
//   disabled,
//   readOnly,
//   className,
//   onBlur,
//   onKeyDown,
//   ...rest
// }: NumberInputProps) {
//   const s = FIELD_SIZES[size];
//   const stepPrecision = precision ?? decimalsOf(step);
//   const [draft, setDraft] = useState(formatNumber(value, precision));

//   useEffect(() => {
//     setDraft(formatNumber(value, precision));
//   }, [value, precision]);

//   const commit = (text: string) => {
//     const trimmed = text.trim();

//     if (trimmed === "") {
//       onValueChange(null);
//       setDraft("");
//       return;
//     }

//     const parsed = Number(trimmed);
//     if (Number.isNaN(parsed)) {
//       setDraft(formatNumber(value, precision));
//       return;
//     }

//     const next = roundTo(clamp(parsed, min, max), precision);
//     onValueChange(next);
//     setDraft(formatNumber(next, precision));
//   };

//   const nudge = (direction: 1 | -1, multiplier = 1) => {
//     const base = value ?? min ?? 0;
//     const next = roundTo(
//       clamp(base + direction * step * multiplier, min, max),
//       stepPrecision,
//     );
//     onValueChange(next);
//     setDraft(formatNumber(next, precision));
//   };

//   const atMin = value !== null && min !== undefined && value <= min;
//   const atMax = value !== null && max !== undefined && value >= max;
//   const showStepper = !hideStepper && !readOnly;

//   return (
//     <div
//       className={cn(
//         SHELL_BASE,
//         fullWidth ? "flex w-full" : "inline-flex",
//         s.field,
//         shellState(invalid, disabled, readOnly),
//         className,
//       )}
//     >
//       {showStepper && (
//         <button
//           type="button"
//           tabIndex={-1}
//           disabled={disabled || atMin}
//           onClick={() => nudge(-1)}
//           className={cn(STEPPER_BUTTON, "border-r border-divider", s.stepper)}
//         >
//           <IconSlot node={<LuMinus />} size={s.icon} />
//         </button>
//       )}

//       <input
//         type="text"
//         inputMode="decimal"
//         value={draft}
//         disabled={disabled}
//         readOnly={readOnly}
//         onChange={(e) => setDraft(e.target.value)}
//         onBlur={(e) => {
//           commit(e.target.value);
//           onBlur?.(e);
//         }}
//         onKeyDown={(e) => {
//           onKeyDown?.(e);
//           if (e.defaultPrevented || readOnly) return;

//           if (e.key === "Enter") {
//             commit(draft);
//           } else if (e.key === "ArrowUp") {
//             e.preventDefault();
//             nudge(1, e.shiftKey ? 10 : 1);
//           } else if (e.key === "ArrowDown") {
//             e.preventDefault();
//             nudge(-1, e.shiftKey ? 10 : 1);
//           }
//         }}
//         className={cn(SHELL_INNER_INPUT, s.padX, showStepper && "text-center")}
//         {...rest}
//       />

//       {unit && (
//         <span
//           className={cn(
//             "flex shrink-0 select-none items-center pr-2.5 text-muted-foreground",
//             disabled && "text-input-disabled-foreground",
//           )}
//         >
//           {unit}
//         </span>
//       )}

//       {showStepper && (
//         <button
//           type="button"
//           tabIndex={-1}
//           disabled={disabled || atMax}
//           onClick={() => nudge(1)}
//           className={cn(STEPPER_BUTTON, "border-l border-divider", s.stepper)}
//         >
//           <IconSlot node={<LuPlus />} size={s.icon} />
//         </button>
//       )}
//     </div>
//   );
// }
// NumberInput.displayName = "NumberInput";
export type NumberInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | "size"
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "min"
  | "max"
  | "step"
> & {
  value: number | null;
  onValueChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  unit?: string;
  size?: InputSize;
  invalid?: boolean;
  fullWidth?: boolean;
  hideStepper?: boolean;
};

/** `className` is applied to the root wrapper. */
export function NumberInput({
  value,
  onValueChange,
  min = 0,
  max = 10,
  step = 1,
  precision = 2,
  unit,
  size = "md",
  invalid = false,
  fullWidth = true,
  hideStepper = false,
  disabled,
  readOnly,
  className,
  onBlur,
  onKeyDown,
  ...rest
}: NumberInputProps) {
  const s = FIELD_SIZES[size];

  const nudge = (direction: 1 | -1, multiplier = 1) => {
    const base = value ?? min ?? 0;
    const next = roundTo(
      clamp(base + direction * step * multiplier, min, max),
      precision,
    );
    onValueChange(next);
  };

  const atMin = value !== null && min !== undefined && value <= min;
  const atMax = value !== null && max !== undefined && value >= max;
  const showStepper = !hideStepper && !readOnly;

  return (
    <div
      className={cn(
        SHELL_BASE,
        fullWidth ? "flex w-full" : "inline-flex",
        s.field,
        shellState(invalid, disabled, readOnly),
        className,
      )}
    >
      {showStepper && (
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled || atMin}
          onClick={() => nudge(-1)}
          className={cn(STEPPER_BUTTON, "border-r border-divider", s.stepper)}
        >
          <IconSlot node={<LuMinus />} size={s.icon} />
        </button>
      )}

      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value ?? ""}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(e) => {
          const text = e.target.value;
          onValueChange(text === "" ? null : Number(text));
        }}
        onBlur={(e) => {
          if (value !== null) {
            const next = roundTo(clamp(value, min, max), precision);
            if (next !== value) onValueChange(next);
          }
          onBlur?.(e);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented || readOnly) return;

          if (e.key === "ArrowUp") {
            e.preventDefault();
            nudge(1, e.shiftKey ? 10 : 1);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            nudge(-1, e.shiftKey ? 10 : 1);
          }
        }}
        className={cn(
          SHELL_INNER_INPUT,
          s.padX,
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          showStepper && "text-center",
        )}
        {...rest}
      />

      {unit && (
        <span
          className={cn(
            "flex shrink-0 select-none items-center pr-2.5 text-muted-foreground",
            disabled && "text-input-disabled-foreground",
          )}
        >
          {unit}
        </span>
      )}

      {showStepper && (
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled || atMax}
          onClick={() => nudge(1)}
          className={cn(STEPPER_BUTTON, "border-l border-divider", s.stepper)}
        >
          <IconSlot node={<LuPlus />} size={s.icon} />
        </button>
      )}
    </div>
  );
}
NumberInput.displayName = "NumberInput";

// ***************************** //
// TEXT AREA //
// ***************************** //

const TEXTAREA_SIZES: Record<InputSize, string> = {
  sm: "min-h-16 px-2.5 py-1.5 text-sm",
  md: "min-h-20 px-3 py-2 text-sm",
  lg: "min-h-24 px-4 py-2.5 text-base",
};

const TEXTAREA_RESIZE = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
} as const;

export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    size?: InputSize;
    invalid?: boolean;
    fullWidth?: boolean;
    resize?: keyof typeof TEXTAREA_RESIZE;
  };

export function TextArea({
  size = "md",
  invalid = false,
  fullWidth = true,
  resize = "vertical",
  className,
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      className={cn(
        FIELD_BASE,
        fullWidth ? "w-full" : "w-auto",
        TEXTAREA_SIZES[size],
        TEXTAREA_RESIZE[resize],
        fieldState(invalid),
        className,
      )}
      {...rest}
    />
  );
}
TextArea.displayName = "TextArea";

// ***************************** //
// SELECT //
// ***************************** //

export type SelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  size?: InputSize;
  invalid?: boolean;
  fullWidth?: boolean;
  options?: SelectOption[];
};

export function Select({
  size = "md",
  invalid = false,
  fullWidth = true,
  options,
  children,
  className,
  disabled,
  ...rest
}: SelectProps) {
  const s = FIELD_SIZES[size];

  return (
    <div
      className={cn("relative", fullWidth ? "w-full" : "inline-block w-auto")}
    >
      <select
        disabled={disabled}
        className={cn(
          FIELD_BASE,
          "w-full cursor-pointer appearance-none truncate disabled:cursor-not-allowed",
          "[&>option]:bg-popover [&>option]:text-foreground",
          s.field,
          s.padX,
          s.padEnd,
          fieldState(invalid),
          className,
        )}
        {...rest}
      >
        {options
          ? options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))
          : children}
      </select>

      <span
        className={cn(
          "pointer-events-none absolute inset-y-0 flex items-center",
          disabled ? "text-input-disabled-foreground" : "text-muted-foreground",
          s.endInset,
        )}
      >
        <IconSlot node={<LuChevronDown />} size={s.icon} />
      </span>
    </div>
  );
}
Select.displayName = "Select";

// ***************************** //
// CHECKBOX / RADIO / SWITCH //
// ***************************** //

const CONTROL_SIZES: Record<
  InputSize,
  { box: string; mark: string; dot: string; text: string }
> = {
  sm: { box: "size-4", mark: "size-3", dot: "size-1.5", text: "text-sm" },
  md: { box: "size-[18px]", mark: "size-3.5", dot: "size-2", text: "text-sm" },
  lg: { box: "size-5", mark: "size-4", dot: "size-2.5", text: "text-base" },
};

type ControlLabelProps = {
  size: InputSize;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  reverse?: boolean;
  className?: string;
  children: React.ReactNode;
};

function ControlLabel({
  size,
  disabled,
  label,
  description,
  reverse,
  className,
  children,
}: ControlLabelProps) {
  const hasText = label !== undefined && label !== null && label !== false;

  return (
    <label
      className={cn(
        "inline-flex select-none gap-2.5",
        description ? "items-start" : "items-center",
        reverse && "flex-row-reverse",
        disabled
          ? "cursor-not-allowed text-disabled-foreground"
          : "cursor-pointer text-foreground",
        className,
      )}
    >
      {children}
      {(hasText || description) && (
        <span className="flex min-w-0 flex-col">
          {hasText && (
            <span className={cn("leading-normal", CONTROL_SIZES[size].text)}>
              {label}
            </span>
          )}
          {description && (
            <span
              className={cn(
                "text-xs",
                disabled ? "text-disabled-foreground" : "text-muted-foreground",
              )}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}

type ToggleControlProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "children"
> & {
  size?: InputSize;
  label?: React.ReactNode;
  description?: React.ReactNode;
};

/* ---------- Checkbox ---------- */

export type CheckboxProps = ToggleControlProps & {
  indeterminate?: boolean;
};

/** `className` is applied to the root <label>. */
export function Checkbox({
  size = "md",
  label,
  description,
  indeterminate = false,
  className,
  disabled,
  ...rest
}: CheckboxProps) {
  const c = CONTROL_SIZES[size];
  const markClass = cn(
    "pointer-events-none absolute inset-0 m-auto text-control-checked-foreground",
    "peer-disabled:text-disabled-foreground",
    c.mark,
  );

  return (
    <ControlLabel
      size={size}
      disabled={disabled}
      label={label}
      description={description}
      className={className}
    >
      <span
        className={cn(
          "relative inline-flex shrink-0",
          description && "mt-0.5",
          c.box,
        )}
      >
        <input
          type="checkbox"
          disabled={disabled}
          className={cn(
            "peer m-0 cursor-pointer appearance-none rounded border bg-control",
            "border-control-border transition-colors duration-200",
            "enabled:hover:bg-control-hover",
            "checked:border-control-checked checked:bg-control-checked enabled:checked:hover:bg-control-checked",
            "disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-control-disabled",
            indeterminate &&
              "border-control-checked bg-control-checked enabled:hover:bg-control-checked",
            c.box,
          )}
          {...rest}
        />
        {indeterminate ? (
          <LuMinus className={markClass} />
        ) : (
          <LuCheck
            className={cn(
              markClass,
              "opacity-0 transition-opacity duration-150 peer-checked:opacity-100",
            )}
          />
        )}
      </span>
    </ControlLabel>
  );
}
Checkbox.displayName = "Checkbox";

/* ---------- Radio ---------- */

export type RadioProps = ToggleControlProps;

/** `className` is applied to the root <label>. */
export function Radio({
  size = "md",
  label,
  description,
  className,
  disabled,
  ...rest
}: RadioProps) {
  const c = CONTROL_SIZES[size];

  return (
    <ControlLabel
      size={size}
      disabled={disabled}
      label={label}
      description={description}
      className={className}
    >
      <span
        className={cn(
          "relative inline-flex shrink-0",
          description && "mt-0.5",
          c.box,
        )}
      >
        <input
          type="radio"
          disabled={disabled}
          className={cn(
            "peer m-0 cursor-pointer appearance-none rounded-full border bg-control",
            "border-control-border transition-colors duration-200",
            "enabled:hover:bg-control-hover",
            "checked:border-control-checked",
            "disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-control-disabled",
            c.box,
          )}
          {...rest}
        />
        <span
          className={cn(
            "pointer-events-none absolute inset-0 m-auto scale-50 rounded-full bg-control-checked opacity-0",
            "transition-[opacity,transform] duration-150",
            "peer-checked:scale-100 peer-checked:opacity-100",
            "peer-disabled:bg-disabled-foreground",
            c.dot,
          )}
        />
      </span>
    </ControlLabel>
  );
}
Radio.displayName = "Radio";

/* ---------- Radio group ---------- */

export type RadioGroupOption = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name: string;
  options: RadioGroupOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: InputSize;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
};

export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  disabled,
  orientation = "vertical",
  className,
}: RadioGroupProps) {
  const controlled = value !== undefined;

  return (
    <div
      className={cn(
        "flex gap-x-5 gap-y-2.5",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          size={size}
          label={option.label}
          description={option.description}
          disabled={disabled || option.disabled}
          {...(controlled
            ? { checked: value === option.value }
            : { defaultChecked: defaultValue === option.value })}
          onChange={() => onValueChange?.(option.value)}
        />
      ))}
    </div>
  );
}
RadioGroup.displayName = "RadioGroup";

/* ---------- Switch ---------- */

const SWITCH_SIZES: Record<InputSize, string> = {
  sm: "h-4 w-7 after:size-3 peer-checked:after:translate-x-3",
  md: "h-5 w-9 after:size-4 peer-checked:after:translate-x-4",
  lg: "h-6 w-11 after:size-5 peer-checked:after:translate-x-5",
};

export type SwitchProps = ToggleControlProps & {
  labelPosition?: "left" | "right";
};

/** `className` is applied to the root <label>. */
export function Switch({
  size = "md",
  label,
  description,
  labelPosition = "right",
  className,
  disabled,
  ...rest
}: SwitchProps) {
  return (
    <ControlLabel
      size={size}
      disabled={disabled}
      label={label}
      description={description}
      reverse={labelPosition === "left"}
      className={className}
    >
      <span
        className={cn("relative inline-flex shrink-0", description && "mt-0.5")}
      >
        <input
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...rest}
        />
        <span
          className={cn(
            "relative shrink-0 rounded-full bg-toggle-track transition-colors duration-200 ease-out",
            "hover:bg-toggle-track-hover",
            "after:absolute after:left-0.5 after:top-0.5 after:rounded-full after:bg-toggle-thumb",
            "after:shadow-sm after:transition-transform after:duration-200 after:content-['']",
            "peer-checked:bg-toggle-track-checked peer-checked:hover:bg-toggle-track-checked",
            "peer-disabled:bg-toggle-disabled peer-disabled:hover:bg-toggle-disabled",
            "peer-disabled:peer-checked:bg-toggle-track-checked peer-disabled:peer-checked:opacity-50",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
            SWITCH_SIZES[size],
          )}
        />
      </span>
    </ControlLabel>
  );
}
Switch.displayName = "Switch";

// ***************************** //
// SLIDER //
// ***************************** //

const SLIDER_SIZES: Record<InputSize, string> = {
  sm: "h-4 [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:-mt-[3px] [&::-moz-range-thumb]:size-3",
  md: "h-5 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:-mt-[5px] [&::-moz-range-thumb]:size-4",
  lg: "h-6 [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:-mt-[7px] [&::-moz-range-thumb]:size-5",
};

const SLIDER_TRACK = cn(
  "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full",
  "[&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--slider-range)_var(--pct),var(--slider-track)_var(--pct))]",
  "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full",
  "[&::-moz-range-track]:bg-[linear-gradient(to_right,var(--slider-range)_var(--pct),var(--slider-track)_var(--pct))]",
);

const SLIDER_THUMB = cn(
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slider-thumb-border",
  "[&::-webkit-slider-thumb]:bg-slider-thumb [&::-webkit-slider-thumb]:shadow-sm",
  "[&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:duration-200",
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-solid",
  "[&::-moz-range-thumb]:border-slider-thumb-border [&::-moz-range-thumb]:bg-slider-thumb",
  "focus-visible:[&::-webkit-slider-thumb]:border-slider-thumb-focus",
  "focus-visible:[&::-webkit-slider-thumb]:shadow-[var(--focus-shadow)]",
  "focus-visible:[&::-moz-range-thumb]:border-slider-thumb-focus",
  "focus-visible:[&::-moz-range-thumb]:shadow-[var(--focus-shadow)]",
);

export type SliderProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  size?: InputSize;
  fullWidth?: boolean;
};

export function Slider({
  size = "md",
  fullWidth = true,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  className,
  style,
  ...rest
}: SliderProps) {
  const [inner, setInner] = useState(Number(defaultValue ?? min));

  const minNum = Number(min);
  const maxNum = Number(max);
  const current = value !== undefined ? Number(value) : inner;
  const pct =
    maxNum === minNum
      ? 0
      : Math.min(
          100,
          Math.max(0, ((current - minNum) / (maxNum - minNum)) * 100),
        );

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      {...(value !== undefined ? { value } : { defaultValue })}
      onChange={(e) => {
        setInner(Number(e.target.value));
        onChange?.(e);
      }}
      style={{ ...style, "--pct": `${pct}%` } as React.CSSProperties}
      className={cn(
        "m-0 cursor-pointer appearance-none bg-transparent outline-none focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        fullWidth ? "w-full" : "w-auto",
        SLIDER_SIZES[size],
        SLIDER_TRACK,
        SLIDER_THUMB,
        className,
      )}
      {...rest}
    />
  );
}
Slider.displayName = "Slider";

// ***************************** //
// COLOR INPUT (swatch + hex) //
// ***************************** //

export type ColorInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  id?: string;
  size?: InputSize;
  invalid?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  swatchOnly?: boolean;
  className?: string;
};

export function ColorInput({
  id,
  value,
  onValueChange,
  size = "md",
  invalid = false,
  disabled,
  fullWidth = true,
  swatchOnly = false,
  className,
}: ColorInputProps) {
  const s = FIELD_SIZES[size];
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commit = (text: string) => {
    const normalized = normalizeHex(text);
    if (normalized === null) {
      setDraft(value);
      return;
    }
    setDraft(normalized);
    if (normalized !== value) onValueChange(normalized);
  };

  return (
    <div
      className={cn(
        SHELL_BASE,
        fullWidth && !swatchOnly ? "flex w-full" : "inline-flex",
        s.field,
        shellState(invalid, disabled),
        className,
      )}
    >
      <span
        className={cn(
          "relative my-auto shrink-0 overflow-hidden rounded-md",
          swatchOnly ? "mx-1.5" : "ml-1.5",
          s.swatch,
          disabled && "opacity-50",
        )}
      >
        <input
          id={id}
          type="color"
          value={normalizeHex(value) ?? "#000000"}
          disabled={disabled}
          onChange={(e) => onValueChange(e.target.value)}
          className={cn(
            "absolute left-1/2 top-1/2 size-[200%] -translate-x-1/2 -translate-y-1/2",
            "m-0 cursor-pointer appearance-none border-0 bg-transparent p-0 outline-none",
            "disabled:cursor-not-allowed",
            "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0",
            "[&::-moz-color-swatch]:border-0",
          )}
        />
      </span>

      {!swatchOnly && (
        <input
          id={id}
          type="text"
          value={draft}
          disabled={disabled}
          maxLength={7}
          spellCheck={false}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit(draft);
          }}
          className={cn(SHELL_INNER_INPUT, "uppercase", s.padX)}
        />
      )}
    </div>
  );
}
ColorInput.displayName = "ColorInput";

// ***************************** //
// FILE DROPZONE //
// ***************************** //

export type FileDropzoneProps = {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function FileDropzone({
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  invalid = false,
  className,
  children,
}: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);

  const emit = (files: File[]) => {
    const accepted = files.filter((f) => matchesAccept(f, accept));
    if (accepted.length === 0) return;
    onFiles(multiple ? accepted : accepted.slice(0, 1));
  };

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) emit(Array.from(e.dataTransfer.files));
      }}
      className={cn(
        "flex w-full select-none flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed",
        "px-6 py-8 text-center transition-[background-color,border-color] duration-200 ease-out",
        disabled
          ? "cursor-not-allowed border-border-disabled bg-input-disabled text-input-disabled-foreground"
          : cn(
              "cursor-pointer text-foreground-secondary",
              invalid
                ? "border-error-border bg-dropzone-invalid"
                : dragging
                  ? "border-dropzone-border bg-dropzone-hover"
                  : "border-border-strong bg-dropzone hover:border-dropzone-border hover:bg-dropzone-hover",
            ),
        className,
      )}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          emit(files);
        }}
      />
      <span className="pointer-events-none flex flex-col items-center gap-2">
        {children ?? (
          <>
            <IconSlot node={<LuUpload />} size="size-6" />
            <span className="text-sm">Drop a file here or click to browse</span>
          </>
        )}
      </span>
    </label>
  );
}
FileDropzone.displayName = "FileDropzone";

// ***************************** //
// NAMESPACE EXPORT //
// ***************************** //

export const Input = {
  Field,
  Text: TextInput,
  Number: NumberInput,
  TextArea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  Color: ColorInput,
  File: FileDropzone,
};
