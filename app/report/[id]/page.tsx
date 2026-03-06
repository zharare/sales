"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import { ArrowLeft, FileDown, Plus, Trash2 } from "lucide-react";
import { createEmptyRow } from "@/lib/defaults";
import { REPORT_COLUMNS, type ReportRow } from "@/lib/types";

export default function ReportPage({ params }: { params: { id: string } }) {
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    fetch(`/api/report/${params.id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: ReportRow[]) => setRows(data));
  }, [params.id]);

  const save = async (next: ReportRow[]) => {
    setRows(next);
    await fetch(`/api/report/${params.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows: next })
    });
  };

  const visibleRows = useMemo(
    () =>
      rows.filter((row) => {
        const monthOk = monthFilter ? row["MES"] === monthFilter.toUpperCase() : true;
        const yearOk = yearFilter ? row["AÑO"] === yearFilter.toUpperCase() : true;
        return monthOk && yearOk;
      }),
    [rows, monthFilter, yearFilter]
  );

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(visibleRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "REPORTE");
    XLSX.writeFile(wb, `reporte-${params.id}.xlsx`);
  };

  return (
    <main className="min-h-screen bg-white p-6 font-cambria uppercase text-slate-900">
      <div className="mx-auto max-w-[96vw]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-md bg-blue-100 px-3 py-2 text-consitec-primary">
            <ArrowLeft size={16} /> Volver
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <input value={monthFilter} onChange={(e) => setMonthFilter(e.target.value.toUpperCase())} placeholder="Mes" className="rounded border p-2" />
            <input value={yearFilter} onChange={(e) => setYearFilter(e.target.value.toUpperCase())} placeholder="Año" className="rounded border p-2" />
            <button onClick={exportExcel} className="inline-flex items-center gap-2 rounded bg-consitec-primary px-3 py-2 text-white">
              <FileDown size={16} /> Exportar a Excel
            </button>
            <button onClick={() => save([...rows, createEmptyRow()])} className="inline-flex items-center gap-2 rounded bg-green-600 px-3 py-2 text-white">
              <Plus size={16} /> Añadir fila
            </button>
            <button onClick={() => rows.length && save(rows.slice(0, -1))} className="inline-flex items-center gap-2 rounded bg-red-600 px-3 py-2 text-white">
              <Trash2 size={16} /> Borrar fila
            </button>
          </div>
        </div>

        <div className="max-h-[78vh] overflow-auto rounded-lg border">
          <table className="min-w-full border-collapse text-sm">
            <thead className="sticky top-0 z-20 bg-consitec-secondary text-white">
              <tr>
                {REPORT_COLUMNS.map((col) => (
                  <th key={col} className="whitespace-nowrap border px-3 py-2 text-left font-bold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="odd:bg-blue-50/50">
                  {REPORT_COLUMNS.map((column) => (
                    <td key={column} className="border p-1">
                      <input
                        value={row[column]}
                        onChange={(e) => {
                          const next = [...rows];
                          const absoluteIndex = rows.indexOf(row);
                          next[absoluteIndex] = { ...row, [column]: e.target.value.toUpperCase() };
                          setRows(next);
                        }}
                        onBlur={() => save(rows)}
                        className="w-full bg-transparent p-1 outline-none"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
