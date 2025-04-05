/*
 * @jest-environment ./src/main/config/jest.environment.ts
 */

import { ClientDb } from '@/main/helpers/client-db-helper';
import { seeds } from '@/main/infra/repositories/prisma/seeds/seeds';
import { EDUCATION_LEVEL, INTEREST_COURSES, INTEREST_UNIVERSITIES } from '@/modules/user/constants';
describe('Seeds', () => {
  const db = ClientDb;
  let clientDb: ClientDb;

  beforeAll(async () => {
    clientDb = await db.getClient();

    await clientDb.interestCourse.deleteMany();
    await clientDb.interestUniversity.deleteMany();
    await clientDb.educationLevel.deleteMany();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('Should execute seeds', async () => {
    const educationLevels = await clientDb.educationLevel.findMany();
    const interestCourses = await clientDb.interestCourse.findMany();
    const interestUniversities = await clientDb.interestUniversity.findMany();

    expect(educationLevels).toEqual([]);
    expect(interestCourses).toEqual([]);
    expect(interestUniversities).toEqual([]);

    await seeds();

    const sortArray = (arr: string[]) => {
      return arr.sort((a, b) => a.localeCompare(b));
    };

    const educationLevelsName = sortArray(
      (await clientDb.educationLevel.findMany()).map(el => el.name),
    );
    const interestCoursesName = sortArray(
      (await clientDb.interestCourse.findMany()).map(el => el.name),
    );
    const interestUniversitiesName = sortArray(
      (await clientDb.interestUniversity.findMany()).map(el => el.name),
    );

    expect(educationLevelsName).toEqual(sortArray(EDUCATION_LEVEL));
    expect(interestCoursesName).toEqual(sortArray(INTEREST_COURSES));
    expect(interestUniversitiesName).toEqual(sortArray(INTEREST_UNIVERSITIES));
  });
});
