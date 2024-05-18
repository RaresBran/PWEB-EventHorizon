/* tslint:disable */
/* eslint-disable */
import { CommentDto } from './comment-dto';
import { EventCategoryDto } from './event-category-dto';
import { EventImageDto } from './event-image-dto';
import { LocationDto } from './location-dto';
export interface EventDto {
  categories?: Array<EventCategoryDto>;
  comments?: Array<CommentDto>;
  endDate: string;
  id: string;
  images?: Array<EventImageDto>;
  information: string;
  link?: string;
  locations: Array<LocationDto>;
  name: string;
  startDate: string;
}
