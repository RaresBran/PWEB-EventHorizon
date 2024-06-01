/* tslint:disable */
/* eslint-disable */
import { CommentDto } from './comment-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageCommentDto {
  content?: Array<CommentDto>;
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
