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
  files:any=[]
  @Input() language: any;
  introPreview:string;
  headlinePreview:string;
  verificationPreview:string;
  outroPreview:string;
  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  ngOnInit(): void {
      this.introPreview = this.language["introTrack"];
      this.language.introTrack=this.language["introTrack"];
      this.outroPreview = this.language["outroTrack"];
      this.language.outroTrack=this.language["outroTrack"];
      this.verificationPreview = this.language["verificationTrack"];
      this.language.verificationTrack=this.language["verificationTrack"];
      this.headlinePreview = this.language["headlineTrack"]
      this.language.headlineTrack=this.language["headlineTrack"];
  }
  uploadIntroFile(event,type) {
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      console.log(type)
      if(type=='introTrack')
      this.introPreview = reader.result as string;
      if(type=='outroTrack')
      this.outroPreview = reader.result as string;
      if(type=='verificationTrack')
      this.verificationPreview = reader.result as string;
      if(type=='headlineTrack')
      this.headlinePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
    this.uploadFile(file,type)
  }

  uploadFile(file,type) {
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
            this.language[type]=event.body.data[0].url;
      if(type=='introTrack'){
        this.introPreview = this.language[type];
        this.language.introTrack=this.language[type];

      }
      if(type=='outroTrack'){
        this.outroPreview = this.language[type];
        this.language.outroTrack=this.language[type];

      }
      if(type=='verificationTrack'){
        this.verificationPreview = this.language[type];
        this.language.verificationTrack=this.language[type];

      }
      if(type=='headlineTrack'){
        this.headlinePreview = this.language[type]
        this.language.headlineTrack=this.language[type];
      }
    }
      });
  }
}
