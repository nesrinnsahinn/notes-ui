import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note { id: number; title: string; content?: string; }


@Injectable({ providedIn: 'root' })
export class NoteService {
  private baseUrl = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('authToken') || '';
    return token ? new HttpHeaders({ Authorization: `Basic ${token}` }) : undefined;
  }

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl, { headers: this.authHeaders() });
  }

  create(title: string, content: string = '') {
  return this.http.post<Note>(this.baseUrl, { title, content }, { headers: this.authHeaders() });
}

update(id: number, title: string, content: string = '') {
  return this.http.put<Note>(`${this.baseUrl}/${id}`, { id, title, content }, { headers: this.authHeaders() });
}


  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.authHeaders() });
  }
}
