-- CreateTable
CREATE TABLE "FigmaFile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "componentId" TEXT,
    "fileId" TEXT NOT NULL,
    "nodeId" TEXT,
    "meta" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FigmaFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FigmaFile" ADD CONSTRAINT "FigmaFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigmaFile" ADD CONSTRAINT "FigmaFile_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE SET NULL ON UPDATE CASCADE;
