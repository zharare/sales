# CONSITEC Sales Reporting System

Proyecto de reportes de ventas construido con **Next.js 14 + TypeScript + TailwindCSS** y persistencia en **Vercel KV**.

## Stack
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Vercel KV
- XLSX para exportar Excel
- Lucide React para iconos

## Características
- Página principal con carpeta CONSITEC y carpetas de comerciales (estilo sistema de carpetas).
- Gestión de comerciales: agregar, editar nombre, cambiar color, eliminar.
- Tabla editable por comercial con 17 columnas requeridas.
- 100 filas por defecto.
- Filtros por MES y AÑO.
- Exportación a Excel.
- API REST con persistencia en KV.

## Rutas API
- `GET /api/salespeople`
- `POST /api/salespeople`
- `PUT /api/salespeople`
- `DELETE /api/salespeople/[id]`
- `GET /api/report/[salespersonId]`
- `POST /api/report/[salespersonId]`

## Variables de entorno
Define en Vercel y local:

```bash
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

## Desarrollo local
```bash
npm install
npm run dev
```

## Deploy en Vercel
1. Subir repositorio a GitHub.
2. Importar proyecto en Vercel.
3. Configurar variables de entorno de Vercel KV.
4. Deploy.
