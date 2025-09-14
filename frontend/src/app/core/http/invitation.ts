import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { http } from './api';
import { Observable } from 'rxjs';
import { ConfirmPresenceResponse, IParticipantResponse } from '../@types/invitation';

export interface SendEmailData {
  emails: string[];
  subject: string;
}

export interface AuthParticipantData {
  token: string;
}

export interface AcceptInvitationData extends AuthParticipantData {
  eventId: string;
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
  authParticipant(body: AuthParticipantData): Observable<IParticipantResponse> {
    return this.http.post<IParticipantResponse>(`${this.url}/authenticate-participant`, body);
  }

  acceptInvitation(body: AcceptInvitationData): Observable<ConfirmPresenceResponse> {
    return this.http.post<ConfirmPresenceResponse>(
      `${this.url}/events/${body.eventId}/accept?token=${body.token}`,
      {}
    );
  }
}
