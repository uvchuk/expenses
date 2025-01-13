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
  let allExpenses = [];

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

  for (const [month, days] of Object.entries(expenses)) {
    const firstSunday = getFirstSunday(month);
    const filteredDays = Object.entries(days).filter(
      ([day]) => Number(day) <= firstSunday,
    );

    filteredDays.forEach(([, dailyExpenses]) => {
      Object.values(dailyExpenses).forEach((expensesArray) => {
        allExpenses.push(...expensesArray);
      });
    });
  }

  const overallMedian = getMedian(allExpenses);
  if (overallMedian > 0) result = overallMedian;
  return result;
}

function solution2(expenses) {
  /**
   * Metodologia: Używany jest algorytm "quick select", który jest modyfikacją quick sort.
   * Zamiast pełnego sortowania tablicy, quick select rekurencyjnie wybiera tylko tę część,
   * która jest potrzebna do określenia k-tego najmniejszego elementu. Aby obliczyć medianę,
   * znajdujemy środkowy (lub dwa środkowe) elementy w tablicy.
   *
   * Zalety:
   * - Średnia złożoność czasowa to O(n), gdzie n to liczba elementów w tablicy.
   * - Wykorzystuje mniej pamięci niż pełne sortowanie.
   *
   * Wady:
   * - W najgorszym przypadku (np. gdy tablica jest już posortowana w odwrotnej kolejności)
   *   złożoność czasowa może wzrosnąć do O(n^2).
   * - Dla małych tablic korzyści mogą być nieznaczne w porównaniu z pełnym sortowaniem.
   */

  let result = null;
  let allExpenses = [];

  function quickSelect(arr, left, right, k) {
    if (left === right) return arr[left];

    const pivotIndex = partition(arr, left, right);

    if (k === pivotIndex) {
      return arr[k];
    } else if (k < pivotIndex) {
      return quickSelect(arr, left, pivotIndex - 1, k);
    } else {
      return quickSelect(arr, pivotIndex + 1, right, k);
    }
  }

  function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left;

    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
  }

  function getMedianQuickSelect(arr) {
    const n = arr.length;
    if (n === 0) return 0;

    if (n % 2 === 1) {
      return quickSelect(arr, 0, n - 1, Math.floor(n / 2));
    } else {
      const leftMedian = quickSelect(arr, 0, n - 1, n / 2 - 1);
      const rightMedian = quickSelect(arr, 0, n - 1, n / 2);
      return (leftMedian + rightMedian) / 2;
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

  for (const [month, days] of Object.entries(expenses)) {
    const firstSunday = getFirstSunday(month);
    const filteredDays = Object.entries(days).filter(
      ([day]) => Number(day) <= firstSunday,
    );

    filteredDays.forEach(([, dailyExpenses]) => {
      Object.values(dailyExpenses).forEach((expensesArray) => {
        allExpenses.push(...expensesArray);
      });
    });
  }

  const overallMedian = getMedianQuickSelect(allExpenses);
  if (overallMedian > 0) result = overallMedian;
  return result;
}
