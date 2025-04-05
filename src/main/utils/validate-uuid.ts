import { UniqueEntityId } from '../domain';

export const validateUuid = (uuid: string): boolean => {
  try {
    UniqueEntityId.create(uuid);
    return true;
  } catch (error) {
    return false;
  }
};
