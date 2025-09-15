import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { http } from './api';
import { ICreateEventData, IEventData } from '../@types/events';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private url = `${http}/events`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<IEventData[]> {
    return this.http.get<IEventData[]>(this.url);
  }

  createEvent(body: ICreateEventData): Observable<IEventData> {
    return this.http.post<IEventData>(this.url, body);
  }

  getEventById(id: string): Observable<IEventData> {
    return this.http.get<IEventData>(`${this.url}/${id}`);
  }

  updateEvent(id: string, body: Partial<ICreateEventData>): Observable<IEventData> {
    return this.http.put<IEventData>(`${this.url}/${id}`, body);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
