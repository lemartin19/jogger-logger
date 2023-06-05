export function dateToString(date: Date) {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeStyle: 'short',
  });
}

export function metersToMiles(meters: number) {
  const miles = Math.round((meters * 100) / 1609.34) / 100;
  return `${miles} mi`;
}

const ONE_MINUTE = 60;
const ONE_HOUR = 60 * ONE_MINUTE;

export function secondsToHours(time: number) {
  const hours = Math.floor(time / ONE_HOUR);
  const minutes = Math.floor((time % ONE_HOUR) / ONE_MINUTE);
  const seconds = time % ONE_MINUTE;
  return `${hours}:${minutes}:${seconds}`;
}
