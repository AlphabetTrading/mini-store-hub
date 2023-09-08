import { format, formatDistanceToNow } from "date-fns";

export function customFormatDistanceFromNow(date: Date): string {
  const oneMonth = 1000 * 3600 * 24 * 30;
  const distance = Date.now() - date.getTime();
  if (distance < oneMonth && distance > 0) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  return format(date, "MM:HH - MMM dd yyyy");
}
