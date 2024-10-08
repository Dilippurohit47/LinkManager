-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
