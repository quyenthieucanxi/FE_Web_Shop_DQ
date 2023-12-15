

export const FormatCurrencyVND = (value: string) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
        return "Invalid input";
    }
    return numericValue.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}
function removeDiacriticsAndConvert(inputStr) {
    const vietnameseChars = "ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưỳừửữỳỹ";
    const englishChars = "AAAAEEEIIOOOOUUYaaaaeeeiioooouuyAaDdIiUuOoUuuuu";

    // Tạo một bảng ánh xạ giữa chữ cái Tiếng Việt và Tiếng Anh
    const charMap = {};
    for (let i = 0; i < vietnameseChars.length; i++) {
        charMap[vietnameseChars[i]] = englishChars[i];
    }

    // Chuyển đổi chuỗi
    const convertedStr = inputStr
        .split('')
        .map(char => charMap[char] || char)
        .join('');

    // Loại bỏ dấu thanh
    const removedDiacriticsStr = convertedStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return removedDiacriticsStr;
}
export const makeSlug = (inputStr: string) =>  {
     // Chuyển đổi chữ có dấu thành chữ không dấu
     let slug = removeDiacriticsAndConvert(inputStr);

     // Chuyển đổi thành chữ thường và thay thế khoảng trắng bằng dấu gạch ngang
     slug = slug.toLowerCase().replace(/\s+/g, '-');
 
     return slug;
}

 export const getBefore = (inputString, char) => {
    var index = inputString.indexOf(char);
    if (index !== -1) {
        return inputString.substring(0, index);
    } else {
        return inputString;
    }
}
export const getBeforeLast = (inputString, char) => {
    var index = inputString.lastIndexOf(char);
    if (index !== -1) {
        return inputString.substring(0, index);
    } else {
        return inputString;
    }
}