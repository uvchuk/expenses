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
  const allExpenses = [];

  function getMedian(arr) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
      return sorted[middle];
    }
  }
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
  for (const month in expenses) {
    const days = expenses[month];
    let firstSunday = getFirstSunday(month);

    for (const day in days) {
      const dailyExpenses = days[day];
      const dayNum = Number(day);
      if (dayNum <= firstSunday) {
        for (const category in dailyExpenses) {
          dailyExpenses[category].forEach((expense) => {
            allExpenses.push(expense);
          });
        }
      }
    }
  }

  const overallMedian = getMedian(allExpenses);
  if (overallMedian > 0) result = overallMedian;
  return result;
}

console.log(solution1(expenses));
