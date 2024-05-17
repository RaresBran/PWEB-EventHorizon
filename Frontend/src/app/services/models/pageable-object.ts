/* tslint:disable */
/* eslint-disable */
import { SortObject } from '../models/sort-object';
export interface PageableObject {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Array<SortObject>;
  unpaged?: boolean;
}
