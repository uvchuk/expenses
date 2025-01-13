const expenses = {
  "2023-01": {
    "01": {
      food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
      fuel: [210.22],
    },
    "09": {
      food: [11.9],
      fuel: [190.22],
    },
  },
  "2023-03": {
    "07": {
      food: [20, 11.9, 30.2, 11.9],
    },
    "04": {
      food: [10.2, 11.5, 2.5],
      fuel: [],
    },
  },
  "2023-04": {},
};

function solution1(expenses) {
  let result = null;
  const monthlyExpenses = [];

  for (const month in expenses) {
    let total = 0;
    const days = expenses[month];

    function getFirstSunday(monthKey) {
      const [year, month] = monthKey.split("-").map(Number);
      let date = new Date(year, month - 1, 1);
      let dayOfWeek = date.getDay();

      if (dayOfWeek === 0) {
        return date.getDate();
      }

      let daysUntilSunday = 7 - dayOfWeek;
      date.setDate(date.getDate() + daysUntilSunday);

      return date.getDate();
    }

    let firstSunday = getFirstSunday(month);

    for (const day in days) {
      const dayNum = Number(day);

      if (dayNum <= firstSunday) {
        const dailyExpenses = days[day];

        for (const category in dailyExpenses) {
          total += dailyExpenses[category].reduce(
            (sum, value) => sum + value,
            0,
          );
        }
      }
    }

    monthlyExpenses.push({ [month]: total });
  }

  return monthlyExpenses;
}
