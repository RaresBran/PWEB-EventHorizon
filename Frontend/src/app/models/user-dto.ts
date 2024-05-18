/* tslint:disable */
/* eslint-disable */
import { CommentDto } from './comment-dto';
import { EventDto } from './event-dto';
export interface UserDto {
  comments?: Array<CommentDto>;
  email: string;
  events?: Array<EventDto>;
  firstName: string;
  id?: string;
  lastName: string;
}
