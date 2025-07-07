-- CreateTable
CREATE TABLE "PromptRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "componentId" TEXT,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromptRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PromptRequest" ADD CONSTRAINT "PromptRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptRequest" ADD CONSTRAINT "PromptRequest_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE SET NULL ON UPDATE CASCADE;
