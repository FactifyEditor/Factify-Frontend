import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormArray,AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-template-languages',
  templateUrl: './template-languages.component.html',
  styleUrls: ['./template-languages.component.css']
})
export class TemplateLanguagesComponent implements OnInit {
  constructor(private sharedService:SharedService){

  }
  percentDone: any = 0;
  @Input() language: any;
  preview:string;
 
  ngOnInit(): void {
    this.preview=this.language.image
  }
  uploadIntroFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
  
    }
    reader.readAsDataURL(file);
    this.uploadFile(file)
  }

  uploadFile(file) {
    var formData: any = new FormData();
    formData.append("image", file);
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
            this.language['image']=event.body.data[0].url;
            this.preview=this.language.image
          // this.router.navigate(['users-list'])
        }
      });
  }
}
