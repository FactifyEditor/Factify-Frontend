import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/shared/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private toastService: ToastService,
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
    
      this.router.navigateByUrl('/feed');

      // this.router.navigate(['feed']);
    }
  }
  password="password";

  show = false;
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
}


