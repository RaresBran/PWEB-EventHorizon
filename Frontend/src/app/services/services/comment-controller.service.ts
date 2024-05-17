/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CommentDto } from '../models/comment-dto';
import { deleteCommentById } from '../fn/comment-controller/delete-comment-by-id';
import { DeleteCommentById$Params } from '../fn/comment-controller/delete-comment-by-id';
import { getCommentsByEventId } from '../fn/comment-controller/get-comments-by-event-id';
import { GetCommentsByEventId$Params } from '../fn/comment-controller/get-comments-by-event-id';
import { PageCommentDto } from '../models/page-comment-dto';
import { saveComment } from '../fn/comment-controller/save-comment';
import { SaveComment$Params } from '../fn/comment-controller/save-comment';

@Injectable({ providedIn: 'root' })
export class CommentControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveComment()` */
  static readonly SaveCommentPath = '/app/comment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveComment$Response(params: SaveComment$Params, context?: HttpContext): Observable<StrictHttpResponse<CommentDto>> {
    return saveComment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveComment(params: SaveComment$Params, context?: HttpContext): Observable<CommentDto> {
    return this.saveComment$Response(params, context).pipe(
      map((r: StrictHttpResponse<CommentDto>): CommentDto => r.body)
    );
  }

  /** Path part for operation `getCommentsByEventId()` */
  static readonly GetCommentsByEventIdPath = '/app/comment/{eventId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCommentsByEventId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentsByEventId$Response(params: GetCommentsByEventId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCommentDto>> {
    return getCommentsByEventId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCommentsByEventId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentsByEventId(params: GetCommentsByEventId$Params, context?: HttpContext): Observable<PageCommentDto> {
    return this.getCommentsByEventId$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageCommentDto>): PageCommentDto => r.body)
    );
  }

  /** Path part for operation `deleteCommentById()` */
  static readonly DeleteCommentByIdPath = '/app/comment/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCommentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCommentById$Response(params: DeleteCommentById$Params, context?: HttpContext): Observable<StrictHttpResponse<CommentDto>> {
    return deleteCommentById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCommentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCommentById(params: DeleteCommentById$Params, context?: HttpContext): Observable<CommentDto> {
    return this.deleteCommentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CommentDto>): CommentDto => r.body)
    );
  }

}
