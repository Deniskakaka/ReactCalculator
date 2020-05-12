export function answearDesicion (string) {
    return string.includes("=")
}

export function cut (string) {
    if (string.slice(0, 1).includes("0")) {
        return eval(string.slice(1))
    } else {
        return eval(string)
    }
}