export const REPORT_COLUMNS = [
  "COD",
  "CLIENTE",
  "CONTACTO",
  "NÚMERO",
  "DISTRITO",
  "SERVICIO",
  "GRUPOS",
  "DÍAS",
  "DÍA",
  "MES",
  "AÑO",
  "TOTAL S/. (NO INC IGV)",
  "FACTURADO",
  "N° FACTURA",
  "EMISIÓN CERTIFICADOS FÍSICO",
  "PAGO",
  "CRÉDITO"
] as const;

export type ReportColumn = (typeof REPORT_COLUMNS)[number];

export type ReportRow = Record<ReportColumn, string>;

export type Salesperson = {
  id: string;
  name: string;
  color: string;
  rows: ReportRow[];
};
