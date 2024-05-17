/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { EventCategoryDto } from '../models/event-category-dto';
import { getAllEventCategories } from '../fn/event-category-controller/get-all-event-categories';
import { GetAllEventCategories$Params } from '../fn/event-category-controller/get-all-event-categories';

@Injectable({ providedIn: 'root' })
export class EventCategoryControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllEventCategories()` */
  static readonly GetAllEventCategoriesPath = '/app/event-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllEventCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEventCategories$Response(params?: GetAllEventCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventCategoryDto>>> {
    return getAllEventCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllEventCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEventCategories(params?: GetAllEventCategories$Params, context?: HttpContext): Observable<Array<EventCategoryDto>> {
    return this.getAllEventCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<EventCategoryDto>>): Array<EventCategoryDto> => r.body)
    );
  }

}
