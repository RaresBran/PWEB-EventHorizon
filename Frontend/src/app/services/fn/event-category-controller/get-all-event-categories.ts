/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EventCategoryDto } from '../../models/event-category-dto';

export interface GetAllEventCategories$Params {
}

export function getAllEventCategories(http: HttpClient, rootUrl: string, params?: GetAllEventCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventCategoryDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllEventCategories.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<EventCategoryDto>>;
    })
  );
}

getAllEventCategories.PATH = '/app/event-category';
