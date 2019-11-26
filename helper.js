import moment from "moment/moment";
import {NUMBER_ONLY_REGEX} from "../constants/formValidation";

export const removeSlashFromDOB = (dobWithSlash) => {
    return dobWithSlash.replace(/\//g, '');
}

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const getRandomString = () => (
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
)

export const removeByAttr = (arr, attr, value) => {
    let arrCopy = Object.assign([], arr);
    let i = arrCopy.length;
    while (i--) {
        if (arrCopy[i]
            && arrCopy[i].hasOwnProperty(attr)
            && (arrCopy[i][attr] === value)) {

            arrCopy.splice(i, 1);

        }
    }
    return arrCopy;
}

/**
 * Get the object object which has the attribute {attr} with the value {value} is in the array {arr}
 * @param arr The array
 * @param attr The attribute of the object to check
 * @param value The value of the attribute
 * @returns object
 */
export const getObjectByAttribute = (arr, attr, value) => {
    let i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arr[i][attr] === value)) {
            return arr[i];
        }
    }
    return null;
}

export const getCreditCardYears = () => {
    let startYear = parseInt(moment().format('YYYY'));
    let validExpiryYears = [];
    for (let i = 0; i < 10; i++) {
        let year = startYear + i;
        validExpiryYears[i] = {
            id: year,
            title: year,
            value: year.toString().substring(2, 4)
        }
    }
    return validExpiryYears;
}


export const ccFormat = (value) => {
    const amexCard = value.match(/^3[47]\d{2}/);
    const dashlessValue = value.replace(/-/g,'');
    const len = dashlessValue.length;

    if (amexCard) {
        let newValue = dashlessValue;
        if (len > 4) {
            newValue = dashlessValue.slice(0, 4) + "-" + newValue.slice(4);
            if (len > 10) {
                newValue = newValue.slice(0, 11) + "-" + newValue.slice(11);
                if (len > 15) {
                    newValue = newValue.slice(0, 17)
                }
            }
        }
        return newValue;
    } else {
        let newValue = dashlessValue;
        if (len > 4) {
            newValue = dashlessValue.slice(0, 4) + "-" + newValue.slice(4);
            if (len > 8) {
                newValue = newValue.slice(0, 9) + "-" + newValue.slice(9);
                if (len > 12) {
                    newValue = newValue.slice(0, 14) + "-" + newValue.slice(14);
                    if (len > 16) {
                        newValue = newValue.slice(0, 19)
                    }
                }
            }
        }
        return newValue;
    }
}

export const formatCard = (value) => {
    const dashlessValue = value.replace(/-/g,'');
    const amexCard = dashlessValue.match(/^3[47][0-9]{13,}/);
    const minLength = dashlessValue.length > 13;

    if (amexCard && minLength) {
        return dashlessValue.substring(0, 15);
    } else if (!amexCard && minLength) {
        return dashlessValue.substring(0, 16);
    }
}
