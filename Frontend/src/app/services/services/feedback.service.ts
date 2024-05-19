import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConfiguration} from "../api-configuration";
import {FeedbackDto} from "../../models/feedback-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = `${this.apiConfiguration.rootUrl}/app/feedback`;

  constructor(private http: HttpClient, private apiConfiguration: ApiConfiguration) { }

  submitFeedback(feedback: FeedbackDto): Observable<FeedbackDto> {
    return this.http.post<FeedbackDto>(`${this.baseUrl}`, feedback);
  }
}
