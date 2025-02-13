//@ts-check

exports.num2Int = (number) => {
    if (isNaN(number)) {
        return 0;
    }

    return parseInt(number);
};