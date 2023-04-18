import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role, User, VideoTemplate } from 'src/app/models';
import { HttpEvent, HttpEventType } from '@angular/common/http';
// import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/settings/user.service';
import { TemplateService } from 'src/app/services/settings/template.service';
import { LanguageService } from 'src/app/services/settings/language.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterComponent } from 'src/app/modules/shared/toaster/toaster.component';
import { ToastService } from 'src/app/services/shared/toast.service';
@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css'],
})
export class AddTemplateComponent implements OnInit {
  languages: any;
  percentDone: any = 0;
  hide = true;
  roles$: Observable<any>;
  templateForm: FormGroup;
  submitted = false;
  preview: string;
  introPreview: string;
  outroPreview: string;
  buttonText:string='Add';
  headerText:String ="Add";

  template:VideoTemplate;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private templateService: TemplateService,
    private languageService: LanguageService,
    private sharedService:SharedService,
    // private notificationService:NotificationService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService:ToastService
  ) {}
  initForm(template){
    this.templateForm = this.fb.group({
      name: [template.name, Validators.required],
      description: [template.description, Validators.required],
      jsonTemplate: [JSON.stringify(template), [Validators.required]],
      image: ['', [Validators.required]],
      introVideo: ['', [Validators.required]],
      outroVideo: ['', [Validators.required]],
    });
    if (template?.image) {
      this.preview = template.image;
    }
    if(template._id){
      this.introPreview = template.scenes[0].layers[0].src;
      this.outroPreview = template.scenes[6].layers[0].src;
     }
  }
  validation_messages = {
    firstName: [{ type: 'required', message: 'First Name is required' }],
    lastName: [{ type: 'required', message: 'Last Name is required' }],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid mail' },
    ],
    mobile: [{ type: 'required', message: 'Mobile password is required' }],
    role: [{ type: 'required', message: 'Role is required' }],
  };
  ngOnInit() {
     const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.template=this.templateService.getTemplateJson();
    this.initForm(this.template)
    this.languageService.getAllLanguages().subscribe(language=>{
      this.languages=language.data;
      if (id != null) {
        this.templateService.getVideoTemplate(id).subscribe((template) => {
          this.template = template.data;
         this.languages=this.languages.map(langulage => {
          let lang= this.template.languages.find(l=>langulage._id==l._id);
          if(lang!=null)
          langulage= lang
          return langulage
          
           
         });
         this.initForm(this.template);
       });
       this.buttonText='Update';
       this.headerText="Edit";
     }
     this.initForm(this.template);
     })
  
  }

  uploadImageFile(event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files[0];
    this.templateForm.patchValue({
      image: file,
    });
    this.templateForm.get('image').updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.uploadFile(file,'image')
  }
  uploadIntroFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.templateForm.patchValue({
      introVideo: file,
    });
    this.templateForm.get('introVideo').updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.introPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.uploadFile(file,'introVideo')
  }
  uploadOutroFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.templateForm.patchValue({
      outroVideo: file,
    });
    this.templateForm.get('outroVideo').updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.outroPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.uploadFile(file,'outroVideo')
  }

  get templateFormControl() {
    return this.templateForm.controls;
  }

  submitForm(languages) {
    let _template:any ;
    console.log(languages);
    this.template.name=this.templateForm.value.name,
    this.template.description= this.templateForm.value.description,
    this.template.languages= languages,
    _template= this.template;
    
    if(!!this.template._id)
    this.templateService
      .updateVideoTemplate(_template,this.template._id).subscribe(
        result => {
          // Handle result
          console.log(result);
          
        },
        error => {
          console.log("error",error);
          this.toastService.show(error, { classname: 'bg-dander text-dark', delay: 10000 });

          // this.notificationService.showError(error.error.error)
          
        },
        () => {
               this.toastService.show(' Template Updated', { classname: 'bg-success text-dark', delay: 10000 });
                this._router.navigate(['/templates/videos-audio/list']);
        
        })
        else{
          this.templateService
          .addVideoTemplate(_template).subscribe(
            result => {
              // Handle result
              console.log(result);
              
            },
            error => {
              console.log("error",error);
              this.toastService.show(error, { classname: 'bg-dander text-dark', delay: 10000 });
    
              // this.notificationService.showError(error.error.error)
              
            },
            () => {
                   this.toastService.show('New Template Added', { classname: 'bg-success text-dark', delay: 10000 });
                    this._router.navigate(['/templates/videos-audio/list']);
            
            })
        }
    
      
    
  }
  uploadFile(file, type) {
    var formData: any = new FormData();
    formData.append(type, file);
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

            this.percentDone = false;
            this.template[type] = event.body.data[0].url;
            if (type == 'introVideo'){
              this.introPreview = this.template[type];
              this.template.scenes[0].layers[0].src=this.template[type];
            } 
            if (type == 'outroVideo') {
              this.outroPreview = this.template[type];
              this.template.scenes[6].layers[0].src=this.template[type];
            }
            if (type == 'image')
              this.preview = this.template[type];
        }
      });
  }
  onSubmitAccountDetails(value: any) {
    console.log(value);
  }

  onSubmitUserDetails(value: any) {
    console.log(value);
  }
  get f() {
    return this.templateForm.controls;
  }

  get formArray() {
    return this.templateForm.get('languages') as FormArray;
  }
}
