-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "favMusic" TEXT NOT NULL,
    "favArtist" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_nome_key" ON "Person"("nome");
