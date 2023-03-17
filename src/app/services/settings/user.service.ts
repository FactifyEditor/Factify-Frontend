import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseURL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseURL}/users`);
  }

  addUser(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/users`, data)
  }

  updateUser(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseURL}/users/${id}`, data)
  }
  getUser(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/users/${id}`)
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
