/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `education_level` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `interest_course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `interest_university` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "education_level_name_key" ON "education_level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "interest_course_name_key" ON "interest_course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "interest_university_name_key" ON "interest_university"("name");
