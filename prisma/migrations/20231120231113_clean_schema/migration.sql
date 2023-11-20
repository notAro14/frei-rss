/*
  Warnings:

  - You are about to drop the `feed_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feeds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "feed_items" DROP CONSTRAINT "feed_items_fk_feed_id_fkey";

-- DropForeignKey
ALTER TABLE "feed_items" DROP CONSTRAINT "feed_items_fk_user_id_fkey";

-- DropForeignKey
ALTER TABLE "feeds" DROP CONSTRAINT "feeds_fk_user_id_fkey";

-- DropTable
DROP TABLE "feed_items";

-- DropTable
DROP TABLE "feeds";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "FeedItem" (
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "fk_feed_id" TEXT NOT NULL,
    "pub_date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "is_read" BOOLEAN DEFAULT false,
    "fk_user_id" TEXT NOT NULL,

    CONSTRAINT "FeedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "name" TEXT,
    "id" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedItem_url_key" ON "FeedItem"("url");

-- CreateIndex
CREATE UNIQUE INDEX "FeedItem_id_key" ON "FeedItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Feed_url_key" ON "Feed"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Feed_id_key" ON "Feed"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "FeedItem" ADD CONSTRAINT "FeedItem_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedItem" ADD CONSTRAINT "FeedItem_fk_feed_id_fkey" FOREIGN KEY ("fk_feed_id") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
