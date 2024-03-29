export function debounce<Args extends any[]>(
  fn: (...args: Args) => void,
  timeout: number,
): (...args: Args) => void {
  let call: NodeJS.Timeout;

  return function (...args: Args) {
    if (call) {
      clearTimeout(call);
    }
    call = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}
