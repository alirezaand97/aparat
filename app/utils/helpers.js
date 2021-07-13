export function convertSecondsToTime(seconds) {
  const h = Math.floor(seconds / 360);
  let s = seconds % 360;
  const m = Math.floor(s / 60);
  s = seconds % 60;
  return `${h > 0 ? (h > 9 ? h : `0${h}:`) : ''}${m > 9 ? m : `0${m}`}:${
    s > 9 ? s : `0${s}`
  }`;
}
export function getCreatedAge(createdAge) {
  if (createdAge <= 1) {
    return `امروز`;
  }
  if (createdAge <= 7) return `${createdAge} روز پیش`;

  if (createdAge <= 30) return `${Math.floor(createdAge / 7)} هفته پیش`;

  if (createdAge <= 365) return `${Math.floor(createdAge / 12)} ماه پیش`;

  return `${Math.floor(createdAge / 365)} سال پیش`;
}

export function to_valid_mobile(mobile) {
  return `+98${mobile.substr(-10, 10)}`;
}
