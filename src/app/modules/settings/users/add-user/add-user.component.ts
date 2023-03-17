import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role, User } from 'src/app/models';
// import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/settings/user.service';
import { ToastService } from 'src/app/services/shared/toast.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  hide = true;
  roles$: Observable<any>
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    // private notificationService:NotificationService,
    private _router: Router,
    private toastService:ToastService
  ) { }

  validation_messages = {
    'firstName': [
      { type: 'required', message: 'First Name is required' },

    ],
    'lastName': [
      { type: 'required', message: 'Last Name is required' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid mail' }
    ],
    'mobile': [
      { type: 'required', message: 'Mobile password is required' },
     
    ],
    'role': [
      { type: 'required', message: 'Role is required' },
     
    ]
  };
  ngOnInit() {
    this.roles$=this.userService.getRoles();
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      roles: ['', [Validators.required]]
    }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
   console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      let _user:User={
        firstName:this.registerForm.value.firstName,
        lastName:this.registerForm.value.lastName,
        email:this.registerForm.value.email,
        phone:this.registerForm.value.mobile,
        roles:[this.registerForm.value.roles],
        
      }
      
      this.userService.addUser(_user).subscribe(
        result => {
          // Handle result
          console.log(result);
          
        },
        error => {
          console.log("error",error);
          this.toastService.show(error, { classname: 'bg-dander text-dark', delay: 10000 });
        },
        () => {
               this.toastService.show('New User Added', { classname: 'bg-success text-dark', delay: 10000 });
               this._router.navigate(['/users/list'])
        
        })
      }
      }
  
  onSubmitAccountDetails(value:any) {
    console.log(value);
  }

  onSubmitUserDetails(value:any) {
    console.log(value);
  }
  get f() { return this.registerForm.controls; }
}

