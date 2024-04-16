import { Event } from "./types";

export function toTs(dateString: string): number {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getTime();
}

export function tsToStr(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function tsToShortStr(timestamp: number): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = months[date.getMonth()]; // Get the month abbreviation
  return `${year} ${month}`;
}

export function tsToYearStr(timestamp: number): string {
  const date = new Date(timestamp);
  if(!date){
    return "";
  }
  return date.getFullYear().toString();
}

export function nearestJanuary1stTimestamp(ts: number) {
  const date = new Date(ts);

  const year = date.getFullYear();
  const nextJanuary1st = new Date(year + 1, 0, 1);
  const nearestTimestamp = nextJanuary1st.getTime();

  return nearestTimestamp;
}

export function calculateDuration(event: Event): string {
  const diff = event.endDate - event.startDate;
  const months = Math.ceil(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let duration = "";

  if (years > 0) {
    duration += `${years} ${years === 1 ? "year" : "years"}`;
    if (remainingMonths > 0) {
      duration += ` ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
    }
  } else {
    duration += `${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
  }

  return duration;
}
