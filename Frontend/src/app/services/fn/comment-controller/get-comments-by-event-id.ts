/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageCommentDto } from '../../models/page-comment-dto';

export interface GetCommentsByEventId$Params {
  eventId: string;
  pageable: Pageable;
}

export function getCommentsByEventId(http: HttpClient, rootUrl: string, params: GetCommentsByEventId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCommentDto>> {
  const rb = new RequestBuilder(rootUrl, getCommentsByEventId.PATH, 'get');
  if (params) {
    rb.path('eventId', params.eventId, {});
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageCommentDto>;
    })
  );
}

getCommentsByEventId.PATH = '/app/comment/{eventId}';
