import { differenceInMonths } from "date-fns";

const ptMonths: Record<string, number> = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11
};

const enMonths: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

export function parseResumeDate(dateStr: string, lang: "curriculo" | "resume"): Date {
  const normalized = dateStr.toLowerCase().trim();
  if (normalized === "atualmente" || normalized === "present") {
    return new Date();
  }

  const parts = normalized.split(" ");
  if (parts.length < 2) return new Date();

  const monthStr = parts[0];
  const yearStr = parts[1];
  const year = parseInt(yearStr);
  const months = lang === "curriculo" ? ptMonths : enMonths;
  
  // Use first 3 letters of month
  const monthKey = monthStr.substring(0, 3);
  const month = months[monthKey];

  return new Date(year, month !== undefined ? month : 0, 1);
}

export function calculateMonths(start: Date, end: Date): number {
  // Add 1 month to include the starting month in the count (e.g. Aug to Aug is 1 month)
  return Math.abs(differenceInMonths(end, start)) + 1;
}

export function formatDuration(totalMonths: number, lang: "curriculo" | "resume"): string {
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  const isPT = lang === "curriculo";
  
  let result = "";
  if (years > 0) {
    result += `${years} ${years === 1 ? (isPT ? "ano" : "year") : (isPT ? "anos" : "years")}`;
  }
  
  if (remainingMonths > 0) {
    if (result) result += isPT ? " e " : " and ";
    result += `${remainingMonths} ${remainingMonths === 1 ? (isPT ? "mês" : "month") : (isPT ? "meses" : "months")}`;
  }
  
  if (!result) return isPT ? "1 mês" : "1 month";
  
  return result;
}
