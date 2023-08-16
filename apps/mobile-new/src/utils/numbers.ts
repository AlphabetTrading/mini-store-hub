export function formatNumber(number: number) {
  if (!number) return "0";
  if (number >= 1e9) {
    return (number / 1e9).toFixed(2) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(2) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(2) + "K";
  }
  return number.toString();
}
