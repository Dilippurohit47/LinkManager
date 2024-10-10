-- CreateTable
CREATE TABLE "Clicks" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "click" JSONB[],

    CONSTRAINT "Clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clicks" ADD CONSTRAINT "Clicks_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
