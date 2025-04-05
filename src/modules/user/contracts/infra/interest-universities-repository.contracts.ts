import type { UniqueEntityId } from '@/main/domain';
import { Entity } from '@/main/domain';
import type { FindAllRepoContract } from '@/main/infra';

type InterestUniversitiesType = {
  id: string;
  name: string;
};

export class InterestUniversitiesEntity extends Entity<InterestUniversitiesType> {
  readonly name: string = this.props.name;
  constructor(props: InterestUniversitiesType, id?: UniqueEntityId) {
    super(props, id);
  }
}

type E = InterestUniversitiesEntity;

export interface ListInterestUniversitiesRepositoryContract extends FindAllRepoContract<E> {}

export interface InterestUniversitiesRepositoryContract
  extends ListInterestUniversitiesRepositoryContract {}
