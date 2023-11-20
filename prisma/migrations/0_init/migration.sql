-- CreateTable
CREATE TABLE "feed_items" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "fk_feed_id" UUID NOT NULL,
    "pub_date" DATE NOT NULL,
    "title" TEXT NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "is_read" BOOLEAN DEFAULT false,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeds" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "name" TEXT,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "feed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "article_url_key" ON "feed_items"("url");

-- CreateIndex
CREATE UNIQUE INDEX "article_id_key" ON "feed_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "feed_url_key" ON "feeds"("url");

-- CreateIndex
CREATE UNIQUE INDEX "feed_id_key" ON "feeds"("id");

-- AddForeignKey
ALTER TABLE "feed_items" ADD CONSTRAINT "feed_items_fk_feed_id_fkey" FOREIGN KEY ("fk_feed_id") REFERENCES "feeds"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

