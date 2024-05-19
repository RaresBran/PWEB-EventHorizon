import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EventCategoryDto} from "../../models/event-category-dto";
import {ApiConfiguration} from "../api-configuration";

@Injectable({
  providedIn: 'root'
})
export class EventCategoryService {
  private baseUrl = `${this.apiConfiguration.rootUrl}/app/event-category`;

  constructor(private http: HttpClient, private apiConfiguration: ApiConfiguration) {}

  getAllEventCategories(): Observable<EventCategoryDto[]> {
    return this.http.get<EventCategoryDto[]>(this.baseUrl);
  }
}
