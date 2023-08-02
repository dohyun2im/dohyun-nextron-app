export const formatTimestampToTimeString = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let timeString = '';
  if (hours >= 12) {
    timeString = `오후 ${hours === 12 ? 12 : hours - 12}시 ${minutes}분`;
  } else {
    timeString = `오전 ${hours === 0 ? 12 : hours}시 ${minutes}분`;
  }

  return timeString;
};
