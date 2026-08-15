export function checkNegativeValueOrThrow(value, label = "Value") {
    if (typeof value === "number" && value > 0) {
        return true;
    }
    throw new Error(`${label} is invalid or negative -> [${value}]`);
}

export function checkValidStringOrThrow(value, label) {
    if (typeof value === "string" && value.trim()) {
        return true;
    }
    throw new Error(`${label} is invalid -> [${value}]`);
}

export function checkInstanceOfOrThrow(value, type, label) {
    if (value instanceof type) {
        return true;
    }
    throw new Error(
        `${label} is invalid type -> [${value.name} -> ${type.name}]`,
    );
}

export function checkTypeOfOrThrow(value, type, label) {
    if (typeof value === type) {
        return true;
    }
    throw new Error(`${label} is invalid type -> [${typeof value} -> ${type}]`);
}
