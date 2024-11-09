const utcOffsetToTimezone = {
  "UTC-12": "Etc/GMT+12",
  "UTC-11": "Pacific/Pago_Pago",
  "UTC-10": "Pacific/Honolulu",
  "UTC-9": "America/Anchorage",
  "UTC-8": "America/Los_Angeles",
  "UTC-7": "America/Denver",
  "UTC-6": "America/Chicago",
  "UTC-5": "America/New_York",
  "UTC-4": "America/Santiago",
  "UTC-3": "America/Argentina/Buenos_Aires",
  "UTC-2": "Atlantic/South_Georgia",
  "UTC-1": "Atlantic/Azores",
  "UTC+0": "UTC",
  "UTC+1": "Europe/Berlin",
  "UTC+2": "Europe/Kyiv",
  "UTC+3": "Europe/Moscow",
  "UTC+4": "Asia/Dubai",
  "UTC+5": "Asia/Karachi",
  "UTC+6": "Asia/Almaty",
  "UTC+7": "Asia/Bangkok",
  "UTC+8": "Asia/Singapore",
  "UTC+9": "Asia/Tokyo",
  "UTC+10": "Australia/Sydney",
  "UTC+11": "Pacific/Noumea",
  "UTC+12": "Pacific/Fiji",
};


export default function getTimezoneFromOffset(offset) {
  return utcOffsetToTimezone[offset] || "Unknown timezone";
}


export function getOffsetFromTimezone(timezone) {
  const offset = Object.keys(utcOffsetToTimezone).find(key => utcOffsetToTimezone[key] === timezone);
  return offset || "Unknown offset";
}

export function translateDayToRussian(day) {
  const daysOfWeek = {
    "Friday": { full: "Пятница", short: "пт" },
    "Saturday": { full: "Суббота", short: "сб" },
    "Sunday": { full: "Воскресенье", short: "вс" },
    "Monday": { full: "Понедельник", short: "пн" },
    "Tuesday": { full: "Вторник", short: "вт" },
    "Wednesday": { full: "Среда", short: "ср" },
    "Thursday": { full: "Четверг", short: "чт" }
  };

  const dayInfo = daysOfWeek[day.charAt(0).toUpperCase() + String(day).slice(1)];

  if (dayInfo) {
    return dayInfo;
  } else {
    return null;
  }
}


export function getTime(time: string) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Amman',  // Time zone for UTC+3 (e.g., Jordan, Jerusalem, etc.)
  };

  const date = new Date(time);  // Original time with time zone offset
  const timeFormatted = new Intl.DateTimeFormat('en-US', options).format(date);

  return timeFormatted;
}



export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}