-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_education_level_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_interest_course_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_interest_university_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "education_level_id" DROP NOT NULL,
ALTER COLUMN "interest_course_id" DROP NOT NULL,
ALTER COLUMN "interest_university_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_education_level_id_fkey" FOREIGN KEY ("education_level_id") REFERENCES "education_level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_interest_course_id_fkey" FOREIGN KEY ("interest_course_id") REFERENCES "interest_course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_interest_university_id_fkey" FOREIGN KEY ("interest_university_id") REFERENCES "interest_university"("id") ON DELETE SET NULL ON UPDATE CASCADE;
