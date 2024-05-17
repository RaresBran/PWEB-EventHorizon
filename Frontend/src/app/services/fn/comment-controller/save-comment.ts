/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CommentDto } from '../../models/comment-dto';
import { CommentSaveDto } from '../../models/comment-save-dto';

export interface SaveComment$Params {
      body: CommentSaveDto
}

export function saveComment(http: HttpClient, rootUrl: string, params: SaveComment$Params, context?: HttpContext): Observable<StrictHttpResponse<CommentDto>> {
  const rb = new RequestBuilder(rootUrl, saveComment.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CommentDto>;
    })
  );
}

saveComment.PATH = '/app/comment';
