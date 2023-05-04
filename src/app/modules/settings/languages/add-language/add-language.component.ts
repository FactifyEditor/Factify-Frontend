import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role, User, Language } from 'src/app/models';
// import { NotificationService } from 'src/app/services/notification.service';
import { LanguageService } from 'src/app/services/settings/language.service';
import { SharedService } from 'src/app/services/shared/shared.service';
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
  buttonText: string = "Save"
  headerText: string = "Create"
  langulage: Language;
  preview:string
  percentDone: number;
  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    // private notificationService:NotificationService,
    private _router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private sharedService:SharedService
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
  fontFileName: string;
  ngOnInit() {
    this.langulage=new Language()
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initForm(this.langulage)
    if (id != null) {
      this.languageService.getLanguage(id).subscribe((langulage) => {
        this.langulage = langulage.data;
        if(this.langulage.font)
        this.fontFileName=this.getFileNameFromUrl(this.langulage.font)
        this.initForm(this.langulage);
        this.buttonText = 'Update';
        this.headerText = "Edit";
      });
    }
    else{
      this.initForm(this.langulage)
    }
    
  }
  initForm(langulage:Language) {
    this.languageForm = this.fb.group({
      language: [langulage?.language || '', Validators.required],
      value: [langulage?.value || ''],
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
      let _language: any = {
        language: this.languageForm.value.language,
        value: this.languageForm.value.value,
        font:this.langulage.font
      }
     if(!!this.langulage._id)
     this.languageService.updateLanguage(_language,this.langulage._id).subscribe(
      result => {
        // Handle result
        console.log(result);

      },
      error => {
        console.log("error", error);
        this.toastService.show(JSON.stringify(error), { classname: 'bg-danger text-dark', delay: 10000 });
      },
      () => {
        this.toastService.show('Language Updated', { classname: 'bg-success text-dark', delay: 10000 });
        this._router.navigate(['/languages/list'])

      })
      else{
        this.languageService.addLanguage(_language).subscribe(
          result => {
            // Handle result
            console.log(result);
          },
          error => {
            console.log("error", error);
            this.toastService.show(JSON.stringify(error), { classname: 'bg-danger text-dark', delay: 10000 });
          },
          () => {
            this.toastService.show('New Language Added', { classname: 'bg-success text-dark', delay: 10000 });
            this._router.navigate(['/languages/list'])
  
          })
      }
     
    }
  }

  onSubmitAccountDetails(value: any) {
    console.log(value);
  }

  onSubmitUserDetails(value: any) {
    console.log(value);
  }
  get f() { return this.languageForm.controls; }

  uploadFont(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
  
    }
    reader.readAsDataURL(file);
    this.uploadFile(file)
  }
  private getFileNameFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
  uploadFile(file) {
    var formData: any = new FormData();
    formData.append("image", file);
    this.sharedService
      .uploadFile(formData)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.percentDone = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.percentDone}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            this.percentDone = 0;
            this.langulage.font=event.body.data[0].url;
            this.preview=this.langulage.font
            this.fontFileName=this.getFileNameFromUrl(this.langulage.font)
          // this.router.navigate(['users-list'])
        }
      });
  }
}

