/*global toPersianNumber*/

(function(global) {

    global.ValidationSystem = ValidationSystem;

    ////////////////////////////////////////////////////////////////////////////

    function ValidationSystem(scope) {

        var fields = {};

        this.field = field; // Define a new field => this (so you could chain them)
        this.error = error; // Get/Set error message for a field => field's error message
        this.clear = clear; // Clear some or all error messages => nothing!
        this.see = see; // Checks some or all fields validity status without updating (setting/removing) any error messages => summary of those fields validity
        this.check = check; // Checks some or all fields validity status and tries to remove their error messages if possible => summary of those fields validity
        this.validate = validate; // Checks some or all fields validity status and updates their error messages => summary of those fields validity
        this.status = status; // Summarize some of all fields validity status without checking or updating their error messages => summary of those fields validity
        this.dictate = dictate; // Forces all fields error messages according to the errors object provided => nothing!

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

        function see() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                if (run(fieldName, fieldData.validators)) valid = false;
            });
            return valid;
        }

        function check() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                fieldData.error = fieldData.error && run(fieldName, fieldData.validators);
                if (fieldData.error) valid = false;
            });
            return valid;
        }

        function validate() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                fieldData.error = run(fieldName, fieldData.validators);
                if (fieldData.error) valid = false;
            });
            return valid;
        }

        function status() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                if (fieldData.error) valid = false;
            });
            return valid;
        }

        function dictate(errors) {
            Object.keys(fields).forEach(function(fieldName) {
                fields[fieldName].error = errors[fieldName] || null;
            });
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

    ////////////////////////////////////////////////////////////////////////////

    ValidationSystem.validators = {
        notEmpty: notEmptyValidator,
        notRequired: notRequiredValidator,
        nationalCode: nationalCodeValidator,
        numberCode: numberCodeValidator,
        phoneNumber: phoneNumberValidator,
        mobilePhoneNumber: mobilePhoneNumberValidator,
        minLength: minLengthValidator,
        length: lengthValidator,
        username: usernameValidator,
        integer: integerValidator,
        url: urlValidator,
        email: emailValidator,
    };

    ////////////////////////////////////////////////////////////////////////////

    function notEmptyValidator(message) {
        message = message || 'پُر کردن این فیلد الزامی است';
        return function(value) {
            return value ? null : message;
        };
    }

    function notRequiredValidator() {
        return function(value) {
            return !value;
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

    function phoneNumberValidator(message) {
        message = message || 'شماره تلفن وارد شده صحیح نمی باشد';
        return function(value) {
            return /^(\+98)?[0-9]{5,15}$/.test(value) ? null : message;
        };
    }

    function mobilePhoneNumberValidator(message) {
        message = message || 'شماره موبایل وارد شده صحیح نمی باشد';
        return function(value) {
            return /^(\+989|09)[0-9]{9}$/.test(value) ? null : message;
        };
    }

    function minLengthValidator(length, message) {
        message = message || 'این فیلد باید حداقل ' + toPersianNumber(length) + ' حرف داشته باشد';
        return function(value) {
            return String(value).length >= length ? null : message;
        };
    }

    function lengthValidator(length, message) {
        message = message || 'این فیلد باید دقیقاً ' + toPersianNumber(length) + ' حرف داشته باشد';
        return function(value) {
            return String(value).length === length ? null : message;
        };
    }

    function usernameValidator(message) {
        message = message || 'نام کاربری فقط باید شامل حروف و ارقام لاتین، نقطه و خط زیر _ باشد';
        return function(value) {
            return /^[a-zA-Z_][a-zA-Z_0-9]+$/.test(value) ? null : message;
        };
    }

    function integerValidator(message) {
        message = message || 'در این فیلد فقط استفاده از ارقام مجاز است';
        return function(value) {
            return /^[0-9]*$/.test(value) ? null : message;
        };
    }

    function urlValidator(message) {
        message = message || 'آدرس وب سایت صحیح نمی باشد';
        return function(value) {
            return /^((http|https):\/\/)?[a-zA-Z0-9-_\.]+\.[a-zA-Z0-9]+$/.test(value) ? null : message;
        };
    }

    function emailValidator(message) {
        message = message || 'پست الکترونیکی صحیح نمی باشد';
        return function(value) {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ? null : message;
        };
    }

})(global);
