/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageEventDto } from '../../models/page-event-dto';

export interface GetAllUpcomingEvents$Params {
  pageable: Pageable;
}

export function getAllUpcomingEvents(http: HttpClient, rootUrl: string, params: GetAllUpcomingEvents$Params, context?: HttpContext): Observable<StrictHttpResponse<PageEventDto>> {
  const rb = new RequestBuilder(rootUrl, getAllUpcomingEvents.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageEventDto>;
    })
  );
}

getAllUpcomingEvents.PATH = '/app/event/upcoming';
