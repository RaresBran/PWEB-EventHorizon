/* tslint:disable */
/* eslint-disable */
import { CommentDto } from '../models/comment-dto';
import { EventCategoryDto } from '../models/event-category-dto';
import { EventImageDto } from '../models/event-image-dto';
import { LocationDto } from '../models/location-dto';
export interface EventDto {
  categories?: Array<EventCategoryDto>;
  comments?: Array<CommentDto>;
  endDate?: string;
  id?: string;
  images?: Array<EventImageDto>;
  information?: string;
  link?: string;
  locations: Array<LocationDto>;
  name: string;
  startDate?: string;
}
