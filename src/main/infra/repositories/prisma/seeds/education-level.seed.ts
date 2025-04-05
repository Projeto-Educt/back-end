import { EDUCATION_LEVEL } from '../../../../../modules/user/constants';
import { ClientDb } from '../../../../helpers/client-db-helper';

export const educationLevelSeed = async (): Promise<void> => {
  const clientDB = new ClientDb();

  const promises = EDUCATION_LEVEL.map(level =>
    clientDB.educationLevel.upsert({
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
