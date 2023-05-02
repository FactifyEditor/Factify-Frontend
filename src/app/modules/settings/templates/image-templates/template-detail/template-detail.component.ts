import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role, User } from 'src/app/models';
// import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/settings/user.service';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.css']
})
export class TemplateDetailComponent  implements OnInit {


  hide = true;
  roles$: Observable<any>
  registerForm: FormGroup;
  submitted = false;
  supportedLanguages=[
    
    {"name":"India English","value":"en-IN"},
    {"name":"Bengali","value":"bn-IN"},
    {"name":"Gujarati","value":"gu-IN"},
    {"name":"Hindi","value":"hi-IN"},
    {"name":"Kannada","value":"kn-IN"},
    {"name":"Malayalam","value":"ml-IN"},
    {"name":"Punjabi","value":"pa-IN"},
    {"name":"Tamil","value":"ta-IN"},
    {"name":"Telugu","value":"te-IN"},
    {"name":"Marathi","value":"mr-IN"},
    {"name":"Urdu","value":""},
    {"name":"Kashmiri","value":""},
    {"name":"Bhojpuri","value":""},
    {"name":"Nepali","value":""}
  ]
  

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    // private notificationService:NotificationService,
    private _router: Router
  ) { }
  files: File[] = [];

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
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
        status:1
        
      }
      
      this.userService.addUser(_user)
      .subscribe(
        result => {
          // Handle result
          console.log(result)
        },
        error => {
          console.log("error",error)
          // this.notificationService.showError(error.error.error)
          
        },
        () => {
          console.log("user saved")
          // this.notificationService.showSuccess("user saved")
          this._router.navigate(['/settings/users-setting/users'])
        
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

