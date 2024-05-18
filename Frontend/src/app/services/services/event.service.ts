import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiConfiguration} from "../api-configuration";
import {EventDto} from "../../models/event-dto";
import {EventSaveDto} from "../../models/event-save-dto";
import {PageEventDto} from "../../models/page-event-dto";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = `${this.apiConfiguration.rootUrl}/app/event`;

  constructor(private http: HttpClient, private apiConfiguration: ApiConfiguration) { }

  getEventsByCity(city: string, page: number, size: number): Observable<PageEventDto> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<PageEventDto>(`${this.baseUrl}/city/${city}`, { params });
  }

  getEventById(id: string): Observable<EventDto> {
    return this.http.get<EventDto>(`${this.baseUrl}/${id}`);
  }

  saveEvent(event: EventSaveDto): Observable<EventDto> {
    return this.http.post<EventDto>(this.baseUrl, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addEventToUserList(eventId: string): Observable<void> {
    return this.http.post<void>(`${this.apiConfiguration.rootUrl}/app/user/events/${eventId}`, {});
  }

  removeEventFromUserList(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfiguration.rootUrl}/app/user/events/${eventId}`);
  }
}
