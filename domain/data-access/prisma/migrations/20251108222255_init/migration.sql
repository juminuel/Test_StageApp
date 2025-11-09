/*
  Warnings:

  - The primary key for the `_CourseToLecturer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ScheduleToStudent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_CourseToLecturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ScheduleToStudent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_CourseToLecturer" DROP CONSTRAINT "_CourseToLecturer_AB_pkey";

-- AlterTable
ALTER TABLE "_ScheduleToStudent" DROP CONSTRAINT "_ScheduleToStudent_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToLecturer_AB_unique" ON "_CourseToLecturer"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToStudent_AB_unique" ON "_ScheduleToStudent"("A", "B");
