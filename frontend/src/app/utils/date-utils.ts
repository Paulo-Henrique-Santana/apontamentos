export class DateUtils {
  static isSameDate(dateObj: Date, dateStr: string): boolean {
    const [year, month, day] = dateStr.split('-').map(Number);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  };


  static dateToString(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
