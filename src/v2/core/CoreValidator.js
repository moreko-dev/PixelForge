// CoreValidator.js

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatValue(value) {
  if (typeof value === "string") {
    return `"${value}"`;
  }

  if (value === null) {
    return "null";
  }

  if (value === undefined) {
    return "undefined";
  }

  if (typeof value === "symbol") {
    return value.toString();
  }

  if (typeof value === "bigint") {
    return `${value}n`;
  }

  try {
    return String(value);
  } catch {
    return "<unprintable>";
  }
}

function formatType(value) {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return "array";
  }

  return typeof value;
}

function failType(label, expected, value) {
  throw new TypeError(
    `${label} must be ${expected} -> [` +
      `${formatValue(value)} : ${formatType(value)}]`,
  );
}

function failRange(label, value, range) {
  throw new RangeError(
    `${label} is out of range -> [` + `${formatValue(value)} : ${range}]`,
  );
}

/* -------------------------------------------------------------------------- */
/* Boolean                                                                    */
/* -------------------------------------------------------------------------- */

export function checkBooleanOrThrow(value, label = "Value") {
  if (typeof value === "boolean") {
    return true;
  }

  failType(label, "a boolean", value);
}

export function checkBooleanOrNullableOrThrow(value, label = "Value") {
  if (value === null || typeof value === "boolean") {
    return true;
  }

  failType(label, "a boolean or null", value);
}

export function checkBooleanOrUndefinedOrThrow(value, label = "Value") {
  if (value === undefined || typeof value === "boolean") {
    return true;
  }

  failType(label, "a boolean or undefined", value);
}

export function checkBooleanOrNullableOrUndefinedOrThrow(
  value,
  label = "Value",
) {
  if (value === null || value === undefined || typeof value === "boolean") {
    return true;
  }

  failType(label, "a boolean, null, or undefined", value);
}

/* -------------------------------------------------------------------------- */
/* String                                                                      */
/* -------------------------------------------------------------------------- */

export function checkStringOrThrow(value, label = "Value") {
  if (typeof value === "string") {
    return true;
  }

  failType(label, "a string", value);
}

export function checkNonEmptyStringOrThrow(value, label = "Value") {
  checkStringOrThrow(value, label);

  if (value.trim().length > 0) {
    return true;
  }

  throw new TypeError(`${label} must not be an empty string`);
}

export function checkStringOrNullableOrThrow(value, label = "Value") {
  if (typeof value === "string" || value === null) {
    return true;
  }

  failType(label, "a string or null", value);
}

export function checkStringOrUndefinedOrThrow(value, label = "Value") {
  if (typeof value === "string" || value === undefined) {
    return true;
  }

  failType(label, "a string or undefined", value);
}

export function checkStringOrNullableOrUndefinedOrThrow(
  value,
  label = "Value",
) {
  if (typeof value === "string" || value === null || value === undefined) {
    return true;
  }

  failType(label, "a string, null, or undefined", value);
}

/* -------------------------------------------------------------------------- */
/* Number                                                                      */
/* -------------------------------------------------------------------------- */

export function checkNumberOrThrow(value, label = "Value") {
  if (typeof value === "number") {
    return true;
  }

  failType(label, "a number", value);
}

export function checkFiniteNumberOrThrow(value, label = "Value") {
  if (typeof value === "number" && Number.isFinite(value)) {
    return true;
  }

  failType(label, "a finite number", value);
}

export function checkNumberOrNullableOrThrow(value, label = "Value") {
  if (value === null || typeof value === "number") {
    return true;
  }

  failType(label, "a number or null", value);
}

export function checkFiniteNumberOrNullableOrThrow(value, label = "Value") {
  if (value === null) {
    return true;
  }

  return checkFiniteNumberOrThrow(value, label);
}

/* -------------------------------------------------------------------------- */
/* Integer                                                                     */
/* -------------------------------------------------------------------------- */

export function checkIntegerOrThrow(value, label = "Value") {
  if (Number.isInteger(value)) {
    return true;
  }

  failType(label, "an integer", value);
}

export function checkPositiveIntegerOrThrow(value, label = "Value") {
  if (Number.isInteger(value) && value > 0) {
    return true;
  }

  failRange(label, value, "1 - ~");
}

export function checkNonNegativeIntegerOrThrow(value, label = "Value") {
  if (Number.isInteger(value) && value >= 0) {
    return true;
  }

  failRange(label, value, "0 - ~");
}

export function checkIntegerOrNullableOrThrow(value, label = "Value") {
  if (value === null) {
    return true;
  }

  return checkIntegerOrThrow(value, label);
}

