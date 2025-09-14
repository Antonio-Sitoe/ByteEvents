import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { http } from './api';
import { ISpeaker } from '../@types/speakers';

interface SpeackerResponse {
  speakers: ISpeaker[];
}

@Injectable({
  providedIn: 'root',
})
export class SpeakersService {
  private url = http + '/speakers';
  constructor(private http: HttpClient) {}

  findAll(eventId: string): Observable<SpeackerResponse> {
    const data = this.http.get<SpeackerResponse>(`${this.url}/event/${eventId}`);
    return data;
  }

  create(body: ISpeaker): Observable<ISpeaker> {
    return this.http.post<ISpeaker>(this.url, body);
  }

  findById(id: string): Observable<ISpeaker> {
    return this.http.get<ISpeaker>(`${this.url}/${id}`);
  }

  update(body: ISpeaker, id: string): Observable<ISpeaker> {
    return this.http.put<ISpeaker>(`${this.url}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
