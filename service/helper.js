//@ts-check

exports.num2Int = (number) => {
    if (isNaN(number)) {
        return 0;
    }

    return parseInt(number);
};

exports.stringifyObjectValues = (params) => {
    let obj = { ...params };

    Object.keys(obj).forEach(
        (k) => (obj[k] = obj[k]?.toString())
    );

    return obj;
};