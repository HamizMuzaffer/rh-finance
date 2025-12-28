-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);
