var validators = {
    nationalCode,
    numberCode,
};

module.exports = validators;

function nationalCode(value) {
    return /^[0-9]{10}$/.test(value);
}

function numberCode(value, length) {
    return String(value).length === length && /^[0-9]+$/.test(value);
}
