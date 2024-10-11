export const TYPES = {
  EDUCATION: "#28a745",
  INTERNSHIP: "#DBA507",
  IT_WORK: "#007bff",
  SCHOOL: "#ff005e",
};

export type Event = {
  label: string;
  shortLabel?: string;
  startDate: number;
  endDate: number;
  line: number;
  type: keyof typeof TYPES;
  description?: string;
  place: string;
  hideDate?: boolean;
  country?: string;
  hoursPerWeek?: string;
  expanded?: boolean;
  fullTime: boolean;
  timePercentage: number;
  selfEmployed: boolean;
  flagFilename?: string;
};
