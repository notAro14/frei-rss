-- DropForeignKey
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_fk_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
