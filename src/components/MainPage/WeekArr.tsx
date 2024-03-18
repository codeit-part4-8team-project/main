export const makeWeekArr = (date: Date): Array<[number, Date]> => {
  const day = date.getDay();

  const _week: Array<[number, Date]> = Array.from({ length: 7 }, (_, i) => {
    const newDate = new Date(date.valueOf() + 86400000 * (i - day));
    return [i, newDate];
  });

  return _week;
};
