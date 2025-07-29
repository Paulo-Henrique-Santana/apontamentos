export class DateUtils {
  static isSameDate(dateObj: Date, dateStr: string): boolean {
    const [year, month, day] = dateStr.split('-').map(Number);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  }

  static dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static getWeekdayAbbreviation(data: string): string {
    const weekdayAbbreviations = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const [ano, mes, dia] = data.split('-').map(Number);
    const dateObj = new Date(ano, mes - 1, dia);
    return weekdayAbbreviations[dateObj.getDay()];
  }
}
