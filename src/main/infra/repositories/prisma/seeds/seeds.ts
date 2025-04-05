import { educationLevelSeed } from './education-level.seed';
import { interestCoursesSeed } from './interest-courses.seed';
import { interestUniversitiesSeed } from './interest-universities.seed';

export const seeds = async () => {
  await Promise.all([educationLevelSeed(), interestCoursesSeed(), interestUniversitiesSeed()]);
};
