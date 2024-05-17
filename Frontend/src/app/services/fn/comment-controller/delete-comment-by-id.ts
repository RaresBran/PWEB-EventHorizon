/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CommentDto } from '../../models/comment-dto';

export interface DeleteCommentById$Params {
  id: string;
}

export function deleteCommentById(http: HttpClient, rootUrl: string, params: DeleteCommentById$Params, context?: HttpContext): Observable<StrictHttpResponse<CommentDto>> {
  const rb = new RequestBuilder(rootUrl, deleteCommentById.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
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

deleteCommentById.PATH = '/app/comment/{id}';
