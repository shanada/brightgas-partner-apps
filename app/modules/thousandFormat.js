export function thousandFormat(value) {
    let output = value
    if (parseFloat(value)) {
        value = new String(value);
        let parts = value.split(".");
        parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1.").split("").reverse().join("");
        output = parts.join(".");
    }
    return (output);
}