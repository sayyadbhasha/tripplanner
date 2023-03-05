import dayjs from 'dayjs'

export const getTotalTime = (totalTime) => {
  const { travel, spend } = totalTime;
  const totalMinutes =
    (travel.hours * 60) + (spend.hours * 60) + travel.minutes + spend.minutes;
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

export const taks = [
  {
    label: "Starting From Hyderabad",
    totalTime: {
      travel: {
        hours: 0,
        minutes: 30,
      },
      spend: {
        hours: 0,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Raichur Fort, Raichur",
    totalTime: {
      travel: {
        hours: 5,
        minutes: 32,
      },
      spend: {
        hours: 4,
        minutes: 0,
      },
    },
    description: "",
  },
  
  {
    label: "Hemakuta Hill Temple, Hampi",
    split: false,
    totalTime: {
      travel: {
        hours: 3,
        minutes: 4,
      },
      spend: {
        hours: 4,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Hemakuta Hill Temple, Hampi",
    split: false,
    totalTime: {
      travel: {
        hours: 4,
        minutes: 0,
      },
      spend: {
        hours: 8,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Daroji Sloth Bear Sanctuary",
    totalTime: {
      travel: {
        hours: 0,
        minutes: 20,
      },
      spend: {
        hours: 4,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Tungabhadra Dam",
    totalTime: {
      travel: {
        hours: 0,
        minutes: 42,
      },
      spend: {
        hours: 1,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Koppal fort",
    totalTime: {
      travel: {
        hours: 0,
        minutes: 34,
      },
      spend: {
        hours: 4,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Dharwad",
    totalTime: {
      travel: {
        hours: 2,
        minutes: 34,
      },
      spend: {
        hours: 4,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa",
    totalTime: {
      travel: {
        hours: 3,
        minutes: 16,
      },
      spend: {
        hours: 24,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local 2",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local 2",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local 2",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local 2",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
];

export const createStep = (label, description, childs = []) => {
  return { label, description, childs, startDate: dayjs("2023-03-04") };
};

export const Time = (time1) => {
  return {
    greater: (time2) => {
      if (time1.hours === time2.hours) {
        return time1.minutes > time2.minutes;
      }
      return time1.hours > time2.hours;
    },
    lesser: (time2) => {
      if (time1.hours === time2.hours) {
        return time1.minutes < time2.minutes;
      }
      return time1.hours < time2.hours;
    },
    zeroTime: () => {
      return time1.hours === 0 && time1.minutes === 0;
    },
  };
};

export const addTime = (item1, item2) => {
  const item1Minutes = item1.hours * 60 + item1.minutes;
  const item2Minutes = item2.hours * 60 + item2.minutes;
  const additionMinutes = item1Minutes + item2Minutes;
  return minutesToTime(additionMinutes);
};

export const subTract = (item1, item2) => {
  const item1Minutes = item1.hours * 60 + item1.minutes;
  const item2Minutes = item2.hours * 60 + item2.minutes;
  const additionMinutes = item1Minutes - item2Minutes;
  return minutesToTime(Math.abs(additionMinutes));
};