/* -------------------------------------------------------------------------- */
/* Positive / non-negative numbers                                             */
/* -------------------------------------------------------------------------- */

export function checkPositiveNumberOrThrow(value, label = "Value") {
  checkFiniteNumberOrThrow(value, label);

  if (value > 0) {
    return true;
  }

  throw new RangeError(
    `${label} must be a positive number -> [` +
      `${formatValue(value)} : 0 - ~]`,
  );
}

export function checkNonNegativeNumberOrThrow(value, label = "Value") {
  checkFiniteNumberOrThrow(value, label);

  if (value >= 0) {
    return true;
  }

  throw new RangeError(
    `${label} must be a non-negative number -> [` +
      `${formatValue(value)} : 0 - ~]`,
  );
}

export function checkNegativeNumberOrThrow(value, label = "Value") {
  checkFiniteNumberOrThrow(value, label);

  if (value < 0) {
    return true;
  }

  throw new RangeError(
    `${label} must be a negative number -> [` +
      `${formatValue(value)} : ~ - 0]`,
  );
}

/* -------------------------------------------------------------------------- */
/* Range                                                                       */
/* -------------------------------------------------------------------------- */

export function checkNumberInRangeOrThrow(value, min, max, label = "Value") {
  checkFiniteNumberOrThrow(value, label);

  if (value >= min && value <= max) {
    return true;
  }

  throw new RangeError(
    `${label} must be between ${min} and ${max} -> [` +
      `${formatValue(value)}]`,
  );
}

export function checkNumberInExclusiveRangeOrThrow(
  value,
  min,
  max,
  label = "Value",
) {
  checkFiniteNumberOrThrow(value, label);

  if (value > min && value < max) {
    return true;
  }

  throw new RangeError(
    `${label} must be greater than ${min} and less than ${max} -> [` +
      `${formatValue(value)}]`,
  );
}

export function checkIntegerInRangeOrThrow(value, min, max, label = "Value") {
  checkIntegerOrThrow(value, label);

  if (value >= min && value <= max) {
    return true;
  }

  throw new RangeError(
    `${label} must be an integer between ${min} and ${max} -> [` +
      `${formatValue(value)}]`,
  );
}

/* -------------------------------------------------------------------------- */
/* Array                                                                       */
/* -------------------------------------------------------------------------- */

export function checkArrayOrThrow(value, label = "Value") {
  if (Array.isArray(value)) {
    return true;
  }

  failType(label, "an array", value);
}

export function checkArrayOrNullableOrThrow(value, label = "Value") {
  if (value === null || Array.isArray(value)) {
    return true;
  }

  failType(label, "an array or null", value);
}

export function checkNonEmptyArrayOrThrow(value, label = "Value") {
  checkArrayOrThrow(value, label);

  if (value.length > 0) {
    return true;
  }

  throw new RangeError(`${label} must not be empty`);
}

/* -------------------------------------------------------------------------- */
/* Object                                                                      */
/* -------------------------------------------------------------------------- */

export function checkObjectOrThrow(value, label = "Value") {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return true;
  }

  failType(label, "an object", value);
}

export function checkObjectOrNullableOrThrow(value, label = "Value") {
  if (value === null) {
    return true;
  }

  return checkObjectOrThrow(value, label);
}

export function checkPlainObjectOrThrow(value, label = "Value") {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    const prototype = Object.getPrototypeOf(value);

    if (prototype === Object.prototype || prototype === null) {
      return true;
    }
  }

  failType(label, "a plain object", value);
}

/* -------------------------------------------------------------------------- */
/* Function                                                                    */
/* -------------------------------------------------------------------------- */

export function checkFunctionOrThrow(value, label = "Value") {
  if (typeof value === "function") {
    return true;
  }

  failType(label, "a function", value);
}

export function checkFunctionOrNullableOrThrow(value, label = "Value") {
  if (value === null || typeof value === "function") {
    return true;
  }

  failType(label, "a function or null", value);
}

/* -------------------------------------------------------------------------- */
/* Undefined / null                                                            */
/* -------------------------------------------------------------------------- */

export function checkNullOrThrow(value, label = "Value") {
  if (value === null) {
    return true;
  }

  failType(label, "null", value);
}

export function checkUndefinedOrThrow(value, label = "Value") {
  if (value === undefined) {
    return true;
  }

  failType(label, "undefined", value);
}

export function checkNullableOrThrow(value, label = "Value") {
  if (value === null || value === undefined) {
    return true;
  }

  throw new TypeError(
    `${label} must be null or undefined -> [` +
      `${formatValue(value)} : ${formatType(value)}]`,
  );
}

