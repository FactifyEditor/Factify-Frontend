import { Injectable } from '@angular/core';
import {User,Role} from 'src/app/models'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from './shared/toast.service';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private baseURL = environment.BASE_URL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public loggedIn = new BehaviorSubject<boolean>(false); // {1}
  constructor(private http: HttpClient, public router: Router,private toastService: ToastService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
 

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.baseURL}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.baseURL}/auth/login`, user)
      .subscribe(
        (res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.currentUserSubject.next(user);
        this.loggedIn.next(true);
        window.location.href="/feed"
        // this.router.navigateByUrl('/feed');

        // });
      },error => {
        console.log("error", error);
        this.toastService.show("invalid user or password", { classname: 'bg-danger text-dark', delay: 10000 });
   
        // this.notificationService.showError(error.error.error)
      },);
  }
    // forgot-password
    forgotPassword(user) {
      return this.http
        .post<any>(`${this.baseURL}/auth/forgot-password`, user)
        .subscribe(
          (res: any) => {
            this.toastService.show(`${res.message} to ${user.email}`, { classname: 'bg-success text-dark', delay: 10000 });
        },error => {
          console.log("error", error);
          this.toastService.show("invalid email", { classname: 'bg-danger text-dark', delay: 10000 });
     
          // this.notificationService.showError(error.error.error)
        },);
    }
     // forgot-password
     resetPassword(user) {
      return this.http
        .post<any>(`${this.baseURL}/auth/reset-password`, user)
        .subscribe(
          (res: any) => {
            this.toastService.show(`${res.message}`, { classname: 'bg-success text-dark', delay: 10000 });
        },error => {
          console.log("error", error);
          this.toastService.show("faild to reset password try again", { classname: 'bg-danger text-dark', delay: 10000 });
     
          // this.notificationService.showError(error.error.error)
        },);
    }

  getToken() {
    return localStorage.getItem('accessToken');
  }
  // getRole() {
  //   this.roleAs = localStorage.getItem('ROLE');
  //   return this.roleAs;
  // }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('accessToken');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    if (removeToken == null) {
      this.loggedIn.next(false);

      this.router.navigate(['auth/login']);
    }
  }
  public isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
  public isAdmin(): boolean {
    return this.currentUserValue && this.currentUserValue.roles.includes(Role.Admin);
  }
  public isEditor(): boolean {
    return this.currentUserValue && this.currentUserValue.roles.includes(Role.Editor);
  }
  public isFactChecker(): boolean {
    return this.currentUserValue && this.currentUserValue.roles.includes(Role.FactChecker);
  }
  public getCurrentUserRoles(): any[] {
    let currentUser= localStorage.getItem('currentUser');
    return currentUser!=null?JSON.parse(currentUser)?.roles:[]
  }
  public getCurrentUser(){
    let currentUser= localStorage.getItem('currentUser');
    return currentUser!=null?JSON.parse(currentUser):null
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.baseURL}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}