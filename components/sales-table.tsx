"use client";

type Props = {
  rows: any[];
  setRows: (rows: any[]) => void;
};

export function SalesTable({ rows, setRows }: Props) {

  const addRow = () => {
    setRows([
      ...rows,
      {
        cod: "",
        cliente: "",
        contacto: "",
        numero: "",
        distrito: "",
        servicio: "",
        grupos: 0,
        dias: 0,
        dia: 1,
        mes: 1,
        anio: new Date().getFullYear(),
        total: 0
      }
    ]);
  };

  return (
    <div>

      <button onClick={addRow}>
        Agregar fila
      </button>

      <table>
        <thead>
          <tr>
            <th>COD</th>
            <th>CLIENTE</th>
            <th>CONTACTO</th>
            <th>NÚMERO</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.cod}</td>
              <td>{row.cliente}</td>
              <td>{row.contacto}</td>
              <td>{row.numero}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}