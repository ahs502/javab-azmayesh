(function(global) {

    global.ValidationSystem = ValidationSystem;

    ValidationSystem.validators = {
        notEmpty: notEmptyValidator,
        nationalCode: nationalCodeValidator,
        numberCode: numberCodeValidator,
    };

    function ValidationSystem(scope) {

        var fields = {};

        this.field = field;
        this.error = error;
        this.clear = clear;
        this.check = check;
        this.validate = validate;
        this.status = status;

        function field(fieldName, validators) {
            fields[fieldName] = {
                validators: [].concat(validators),
                error: null
            };
            return this;
        }

        function error(fieldName, errorMessage) {
            if (arguments.length === 1)
                return (fields[fieldName] || {}).error || null;
            else if (arguments.length === 2)
                return (fields[fieldName] || {}).error = errorMessage || null;
        }

        function clear() {
            fieldNames(arguments).forEach(function(fieldName) {
                fields[fieldName].error = null;
            });
        }

        function check() {
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                if (!run(fieldName, fieldData.validators)) {
                    fieldData.error = null;
                }
            });
        }

        function validate() {
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                fieldData.error = run(fieldName, fieldData.validators);
            });
        }

        function status() {
            var allFieldNames = Object.keys(fields);
            for (var i = 0; i < allFieldNames.length; i++) {
                if (fields[allFieldNames[i]].error) return false;
            }
            return true;
        }

        function fieldNames(fieldNamesArguments) {
            var allFieldNames = Object.keys(fields);
            if (fieldNamesArguments.length) {
                return Array.from(fieldNamesArguments)
                    .filter(function(fieldName) {
                        return allFieldNames.indexOf(fieldName) >= 0;
                    });
            }
            return allFieldNames;
        }

        function run(fieldName, validators) {
            if (!validators) return null;
            var value = scope[fieldName];
            for (var i = 0; i < validators.length; i++) {
                var res = validators[i](value);
                if (res === true) break;
                if (res) return res;
            }
            return null;
        }

    }

    function notEmptyValidator(message) {
        message = message || 'پُر کردن این فیلد الزامی است';
        return function(value) {
            return value ? null : message;
        };
    }

    function nationalCodeValidator(message) {
        message = message || 'کد ملی صحیح نمی باشد';
        return function(value) {
            return /^[0-9]{10}$/.test(value) ? null : message;
        };
    }

    function numberCodeValidator(length, message) {
        message = message || 'کد وارد شده صحیح نمی باشد';
        return function(value) {
            return String(value).length === length && /^[0-9]+$/.test(value) ? null : message;
        };
    }

})(global);