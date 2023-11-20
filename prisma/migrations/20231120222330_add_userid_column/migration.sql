/*
  Warnings:

  - Added the required column `user_id` to the `feed_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `feeds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feed_items" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "feeds" ADD COLUMN     "userId" TEXT NOT NULL;
