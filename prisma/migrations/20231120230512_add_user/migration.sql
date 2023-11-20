/*
  Warnings:

  - You are about to drop the column `user_id` on the `feed_items` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `feeds` table. All the data in the column will be lost.
  - Added the required column `fk_user_id` to the `feed_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_user_id` to the `feeds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feed_items" DROP COLUMN "user_id",
ADD COLUMN     "fk_user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "feeds" DROP COLUMN "userId",
ADD COLUMN     "fk_user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- AddForeignKey
ALTER TABLE "feed_items" ADD CONSTRAINT "feed_items_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeds" ADD CONSTRAINT "feeds_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
