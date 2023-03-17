import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role, User } from 'src/app/models';
// import { NotificationService } from 'src/app/services/notification.service';
import { LanguageService } from 'src/app/services/settings/language.service';
import { ToastService } from 'src/app/services/shared/toast.service';
@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent implements OnInit {


  hide = true;
  roles$: Observable<any>
  languageForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private languageService:LanguageService,
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
    
    this.languageForm = this.fb.group({
      language: ['', Validators.required],
      value: ['', ],
   
    }
    );
  }

  get languageFormControl() {
    return this.languageForm.controls;
  }

  onSubmit() {
    this.submitted = true;
   console.log(this.languageForm.value)
    if (this.languageForm.valid) {
      let _user:any={
        language:this.languageForm.value.language,
        value:this.languageForm.value.value,
        
      }
      
      this.languageService.addLanguage(_user).subscribe(
        result => {
          // Handle result
          console.log(result);
          
        },
        error => {
          console.log("error",error);
          this.toastService.show(error, { classname: 'bg-dander text-dark', delay: 10000 });
        },
        () => {
               this.toastService.show('New Language Added', { classname: 'bg-success text-dark', delay: 10000 });
               this._router.navigate(['/languages/list'])
        
        })
      }
      }
  
  onSubmitAccountDetails(value:any) {
    console.log(value);
  }

  onSubmitUserDetails(value:any) {
    console.log(value);
  }
  get f() { return this.languageForm.controls; }
}

