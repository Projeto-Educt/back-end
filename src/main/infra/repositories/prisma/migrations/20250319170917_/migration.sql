/*
  Warnings:

  - Added the required column `education_level_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interest_course_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interest_university_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Profile" AS ENUM ('MENTOR', 'STUDENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "education_level_id" TEXT NOT NULL,
ADD COLUMN     "interest_course_id" TEXT NOT NULL,
ADD COLUMN     "interest_university_id" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "profile" "Profile";

-- CreateTable
CREATE TABLE "education_level" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "education_level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interest_course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "interest_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interest_university" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "interest_university_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_education_level_id_fkey" FOREIGN KEY ("education_level_id") REFERENCES "education_level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_interest_course_id_fkey" FOREIGN KEY ("interest_course_id") REFERENCES "interest_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_interest_university_id_fkey" FOREIGN KEY ("interest_university_id") REFERENCES "interest_university"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
