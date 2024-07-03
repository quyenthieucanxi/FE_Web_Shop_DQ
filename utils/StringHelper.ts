

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

export const makeSlug = (inputStr: string) => {
    // Chuyển hết sang chữ thường
	let str = inputStr.toLowerCase();     
 
	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
 
	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd');
	
	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, '');
 
	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, '-');
	
	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-');
 
	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '');
 
	// return
	return str;
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
export const convertToVND = (amount) =>  {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}