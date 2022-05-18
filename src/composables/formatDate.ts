const formatedDate = (date: string) => {
    const dateParts = date.split("-");
    const dayPart = dateParts[2].split("T");
    const day = dayPart[0];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day}-${month}-${year}`;
}
export function useFormatDate(){
    return {
        formatedDate
    }
}