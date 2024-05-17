/* tslint:disable */
/* eslint-disable */
import { EventCategoryIdDto } from '../models/event-category-id-dto';
import { LocationDto } from '../models/location-dto';
export interface EventSaveDto {
  categories?: Array<EventCategoryIdDto>;
  endDate?: string;
  id?: string;
  information?: string;
  link?: string;
  locations: Array<LocationDto>;
  name: string;
  startDate?: string;
}
