/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addEventToUserList } from '../fn/user-controller/add-event-to-user-list';
import { AddEventToUserList$Params } from '../fn/user-controller/add-event-to-user-list';
import { EventDto } from '../models/event-dto';
import { getCurrentUser } from '../fn/user-controller/get-current-user';
import { GetCurrentUser$Params } from '../fn/user-controller/get-current-user';
import { getCurrentUserEventList } from '../fn/user-controller/get-current-user-event-list';
import { GetCurrentUserEventList$Params } from '../fn/user-controller/get-current-user-event-list';
import { removeEventFromUserList } from '../fn/user-controller/remove-event-from-user-list';
import { RemoveEventFromUserList$Params } from '../fn/user-controller/remove-event-from-user-list';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addEventToUserList()` */
  static readonly AddEventToUserListPath = '/app/user/events/{eventId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEventToUserList()` instead.
   *
   * This method doesn't expect any request body.
   */
  addEventToUserList$Response(params: AddEventToUserList$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return addEventToUserList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addEventToUserList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addEventToUserList(params: AddEventToUserList$Params, context?: HttpContext): Observable<UserDto> {
    return this.addEventToUserList$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `removeEventFromUserList()` */
  static readonly RemoveEventFromUserListPath = '/app/user/events/{eventId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeEventFromUserList()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeEventFromUserList$Response(params: RemoveEventFromUserList$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return removeEventFromUserList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeEventFromUserList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeEventFromUserList(params: RemoveEventFromUserList$Params, context?: HttpContext): Observable<UserDto> {
    return this.removeEventFromUserList$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getCurrentUser()` */
  static readonly GetCurrentUserPath = '/app/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Response(params?: GetCurrentUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getCurrentUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser(params?: GetCurrentUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.getCurrentUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getCurrentUserEventList()` */
  static readonly GetCurrentUserEventListPath = '/app/user/events';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUserEventList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUserEventList$Response(params?: GetCurrentUserEventList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventDto>>> {
    return getCurrentUserEventList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentUserEventList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUserEventList(params?: GetCurrentUserEventList$Params, context?: HttpContext): Observable<Array<EventDto>> {
    return this.getCurrentUserEventList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<EventDto>>): Array<EventDto> => r.body)
    );
  }

}
