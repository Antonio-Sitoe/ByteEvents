import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { http } from './api';
import { Observable } from 'rxjs';

export interface SendEmailData {
  emails: string[];
  subject: string;
}

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  private url = http;
  constructor(private http: HttpClient) {}

  sendEmail(body: SendEmailData, eventId: string): Observable<void> {
    return this.http.post<void>(`${this.url}/events/${eventId}/invitations`, body);
  }
}
