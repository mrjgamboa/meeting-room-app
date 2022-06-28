// src: https://bobbyhadz.com/blog/javascript-convert-hh-mm-ss-to-seconds
// timeToSeconds('09:30') will return: 34200

export default function timeToSeconds(time) {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 * 60 + Number(minutes) * 60;
}
