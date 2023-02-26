export const getTotalTime = (totalTime) => {
  const { travel, spend } = totalTime;
  const totalMinutes =
    (travel.hours * 60) + (spend.hours * 60) + travel.minutes + spend.minutes;
    console.log(totalMinutes,  minutesToTime(totalMinutes), travel)
  return minutesToTime(totalMinutes);
};

export const minutesToTime = (minutesToTime) => {
  if (minutesToTime === 60) return { hours: 1, minutes: 0 };
  if (minutesToTime < 60) return { hours: 0, minutes: minutesToTime };
  if (minutesToTime > 60) {
    const convert = minutesToTime / 60;
    return {
      hours: Math.floor(convert),
      minutes: (convert - Math.floor(convert)) * 60,
    };
  }
};
