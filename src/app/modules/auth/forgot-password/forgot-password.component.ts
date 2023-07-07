import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService:AuthService) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm() {
    console.log(this.form.valid);
    if (this.form.valid) {
      // Handle form submission logic here
      console.log(this.form.value);
      this.authService.forgotPassword(this.form.value);
    }
  }
  
  

}
