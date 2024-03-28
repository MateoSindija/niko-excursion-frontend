const formatDate = (
  nanoseconds: number,
  seconds: number,
  showTime = true,
): string => {
  const milliseconds = nanoseconds / 1e6; // Convert nanoseconds to milliseconds
  const totalMilliseconds = seconds * 1e3 + milliseconds; // Combine seconds and milliseconds

  const date = new Date(totalMilliseconds);

  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const secondsFormatted = ('0' + date.getSeconds()).slice(-2);

  return `${day}/${month}/${year} ${
    showTime ? `${hours}:${minutes}:${secondsFormatted}` : ''
  }`;
};
export default formatDate;
