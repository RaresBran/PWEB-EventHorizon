/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadImageForEventId$Params {
  eventId: string;
      body?: {

/**
 * Image to be uploaded
 */
'file': Blob;
}
}

export function uploadImageForEventId(http: HttpClient, rootUrl: string, params: UploadImageForEventId$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, uploadImageForEventId.PATH, 'post');
  if (params) {
    rb.path('eventId', params.eventId, {});
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

uploadImageForEventId.PATH = '/app/event/{eventId}';
