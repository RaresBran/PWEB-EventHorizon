/* tslint:disable */
/* eslint-disable */
import { CommentDto } from '../models/comment-dto';
import { EventDto } from '../models/event-dto';
export interface UserDto {
  comments?: Array<CommentDto>;
  email: string;
  events?: Array<EventDto>;
  firstName: string;
  id?: string;
  lastName: string;
}
