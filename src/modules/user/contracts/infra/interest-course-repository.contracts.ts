import type { UniqueEntityId } from '@/main/domain';
import { Entity } from '@/main/domain';
import type { FindAllRepoContract } from '@/main/infra';

type InterestCourseType = {
  id: string;
  name: string;
};

export class InterestCourseEntity extends Entity<InterestCourseType> {
  readonly name: string = this.props.name;
  constructor(props: InterestCourseType, id?: UniqueEntityId) {
    super(props, id);
  }
}

type E = InterestCourseEntity;

export interface ListInterestCourseRepositoryContract extends FindAllRepoContract<E> {}

export interface InterestCourseRepositoryContract extends ListInterestCourseRepositoryContract {}
