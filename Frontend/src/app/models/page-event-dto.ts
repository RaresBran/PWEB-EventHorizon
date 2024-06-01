/* tslint:disable */
/* eslint-disable */
import { EventDto } from './event-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageEventDto {
  content?: Array<EventDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: Array<SortObject>;
  totalElements?: number;
  totalPages?: number;
}
