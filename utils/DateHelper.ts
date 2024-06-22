


export const ConvertToDDMMYYYY = (inputDateString : string) => {
    const inputDate = new Date(inputDateString);
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();
    const formattedDateString = `${day}/${month}/${year}`;
    return formattedDateString;
}

export const CalculateTimePassedAsync = (timeInput: string): string => {
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
        } else if (timeDifferenceInMilliseconds < 1000 * 60 * 60 * 24 * 7) {
            const daysPassed = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
            return `${daysPassed} ngày trước`;
        } else if (timeDifferenceInMilliseconds < 1000 * 60 * 60 * 24 * 30) {
            return ConvertToDDMMYYYY(timeInput);
        } 
}
export const ConvertToHourMinute = (timeInput : string) => {
    const dateTime: Date = new Date(timeInput);
    const minutes = dateTime.getMinutes();
    return  `${dateTime.getHours()}:${ minutes < 10 ? '0' + minutes : minutes}`
}
export function parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); 
}

export function isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}