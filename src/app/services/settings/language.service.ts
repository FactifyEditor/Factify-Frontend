import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private baseURL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getAllLanguages(): Observable<any> {
    return this.http.get(`${this.baseURL}/language`)
  }

  addLanguage(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/language`, data)
  }

  updateLanguage(data: any, id: string): Observable<any> {
    return this.http.put(`${this.baseURL}/language/${id}`, data)
  }
  getLanguage(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/language/${id}`)
  }

  deleteLanguage(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/language/${id}`)
  }
}
