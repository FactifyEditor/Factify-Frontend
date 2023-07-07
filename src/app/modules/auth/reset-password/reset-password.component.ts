import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators,AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token:''
  passwordVisibility: { [key: string]: boolean } = {};
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
       this.token = params['token'];
      // Use the token for further processing
    });
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
   
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ matchError: true });
    } else {
      control.get('confirmPassword').setErrors(null);
    }
  }
  

  togglePasswordVisibility(controlName: string) {
    console.log(controlName);
    this.passwordVisibility[controlName] = !this.passwordVisibility[controlName];
  }

  isPasswordVisible(controlName: string): boolean {
    return this.passwordVisibility[controlName];
  }
  onSubmit() {
    if (this.resetForm.valid) {
      // Perform your reset password logic here
    let resetPassword={
      newPassword:this.resetForm.value.password,
      token:this.token
    }
      this.authService.resetPassword(resetPassword);
    }
  }
}