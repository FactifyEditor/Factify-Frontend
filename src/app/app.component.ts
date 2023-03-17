import { Component,OnInit,AfterViewInit } from '@angular/core';
declare function initMenu(): any;
import {AuthService} from 'src/app/services/auth.service'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'newschecker';
  constructor(private http:HttpClient,private authService:AuthService){

  }

  public loadScript(url:string) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
}


dtOptions: any = {};
isLoggedIn:boolean=false;
ngOnInit(){
  this.authService.loggedIn.subscribe(data=>{
    this.isLoggedIn=data;
   })
   this.isLoggedIn= this.authService.isLoggedIn;
}


ngAfterViewInit(){
  initMenu()
}
logout(): void {
  console.log('Logged out');
  this.authService.doLogout()
}
}
