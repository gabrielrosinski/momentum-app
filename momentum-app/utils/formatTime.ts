/**
 * Format time in milliseconds to mm:ss format
 * Example: 300000 ms → "05:00"
 *
 * @param milliseconds - Time in milliseconds
 * @returns Formatted string in mm:ss format
 */
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
