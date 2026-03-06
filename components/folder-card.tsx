"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import type { Salesperson } from "@/lib/types";

type Props = {
  person: Salesperson;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onColor: (id: string, color: string) => void;
};

export function FolderCard({ person, onDelete, onRename, onColor }: Props) {
  return (
    <div className="folder-card rounded-xl border border-blue-200 p-4 shadow-sm" style={{ background: person.color }}>
      <div className="folder-lid h-4 w-4/5 rounded-t-lg bg-consitec-primary/90" />
      <div className="mt-2 rounded-lg bg-white/95 p-3">
        <Link href={`/report/${person.id}`} className="block text-center text-lg font-bold uppercase text-consitec-primary hover:underline">
          {person.name}
        </Link>
        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              const name = window.prompt("Nuevo nombre", person.name);
              if (name && name.trim()) onRename(person.id, name.trim().toUpperCase());
            }}
            className="rounded-md bg-blue-100 p-2 text-consitec-primary"
            aria-label="Editar"
          >
            <Pencil size={16} />
          </button>
          <input
            type="color"
            value={person.color}
            onChange={(e) => onColor(person.id, e.target.value)}
            className="h-8 w-10 cursor-pointer rounded"
            aria-label="Color"
          />
          <button onClick={() => onDelete(person.id)} className="rounded-md bg-red-100 p-2 text-red-600" aria-label="Eliminar">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
