export function toTwelveHour(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value

    time[0] = +time[0] % 12 || 12; // Adjust hours
  }

  return time.join("");
}
export function toPeriod(time) {
  return time.replace(/:/, ".");
}
export function formatTime(time) {
  return toPeriod(toTwelveHour(time));
}