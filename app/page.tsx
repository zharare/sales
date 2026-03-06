"use client";

import { useEffect, useState } from "react";
import { FolderPlus } from "lucide-react";
import { FolderCard } from "@/components/folder-card";
import type { Salesperson } from "@/lib/types";

export default function HomePage() {
  const [salespeople, setSalespeople] = useState<Salesperson[]>([]);

  const loadSalespeople = async () => {
    const res = await fetch("/api/salespeople", { cache: "no-store" });
    const data = (await res.json()) as Salesperson[];
    setSalespeople(data);
  };

  useEffect(() => {
    loadSalespeople();
  }, []);

  const saveSalespeople = async (updated: Salesperson[]) => {
    setSalespeople(updated);
    await fetch("/api/salespeople", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ salespeople: updated })
    });
  };

  const addSalesperson = async () => {
    const name = window.prompt("Nombre del comercial");
    if (!name?.trim()) return;
    await fetch("/api/salespeople", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim().toUpperCase(), color: "#CFE0FF" })
    });
    await loadSalespeople();
  };

  const remove = async (id: string) => {
    await fetch(`/api/salespeople/${id}`, { method: "DELETE" });
    await loadSalespeople();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <section className="mx-auto max-w-6xl">
        <div className="folder-card mx-auto mb-8 max-w-2xl rounded-2xl border border-blue-200 bg-blue-100 p-8 text-center shadow-lg">
          <div className="folder-lid mx-auto h-8 w-1/2 rounded-t-xl bg-consitec-primary" />
          <div className="mt-3 rounded-xl bg-white p-5 text-4xl font-black tracking-wider text-consitec-primary">CONSITEC</div>
        </div>

        <div className="mb-6 flex justify-end">
          <button onClick={addSalesperson} className="inline-flex items-center gap-2 rounded-lg bg-consitec-secondary px-4 py-2 font-semibold text-white">
            <FolderPlus size={18} /> Agregar comercial
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {salespeople.map((person) => (
            <FolderCard
              key={person.id}
              person={person}
              onDelete={remove}
              onRename={(id, name) => saveSalespeople(salespeople.map((p) => (p.id === id ? { ...p, name } : p)))}
              onColor={(id, color) => saveSalespeople(salespeople.map((p) => (p.id === id ? { ...p, color } : p)))}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
