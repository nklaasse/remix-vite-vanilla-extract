const DIVISIONS = [
  { amount: 60, name: "seconds" as const },
  { amount: 60, name: "minutes" as const },
  { amount: 24, name: "hours" as const },
  { amount: 7, name: "days" as const },
  { amount: 4.34524, name: "weeks" as const },
  { amount: 12, name: "months" as const },
  { amount: Number.POSITIVE_INFINITY, name: "years" as const },
] as const;

export function formatTimeAgo(
  date: Date,
  format: (value: number, unit: Intl.RelativeTimeFormatUnit) => string
) {
  let duration = (Number(date) - Date.now()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}
