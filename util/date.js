export function arrangeDate(date) {
  return date.toISOString().slice(0, 10);
}
export function getRecentExpenses(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
