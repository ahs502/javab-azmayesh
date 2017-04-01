global.Validator = Validator;

function Validator(scope) {
    var validity = true,
        errors = {};

    this.field = field;
    this.isValid = isValid;
    this.getErrors = getErrors;

    function field(fieldName, value, validators) {
        if (arguments.length === 2) {
            validators = value;
            value = scope[fieldName];
        }
        for (let i = 0; i < validators.length; i++) {
            let res = validators[i](value);
            if (res === true) break;
            if (res) {
                validity = false;
                errors[fieldName] = res;
                break;
            }
        }
        return this;
    }

    function isValid() {
        return validity;
    }

    function getErrors() {
        return errors;
    }
}