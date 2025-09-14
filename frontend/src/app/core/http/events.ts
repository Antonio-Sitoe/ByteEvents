import { Injectable } from '@angular/core';
import { http } from './api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICreateEventData, IEventData } from '../@types/events';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private url = http + '/events';
  constructor(private http: HttpClient) {}

  getEvents(): Observable<IEventData[]> {
    const data = this.http.get<IEventData[]>(this.url);
    return data;
  }

  createEvent(body: ICreateEventData): Observable<IEventData> {
    return this.http.post<IEventData>(this.url, body);
  }

  getEventById(id: string): Observable<IEventData> {
    return this.http.get<IEventData>(`${this.url}/${id}`);
  }
}
