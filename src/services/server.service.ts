import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { Presence } from 'src/entities/presence';
import { Subject } from 'src/entities/subject';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url + "subjects");
  }

  getPresences(idSubject: number): Observable<Presence[]> {
    return this.http.get<Presence[]>(this.url + "presence/" + idSubject);
  }

  savePresence(presence: Presence): Observable<Presence> {
    return this.http.post<Presence>(this.url + "presence/", presence.getWithLocalTime());
  }

  deletePresence(idPresence: number): Observable<boolean> {
    return this.http.delete(this.url + "presence/" + idPresence).pipe(
      mapTo(true),
      catchError(_error => {
        return of(false);
      })
    );
  }
}
