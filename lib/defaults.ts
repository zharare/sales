import { REPORT_COLUMNS, type ReportRow, type Salesperson } from "@/lib/types";

const defaultNames = ["Abigail", "Cristhian", "Ingrit", "Mayerly", "Valeria", "Fiorella"];

const palette = ["#99B8FF", "#A8D5FF", "#B8E1FF", "#A9C9FF", "#D0E2FF", "#C3D9FF"];

export const createEmptyRow = (): ReportRow =>
  REPORT_COLUMNS.reduce((acc, col) => {
    acc[col] = "";
    return acc;
  }, {} as ReportRow);

export const createDefaultRows = (count = 100): ReportRow[] =>
  Array.from({ length: count }, () => createEmptyRow());

export const defaultSalespeople = (): Salesperson[] =>
  defaultNames.map((name, index) => ({
    id: `${name.toLowerCase()}-${index + 1}`,
    name,
    color: palette[index % palette.length],
    rows: createDefaultRows()
  }));
