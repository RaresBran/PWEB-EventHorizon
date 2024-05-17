/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EventDto } from '../../models/event-dto';

export interface GetCurrentUserEventList$Params {
}

export function getCurrentUserEventList(http: HttpClient, rootUrl: string, params?: GetCurrentUserEventList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventDto>>> {
  const rb = new RequestBuilder(rootUrl, getCurrentUserEventList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<EventDto>>;
    })
  );
}

getCurrentUserEventList.PATH = '/app/user/events';
