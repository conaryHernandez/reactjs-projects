export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}


export const buildFormElement = (
        inputType = 'input',
        type = 'text',
        placeholder = 'Your placeholder...',
        value = '',
        validations = {},
        additionalProperties = {}
    ) => {
    let options = {};

    options = {
    elementType: inputType,
    elementConfig: {
        type: type,
        placeholder: placeholder,
        ...additionalProperties
    },
    value,
    validations,
    valid: false,
    touched: false,
    };

    return options;
}

export const buildFormElements = (elementsObj) => {
    const formElementsArray = [];

    for (let key in elementsObj) {
        formElementsArray.push({
            id: key,
            config: elementsObj[key],
            name: key
        });
    }

    return formElementsArray;
}
