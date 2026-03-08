"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SalesTable } from "@/components/sales-table";

export default function ReportPage() {

  const params = useParams();
  const [rows, setRows] = useState<any[]>([]);

  const loadRows = async () => {
    const res = await fetch(`/api/report/salespeople/${params.id}`);
    const data = await res.json();
    setRows(data);
  };

  useEffect(() => {
    loadRows();
  }, []);

  const saveRows = async (updated: any[]) => {
    setRows(updated);

    await fetch(`/api/report/salespeople/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
  };

  return (
    <main className="p-10">

      <h1 className="mb-6 text-3xl font-bold">
        Registro de Ventas
      </h1>

      <SalesTable rows={rows} setRows={saveRows} />

    </main>
  );
}