-- CreateEnum
CREATE TYPE "roles" AS ENUM ('admin', 'moderator', 'mvp', 'vip', 'default');

-- CreateEnum
CREATE TYPE "topics" AS ENUM ('announcement', 'general');

-- CreateEnum
CREATE TYPE "tags" AS ENUM ('common');

-- CreateTable
CREATE TABLE "forums" (
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sticky" BOOLEAN NOT NULL DEFAULT false,
    "viewed" INTEGER NOT NULL DEFAULT 0,
    "topic" "topics" NOT NULL DEFAULT 'general',
    "tags" "tags"[] DEFAULT ARRAY['common']::"tags"[],
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "forums_pkey" PRIMARY KEY ("uniqueId")
);

-- CreateTable
CREATE TABLE "users" (
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "roles" "roles"[] DEFAULT ARRAY['default']::"roles"[],
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uniqueId")
);

-- CreateIndex
CREATE UNIQUE INDEX "forums_uniqueId_key" ON "forums"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "forums_title_key" ON "forums"("title");

-- CreateIndex
CREATE UNIQUE INDEX "users_uniqueId_key" ON "users"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
