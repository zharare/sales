"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as XLSX from "xlsx";
import { ArrowLeft, FileDown, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createEmptyRow } from "@/lib/defaults";
import { REPORT_COLUMNS, type ReportRow } from "@/lib/types";

export default function ReportPage() {
  const params = useParams();
  const id = params.id as string;

  const [rows, setRows] = useState<ReportRow[]>([]);
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    fetch(`/api/report/${id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: ReportRow[]) => setRows(data));
  }, [id]);

  const save = async (next: ReportRow[]) => {
    setRows(next);

    await fetch(`/api/report/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rows: next })
    });
  };

  const visibleRows = useMemo(() => {
    return rows.filter((row) => {
      const monthOk = monthFilter
        ? row["MES"] === monthFilter.toUpperCase()
        : true;

      const yearOk = yearFilter
        ? row["AÑO"] === yearFilter.toUpperCase()
        : true;

      return monthOk && yearOk;
    });
  }, [rows, monthFilter, yearFilter]);

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(visibleRows);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "REPORTE");

    XLSX.writeFile(wb, `reporte-${id}.xlsx`);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-white p-6 font-cambria uppercase text-slate-900"
    >
      <div className="mx-auto max-w-[96vw]">

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-blue-100 px-3 py-2 text-consitec-primary"
            >
              <ArrowLeft size={16} />
              Volver
            </Link>
          </motion.div>

          <div className="flex flex-wrap items-center gap-2">

            <input
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value.toUpperCase())}
              placeholder="Mes"
              className="rounded border p-2 transition focus:bg-blue-50"
            />

            <input
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value.toUpperCase())}
              placeholder="Año"
              className="rounded border p-2 transition focus:bg-blue-50"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportExcel}
              className="inline-flex items-center gap-2 rounded bg-consitec-primary px-3 py-2 text-white"
            >
              <FileDown size={16} />
              Exportar a Excel
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => save([...rows, createEmptyRow()])}
              className="inline-flex items-center gap-2 rounded bg-green-600 px-3 py-2 text-white"
            >
              <Plus size={16} />
              Añadir fila
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => rows.length && save(rows.slice(0, -1))}
              className="inline-flex items-center gap-2 rounded bg-red-600 px-3 py-2 text-white"
            >
              <Trash2 size={16} />
              Borrar fila
            </motion.button>

          </div>
        </div>

        <div className="max-h-[78vh] overflow-auto rounded-lg border">

          <table className="min-w-full border-collapse text-sm">

            <thead className="sticky top-0 z-20 bg-consitec-secondary text-white">
              <tr>
                {REPORT_COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="whitespace-nowrap border px-3 py-2 text-left font-bold"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <motion.tbody layout>

              <AnimatePresence>

                {visibleRows.map((row, rowIndex) => (

                  <motion.tr
                    layout
                    key={rowIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="odd:bg-blue-50/50"
                  >

                    {REPORT_COLUMNS.map((column) => (

                      <td key={column} className="border p-1">

                        <input
                          value={row[column] ?? ""}
                          onChange={(e) => {
                            const next = [...rows];

                            const absoluteIndex = rows.indexOf(row);

                            next[absoluteIndex] = {
                              ...row,
                              [column]: e.target.value.toUpperCase()
                            };

                            setRows(next);
                          }}
                          onBlur={() => save(rows)}
                          className="w-full bg-transparent p-1 outline-none transition focus:bg-blue-50"
                        />

                      </td>

                    ))}

                  </motion.tr>

                ))}

              </AnimatePresence>

            </motion.tbody>

          </table>

        </div>
      </div>
    </motion.main>
  );
}