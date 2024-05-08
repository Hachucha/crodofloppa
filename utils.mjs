export const convertKeysToLowercase = function (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(module.exports.convertKeysToLowercase);
    }

    const convertedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const convertedKey = key.charAt(0).toLowerCase() + key.slice(1);
            convertedObj[convertedKey] = module.exports.convertKeysToLowercase(obj[key]);
        }
    }

    return convertedObj;
}

export const generateString = function (length, onlyNums) {
    var result = '';
    var characters = onlyNums ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}