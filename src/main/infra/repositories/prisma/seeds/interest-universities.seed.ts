import { INTEREST_UNIVERSITIES } from '../../../../../modules/user/constants';
import { ClientDb } from '../../../../helpers/client-db-helper';

export const interestUniversitiesSeed = async (): Promise<void> => {
  const clientDB = new ClientDb();

  const promises = INTEREST_UNIVERSITIES.map(level =>
    clientDB.interestUniversity.upsert({
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
