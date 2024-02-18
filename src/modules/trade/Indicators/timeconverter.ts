export function toTime(timeStamp: number): string {
    const d = new Date(timeStamp).toString().slice(16,24);
    return d;
}