/* -------------------------------------------------------------------------- */
/* Instance                                                                    */
/* -------------------------------------------------------------------------- */

export function checkInstanceOfOrThrow(value, type, label = "Value") {
  if (typeof type !== "function") {
    throw new TypeError("The provided type must be a constructor/function");
  }

  if (value instanceof type) {
    return true;
  }

  throw new TypeError(
    `${label} is not an instance of ${type.name || "provided type"} -> [` +
      `${formatValue(value)}]`,
  );
}

export function checkInstanceOfOrNullableOrThrow(value, type, label = "Value") {
  if (value === null) {
    return true;
  }

  return checkInstanceOfOrThrow(value, type, label);
}

export function checkInstanceOfOrUndefinedOrThrow(
  value,
  type,
  label = "Value",
) {
  if (value === undefined) {
    return true;
  }

  return checkInstanceOfOrThrow(value, type, label);
}

/* -------------------------------------------------------------------------- */
/* Hex colors                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Supports:
 *
 * #RGB
 * #RGBA
 * #RRGGBB
 * #RRGGBBAA
 *
 * Examples:
 * #fff
 * #ffffff
 * #ffffff80
 */
export function checkHexaCodeOrThrow(value, label = "Value") {
  checkNonEmptyStringOrThrow(value, label);

  const HEX_COLOR_REGEX =
    /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

  if (HEX_COLOR_REGEX.test(value)) {
    return true;
  }

  throw new TypeError(
    `${label} is not a valid hexadecimal color -> [` + `${formatValue(value)}]`,
  );
}

/* -------------------------------------------------------------------------- */
/* RGB / RGBA                                                                  */
/* -------------------------------------------------------------------------- */

export function checkRgbChannelOrThrow(value, label = "RGB channel") {
  return checkIntegerInRangeOrThrow(value, 0, 255, label);
}

export function checkAlphaOrThrow(value, label = "Alpha") {
  return checkNumberInRangeOrThrow(value, 0, 1, label);
}

/* -------------------------------------------------------------------------- */
/* Common graphics-engine validators                                           */
/* -------------------------------------------------------------------------- */

export function checkOpacityOrThrow(value, label = "Opacity") {
  return checkNumberInRangeOrThrow(value, 0, 1, label);
}

export function checkScaleOrThrow(value, label = "Scale") {
  return checkPositiveNumberOrThrow(value, label);
}

export function checkAngleOrThrow(value, label = "Angle") {
  return checkFiniteNumberOrThrow(value, label);
}

export function checkDimensionOrThrow(value, label = "Dimension") {
  return checkNonNegativeNumberOrThrow(value, label);
}

export function checkCoordinateOrThrow(value, label = "Coordinate") {
  return checkFiniteNumberOrThrow(value, label);
}

/* -------------------------------------------------------------------------- */
/* Enum / allowed values                                                       */
/* -------------------------------------------------------------------------- */

export function checkOneOfOrThrow(value, allowedValues, label = "Value") {
  if (!Array.isArray(allowedValues)) {
    throw new TypeError("allowedValues must be an array");
  }

  if (allowedValues.includes(value)) {
    return true;
  }

  throw new TypeError(
    `${label} contains an invalid value -> [` +
      `${formatValue(value)}]. Expected one of: ` +
      `${allowedValues.map(formatValue).join(", ")}`,
  );
}

/* -------------------------------------------------------------------------- */
/* Property existence                                                         */
/* -------------------------------------------------------------------------- */

export function checkPropertyExistsOrThrow(object, property, label = "Object") {
  checkObjectOrThrow(object, label);

  if (property in object) {
    return true;
  }

  throw new TypeError(`${label} does not contain property "${property}"`);
}

/* -------------------------------------------------------------------------- */
/* DOM / Canvas                                                                */
/* -------------------------------------------------------------------------- */

export function checkHTMLElementOrThrow(value, label = "Value") {
  if (typeof HTMLElement !== "undefined" && value instanceof HTMLElement) {
    return true;
  }

  failType(label, "an HTMLElement", value);
}

export function checkHTMLCanvasElementOrThrow(value, label = "Value") {
  if (
    typeof HTMLCanvasElement !== "undefined" &&
    value instanceof HTMLCanvasElement
  ) {
    return true;
  }

  failType(label, "an HTMLCanvasElement", value);
}

export function checkCanvasRenderingContext2DOrThrow(value, label = "Value") {
  if (
    typeof CanvasRenderingContext2D !== "undefined" &&
    value instanceof CanvasRenderingContext2D
  ) {
    return true;
  }

  failType(label, "a CanvasRenderingContext2D", value);
}
