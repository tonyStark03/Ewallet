-- CreateTable
CREATE TABLE "userSchema" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "userSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountSchema" (
    "id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "accountSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userSchema_username_key" ON "userSchema"("username");

-- AddForeignKey
ALTER TABLE "accountSchema" ADD CONSTRAINT "accountSchema_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
