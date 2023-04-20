import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingServiceService {

  private baseURL =environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getAllRatings(): Observable<any> {
    return this.http.get(`${this.baseURL}/ratings`);
  }

  addRating(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/ratings`, data)
  }

  updateRating(data: any, id: string): Observable<any> {
    return this.http.put(`${this.baseURL}/ratings/${id}`, data)
  }
  getRating(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/ratings/${id}`)
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/users/${id}`)
  }
  
  getRoles():Observable<any>{
    return this.http.get(`${this.baseURL}/roles`).pipe(map((response:any)=>{
      return response.data;
    }))

  }
}
