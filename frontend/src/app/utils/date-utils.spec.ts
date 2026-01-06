import { DateUtils } from './date-utils';

describe('DateUtils', () => {
  it('should create an instance', () => {
    expect(new DateUtils()).toBeTruthy();
  });

  it('deve retornar que a data objeto e a data string são iguais', () => {
    const dataObj = new Date(2024, 0, 1);
    const dataStr = '2024-01-01';

    expect(DateUtils.isSameDate(dataObj, dataStr)).toBeTrue();
  });

  it('deve retornar que a data objeto e a data string são diferentes', () => {
    const dataObj = new Date(2024, 0, 1);
    const dataStr = '2024-01-02';

    expect(DateUtils.isSameDate(dataObj, dataStr)).toBeFalse();
  });

  it('deve converter uma data objeto para string no formato YYYY-MM-DD', () => {
    const dataObj = new Date(2024, 0, 1);
    const dataStr = '2024-01-01';

    expect(DateUtils.dateToString(dataObj)).toBe(dataStr);
  })

  it('deve retornar a abreviação do dia da semana para uma data específica', () => {
    const dataStr = '2024-01-01'; // Segunda-feira

    expect(DateUtils.getWeekdayAbbreviation(dataStr)).toBe('Seg');
  })
});
