-- CreateTable
CREATE TABLE "SalesPerson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "SalesPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "cod" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "servicio" TEXT NOT NULL,
    "grupos" INTEGER NOT NULL,
    "dias" INTEGER NOT NULL,
    "dia" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "anio" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "facturado" BOOLEAN NOT NULL,
    "facturaNumero" TEXT,
    "certificado" BOOLEAN NOT NULL,
    "pago" TEXT NOT NULL,
    "credito" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salesPersonId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_salesPersonId_fkey" FOREIGN KEY ("salesPersonId") REFERENCES "SalesPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
