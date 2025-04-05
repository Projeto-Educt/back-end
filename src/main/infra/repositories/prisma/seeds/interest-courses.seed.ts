import { INTEREST_COURSES } from '../../../../../modules/user/constants';
import { ClientDb } from '../../../../helpers/client-db-helper';

export const interestCoursesSeed = async (): Promise<void> => {
  const clientDB = new ClientDb();

  const promises = INTEREST_COURSES.map(level =>
    clientDB.interestCourse.upsert({
      where: {
        name: level,
      },
      create: {
        name: level,
      },
      update: {},
    }),
  );

  await Promise.all(promises);
};
