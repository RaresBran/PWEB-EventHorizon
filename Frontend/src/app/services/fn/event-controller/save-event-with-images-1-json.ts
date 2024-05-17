/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EventDto } from '../../models/event-dto';
import { EventSaveDto } from '../../models/event-save-dto';

export interface SaveEventWithImages1$Json$Params {
      body: EventSaveDto
}

export function saveEventWithImages1$Json(http: HttpClient, rootUrl: string, params: SaveEventWithImages1$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
  const rb = new RequestBuilder(rootUrl, saveEventWithImages1$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EventDto>;
    })
  );
}

saveEventWithImages1$Json.PATH = '/app/event';
