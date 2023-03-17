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
import { RatingServiceService } from 'src/app/services/settings/rating-service.service';
import { LanguageService } from 'src/app/services/settings/language.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/shared/toast.service';
@Component({
  selector: 'app-create-rating',
  templateUrl: './create-rating.component.html',
  styleUrls: ['./create-rating.component.css'],
})
export class CreateRatingComponent implements OnInit {
  languages$: Observable<any>;
  percentDone: any = 0;
  roles$: Observable<any>;
  ratingForm: FormGroup;
  submitted = false;
  preview: string;
  buttonText:string='Add';
  headerText:String ="Add";
  rating: any = {};
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private ratingService: RatingServiceService,
    private languageService: LanguageService,
    private sharedService: SharedService,
    // private notificationService:NotificationService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    public toastService: ToastService
  ) {}

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

  initForm(rating) {
    this.ratingForm = this.fb.group({
      rating: [rating?.rating || '', Validators.required],
      description: [rating?.description || '', Validators.required],
      image: [rating?.image || '', [Validators.required]],
    });
    if (rating?.image) {
      this.preview = rating.image;
    }
  }
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.ratingService.getRating(id).subscribe((rating) => {
        this.rating = rating.data;
        this.initForm(this.rating);
      });
      this.buttonText='Update';
      this.headerText="Edit";
    }
    this.initForm(this.rating);
    this.languages$ = this.languageService.getAllLanguages(); 

    
  }

  uploadImageFile(event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files[0];
    this.ratingForm.patchValue({
      image: file,
    });
    this.ratingForm.get('image').updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.uploadFile(file, 'image');
  }

  submitForm(languages) {
    let _rating: any = {
      rating: this.ratingForm.value.rating,
      description: this.ratingForm.value.description,
      image: this.rating.image,
      languages: languages,
    };

    this.ratingService.addRating(_rating)
    .subscribe(
      result => {
        // Handle result
        console.log(result);
        
      },
      error => {
        console.log("error",error);
        this.toastService.show(error, { classname: 'bg-dander text-dark', delay: 10000 });
      },
      () => {
             this.toastService.show('New Rating Added', { classname: 'bg-success text-dark', delay: 10000 });
        this._router.navigate(['/ratings/list']);
      })
      
    
  }
  uploadFile(file, type) {
    var formData: any = new FormData();
    formData.append(type, file);
    this.sharedService
      .addVideoTemplate(formData)
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
            this.rating[type] = event.body.data[0].url;
            if (type == 'image') this.preview = this.rating[type];

        }
      });
  }
  get f() {
    return this.ratingForm.controls;
  }
}
