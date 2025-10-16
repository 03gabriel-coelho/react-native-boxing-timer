export function separatingMinutes(number: number) {
  return Math.floor(number / 60);
}

export function separatingSeconds(number: number) {
  const minutes = separatingMinutes(number);

  return Math.round(minutes < 1 ? number : number - minutes * 60);
}

export function formattingInTime(number: number) {
  const minutes = separatingMinutes(number);
  const seconds = separatingSeconds(number);

  const addingDecimalPlace = (numberTime: number) => {
    return numberTime >= 10 ? numberTime : "0" + numberTime;
  };

  return `${addingDecimalPlace(minutes)}:${addingDecimalPlace(seconds)}`;
}
