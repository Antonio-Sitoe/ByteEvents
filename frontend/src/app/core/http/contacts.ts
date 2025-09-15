import { Injectable } from '@angular/core';
import { IContact } from '../@types/contact';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { http } from './api';

interface ContactResponse {
  contacts: IContact[];
}

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private url = `${http}/contacts`;
  constructor(private http: HttpClient) {}

  create(body: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.url, body);
  }

  findAll(): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${this.url}`);
  }

  update(id: string, body: IContact): Observable<IContact> {
    return this.http.put<IContact>(`${this.url}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
