import type { UniqueEntityId } from '@/main/domain';
import { Entity } from '@/main/domain';
import type { FindAllRepoContract } from '@/main/infra';

type EducationLevelType = {
  id: string;
  name: string;
};

export class EducationLevelEntity extends Entity<EducationLevelType> {
  readonly name: string = this.props.name;
  constructor(props: EducationLevelType, id?: UniqueEntityId) {
    super(props, id);
  }
}

type E = EducationLevelEntity;

export interface ListEducationsRepositoryContract extends FindAllRepoContract<E> {}

export interface EducationLevelRepositoryContract extends ListEducationsRepositoryContract {}
