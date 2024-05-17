/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteEvent } from '../fn/event-controller/delete-event';
import { DeleteEvent$Params } from '../fn/event-controller/delete-event';
import { EventDto } from '../models/event-dto';
import { EventImageDto } from '../models/event-image-dto';
import { getAllEvents } from '../fn/event-controller/get-all-events';
import { GetAllEvents$Params } from '../fn/event-controller/get-all-events';
import { getAllUpcomingEvents } from '../fn/event-controller/get-all-upcoming-events';
import { GetAllUpcomingEvents$Params } from '../fn/event-controller/get-all-upcoming-events';
import { getEventById } from '../fn/event-controller/get-event-by-id';
import { GetEventById$Params } from '../fn/event-controller/get-event-by-id';
import { getEventImages } from '../fn/event-controller/get-event-images';
import { GetEventImages$Params } from '../fn/event-controller/get-event-images';
import { getEventsByCity } from '../fn/event-controller/get-events-by-city';
import { GetEventsByCity$Params } from '../fn/event-controller/get-events-by-city';
import { PageEventDto } from '../models/page-event-dto';
import { saveEventWithImages1$FormData } from '../fn/event-controller/save-event-with-images-1-form-data';
import { SaveEventWithImages1$FormData$Params } from '../fn/event-controller/save-event-with-images-1-form-data';
import { saveEventWithImages1$Json } from '../fn/event-controller/save-event-with-images-1-json';
import { SaveEventWithImages1$Json$Params } from '../fn/event-controller/save-event-with-images-1-json';
import { uploadImageForEventId } from '../fn/event-controller/upload-image-for-event-id';
import { UploadImageForEventId$Params } from '../fn/event-controller/upload-image-for-event-id';

@Injectable({ providedIn: 'root' })
export class EventControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllEvents()` */
  static readonly GetAllEventsPath = '/app/event';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllEvents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEvents$Response(params: GetAllEvents$Params, context?: HttpContext): Observable<StrictHttpResponse<PageEventDto>> {
    return getAllEvents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllEvents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEvents(params: GetAllEvents$Params, context?: HttpContext): Observable<PageEventDto> {
    return this.getAllEvents$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageEventDto>): PageEventDto => r.body)
    );
  }

  /** Path part for operation `saveEventWithImages1()` */
  static readonly SaveEventWithImages1Path = '/app/event';

  /**
   * Upload an event along with images.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveEventWithImages1$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  saveEventWithImages1$FormData$Response(params: SaveEventWithImages1$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
    return saveEventWithImages1$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * Upload an event along with images.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveEventWithImages1$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  saveEventWithImages1$FormData(params: SaveEventWithImages1$FormData$Params, context?: HttpContext): Observable<EventDto> {
    return this.saveEventWithImages1$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventDto>): EventDto => r.body)
    );
  }

  /**
   * Upload an event along with images.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveEventWithImages1$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveEventWithImages1$Json$Response(params: SaveEventWithImages1$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
    return saveEventWithImages1$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * Upload an event along with images.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveEventWithImages1$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveEventWithImages1$Json(params: SaveEventWithImages1$Json$Params, context?: HttpContext): Observable<EventDto> {
    return this.saveEventWithImages1$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventDto>): EventDto => r.body)
    );
  }

  /** Path part for operation `uploadImageForEventId()` */
  static readonly UploadImageForEventIdPath = '/app/event/{eventId}';

  /**
   * Upload an image for a specific event.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadImageForEventId()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadImageForEventId$Response(params: UploadImageForEventId$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return uploadImageForEventId(this.http, this.rootUrl, params, context);
  }

  /**
   * Upload an image for a specific event.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadImageForEventId$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadImageForEventId(params: UploadImageForEventId$Params, context?: HttpContext): Observable<string> {
    return this.uploadImageForEventId$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getEventById()` */
  static readonly GetEventByIdPath = '/app/event/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEventById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventById$Response(params: GetEventById$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
    return getEventById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEventById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventById(params: GetEventById$Params, context?: HttpContext): Observable<EventDto> {
    return this.getEventById$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventDto>): EventDto => r.body)
    );
  }

  /** Path part for operation `deleteEvent()` */
  static readonly DeleteEventPath = '/app/event/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEvent()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEvent$Response(params: DeleteEvent$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteEvent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteEvent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEvent(params: DeleteEvent$Params, context?: HttpContext): Observable<string> {
    return this.deleteEvent$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getEventImages()` */
  static readonly GetEventImagesPath = '/app/event/{eventId}/images';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEventImages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventImages$Response(params: GetEventImages$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventImageDto>>> {
    return getEventImages(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEventImages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventImages(params: GetEventImages$Params, context?: HttpContext): Observable<Array<EventImageDto>> {
    return this.getEventImages$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<EventImageDto>>): Array<EventImageDto> => r.body)
    );
  }

  /** Path part for operation `getAllUpcomingEvents()` */
  static readonly GetAllUpcomingEventsPath = '/app/event/upcoming';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUpcomingEvents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUpcomingEvents$Response(params: GetAllUpcomingEvents$Params, context?: HttpContext): Observable<StrictHttpResponse<PageEventDto>> {
    return getAllUpcomingEvents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUpcomingEvents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUpcomingEvents(params: GetAllUpcomingEvents$Params, context?: HttpContext): Observable<PageEventDto> {
    return this.getAllUpcomingEvents$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageEventDto>): PageEventDto => r.body)
    );
  }

  /** Path part for operation `getEventsByCity()` */
  static readonly GetEventsByCityPath = '/app/event/city/{city}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEventsByCity()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventsByCity$Response(params: GetEventsByCity$Params, context?: HttpContext): Observable<StrictHttpResponse<PageEventDto>> {
    return getEventsByCity(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEventsByCity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventsByCity(params: GetEventsByCity$Params, context?: HttpContext): Observable<PageEventDto> {
    return this.getEventsByCity$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageEventDto>): PageEventDto => r.body)
    );
  }

}
