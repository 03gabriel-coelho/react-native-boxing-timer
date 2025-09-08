export default function formattingInTime(number: number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.round(minutes < 1 ? number : number - minutes * 60);

  const addingDecimalPlace = (numberTime: number) => {
    return numberTime >= 10 ? numberTime : "0" + numberTime;
  };

  return `${addingDecimalPlace(minutes)}:${addingDecimalPlace(seconds)}`;
}
