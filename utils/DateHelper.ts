


export const ConvertToDDMMYYYY = (inputDateString : string) => {
    const inputDate = new Date(inputDateString);
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();
    const formattedDateString = `${day}/${month}/${year}`;
    return formattedDateString;
}

export const CalculateTimePassedAsync = (timeInput: Date): string => {
        const updatedTime: Date = new Date(timeInput);
        const nowTime: Date = new Date();
        const timeDifferenceInMilliseconds: number = nowTime.getTime() - updatedTime.getTime();

        if (timeDifferenceInMilliseconds < 1000 * 60) {
            return "Vừa xong";
        } else if (timeDifferenceInMilliseconds < 1000 * 60 * 60) {
            const minutesPassed = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
            return `${minutesPassed} phút trước`;
        } else if (timeDifferenceInMilliseconds < 1000 * 60 * 60 * 24) {
            const hoursPassed = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
            return `${hoursPassed} giờ trước`;
        } else if (timeDifferenceInMilliseconds < 1000 * 60 * 60 * 24 * 30) {
            const daysPassed = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
            return `${daysPassed} ngày trước`;
        } else if (timeDifferenceInMilliseconds < 1000 * 60 * 60 * 24 * 30 * 12) {
            const monthsPassed = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 30));
            return `${monthsPassed} tháng trước`;
        } else {
            const yearsPassed = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 30 * 12));
            return `${yearsPassed} năm trước`;
        }
}
