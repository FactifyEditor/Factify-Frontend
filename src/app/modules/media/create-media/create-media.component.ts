import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MediaService } from 'src/app/shared/services/media.service';
import Speech from 'speak-tts';
import {VideoModel,MediaModel} from 'src/app/models'
import { FileUploader } from 'ng2-file-upload';
import { Observable, timeout } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
const URL = 'http://localhost:8080/api/upload';
import { HttpClient, HttpRequest,HttpEventType, HttpEvent, HttpHeaders } from '@angular/common/http';
import { RatingServiceService } from 'src/app/services/settings/rating-service.service';
import { LanguageService } from 'src/app/services/settings/language.service';
import { TemplateService } from 'src/app/services/settings/template.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared/shared.service';
import {MediaService} from 'src/app/services/media.service'
import { ToasterComponent } from 'src/app/modules/shared/toaster/toaster.component';
import { ToastService } from 'src/app/services/shared/toast.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-media',
  templateUrl: './create-media.component.html',
  styleUrls: ['./create-media.component.css']
})
export class CreateMediaComponent implements OnInit {
  language:any;
  private baseUrl = environment.BASE_URL;
  processingVideo=false;
  ratings$:Observable<any>;
  languages:any=[];
  imageTemplate:any;
  videoTemplate:any;
  selectedLanguage = undefined;
  selectedRating = undefined;
  submitted:boolean=false;
  feed:any;
  images={
    claim:{imageUrl:undefined,audioUrl:undefined,name:''},
    verify1:{imageUrl:undefined,audioUrl:undefined,name:''},
    verify2:{imageUrl:undefined,audioUrl:undefined,name:''},
    verify3:{imageUrl:undefined,audioUrl:undefined,name:''},
    verify4:{imageUrl:undefined,audioUrl:undefined,name:''},
    rating:{imageUrl:undefined,audioUrl:undefined,name:''},
    imageTemplate:{imageUrl:undefined,audioUrl:undefined,name:''}
  }
  audios={
    claim:{imageUrl:undefined,audioUrl:undefined,name:'',duration:0},
    verify1:{imageUrl:undefined,audioUrl:undefined,name:'',duration:0},
    verify2:{imageUrl:undefined,audioUrl:undefined,name:'',duration:0},
    verify3:{imageUrl:undefined,audioUrl:undefined,name:'',duration:0},
    verify4:{imageUrl:undefined,audioUrl:undefined,name:'',duration:0},
    rating:{imageUrl:undefined,audioUrl:undefined,name:'',duration:0}
  }
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });
  speech: any;
  speechData:any
  form: any;
  yesNo = [
    { value: 'False', name: 'False' },
    { value: 'True', name: 'True' },
  ];
constructor(private http: HttpClient,
  private fb: FormBuilder,
  private ratingService:RatingServiceService,
  private languageService:LanguageService,
  private templateService:TemplateService,
  private mediaService:MediaService,
  private sharedService:SharedService,
  private _router: Router,
  private activatedRoute: ActivatedRoute,
  private toastService:ToastService,
  private cd: ChangeDetectorRef
  ) {
    this.speech = new Speech() // will throw an exception if not browser 
    if(this.speech .hasBrowserSupport()) { // returns a boolean
      console.log("speech synthesis supported")
      this.speech.init({'volume': 1,
      'lang': 'en-GB',
      'rate': 1,
      'pitch': 1,
      'voice':'Google UK English Male',
      'splitSentences': true,
      'listeners': {
          'onvoiceschanged': (voices) => {
              console.log("Event voiceschanged", voices)
          }
      }}).then((data) => {
          // The "data" object contains the list of available voices and the voice synthesis params
          console.log("Speech is ready, voices are available", data)
          this.speechData = data;
          data.voices.forEach(voice => {
          console.log(voice.name + " "+ voice.lang)
          });
      }).catch(e => {
          console.error("An error occured while initializing : ", e)
      })
  }
}
ngOnInit() {
   
    this.languageService.getAllLanguages().subscribe(language=>{
      this.languages=language.data
    })
    this.ratings$= this.ratingService.getAllRatings();
    this.templateService.getAllImageTemplate().subscribe(imageTemplates=>{
      this.imageTemplate=imageTemplates.data[0]
    })
    this.templateService.getAllVideoTemplate().subscribe(videoTemplates=>{
      this.videoTemplate=videoTemplates.data[0];
      console.log(this.videoTemplate);
    })    
   
    this.uploader.onAfterAddingFile = (file) => {
      file.file.name = "new name";
      //save in variable
      // newFileName = file.file.name;
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initForm()
    if (id != null) {
      this.mediaService.getMedia(id).subscribe((media) => {
        // console.log(media.data)
        this.feed=media.data
        this.initForm(this.feed);
        this.images['claim'].imageUrl= media.data.metaData.claim.claimImage;
        this.images['verify1'].imageUrl= media.data.metaData.verification1.verificationImage;
        this.images['verify2'].imageUrl= media.data.metaData.verification2.verificationImage;
        this.images['verify3'].imageUrl= media.data.metaData.verification3.verificationImage;
        this.images['rating'].imageUrl= media.data.metaData.rating.ratingImage;
        this.imageTemplate.factImage= media.data.metaData.imageJson.factImage;
        this.images.imageTemplate.imageUrl= media.data.metaData.imageJson.factImage;
        // this.langulage = langulage.data;
        // if(this.langulage.font)
        // this.fontFileName=this.getFileNameFromUrl(this.langulage.font)
        // this.initForm(this.langulage);
        // this.buttonText = 'Update';
        // this.headerText = "Edit";
      });
    }
    else{
      this.initForm()
    }
}
initForm(media?:any){
  let feed= media?.metaData;
  console.log(media?.language);
  // this.language
  //set language objet to form language
  this.form = this.fb.group({
    language: [media?.language._id ||"", Validators.required],
    link:     [media?.link||"", [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
    rating: [media?.rating ||"", Validators.required],
    audio: ['1', Validators.required],
    videoTheme: [media?.imageTemplate||"1",Validators.required],
    imageTheme: [media?.videoTemplate||"1",Validators.required],
    claimVideoFrameText: [feed?.claim?.frameText, Validators.required],
    claimTextToSpeechText: [feed?.claim?.TTSText,],
    claimImage: ['',  media?._id?'':Validators.required],
    claimVoice: [""],
    claimPerferTTS:[feed?.claim?.perferTTS ||true],
    claimTime:[feed?.claim?.time || 8, Validators.required],
    verify1VideoFrameText: [feed?.verification1?.frameText, Validators.required],
    verify1TextToSpeechText: [feed?.verification1?.TTSText],
    verify1Image: ['', media?._id?'':Validators.required],
    verify1Voice: [''],
    verify1PerferTTS:[feed?.verification1?.perferTTS ||true],
    verify1Time:[8, Validators.required],
    verify2VideoFrameText: [feed?.verification2?.frameText, Validators.required],
    verify2TextToSpeechText: [feed?.verification2?.TTSText],
    verify2Image: ['',  media?._id?'':Validators.required],
    verify2Voice: [''],
    verify2PerferTTS:[feed?.verification2?.perferTTS ||true],
    verify2Time:[feed?.verification2?.time || 8, Validators.required],
    verify3VideoFrameText: [feed?.verification2?.frameText, Validators.required],
    verify3TextToSpeechText: [feed?.verification2?.TTSText],
    verify3Image: ['',  media?._id?'':Validators.required],
    verify3Voice: [''],
    verify3PerferTTS:[feed?.verification3?.perferTTS ||true],
    verify3Time:[feed?.verification3?.time || 8, Validators.required],
    ratingVideoFrameText: [feed?.rating?.frameText, Validators.required],
    ratingTextToSpeechText: [feed?.rating?.TTSText],
    ratingImage: ['',  media?._id?'':Validators.required],
    ratingVoice: [''],
    ratingPerferTTS:[feed?.rating?.perferTTS ||true],
    ratingTime:[feed?.rating?.time || 8, Validators.required],
    imageText:[feed?.rating?.frameText, Validators.required],
    image:['',  media?._id?'':Validators.required],
    claimTimeSetting:[false],
    verify1TimeSetting:[false],
    verify2TimeSetting:[false],
    verify3TimeSetting:[false],
    ratingTimeSetting:[false]
  });

}
OnSelectThemeImageEvent(event:any){
this.imageTemplate=event;
let element:HTMLElement = document.getElementById('close_image') as HTMLElement;

element.click();
}
OnSelectThemeVideoEvent(event:any){
this.videoTemplate=event;
let element:HTMLElement = document.getElementById('close_video') as HTMLElement;
element.click();
}
textToSpeech(text){
    this.speech.speak({
      text: text,
  }).then((data) => {
    console.log(data);
      console.log("Success !")
  }).catch(e => {
      console.error("An error occurred :", e) 
  })
}
processVideo(form: FormGroup){
// console.log(this.form.value.language);
let selectedLanguage=this.languages.find(x=>x._id==this.form.value.language);
this.submitted = true; 
let isInValid:boolean=false;
if(this.form.get('claimPerferTTS').value){
    this.form.get('claimTextToSpeechText').addValidators(Validators.required);  
    this.form.controls.claimTextToSpeechText.updateValueAndValidity();             
} else {                
    // add validation 
    if(this.form.controls.claimVoice.value=='' && this.form.get('claimPerferTTS').value==''){
      this.toastService.show("please upload audio  for claim", { classname: 'bg-danger text-dark', delay: 10000 });
      isInValid=true
    }
}
if(this.form.get('verify1PerferTTS').value){
  this.form.get('verify1TextToSpeechText').addValidators(Validators.required);     
  this.form.controls.verify1TextToSpeechText.updateValueAndValidity();             

} else {                
  // add validation  
  if(this.form.get('verify1PerferTTS').value=="" && this.form.controls.verify1Voice.value=='' ){
    this.toastService.show("please upload verification 1 audio", { classname: 'bg-danger text-dark', delay: 10000 });
    isInValid=true;
  }
 

}
if(this.form.get('verify2PerferTTS').value){
  this.form.get('verify2TextToSpeechText').addValidators(Validators.required); 
  this.form.controls.verify2TextToSpeechText.updateValueAndValidity();             
} else {                 
  if(this.form.get('verify2PerferTTS').value=="" && this.form.controls.verify2Voice.value==''){
    this.toastService.show("please upload verification 2 audio", { classname: 'bg-danger text-dark', delay: 10000 });
    isInValid=true;
  }
}
if(this.form.get('verify3PerferTTS').value){
  this.form.get('verify3TextToSpeechText').addValidators(Validators.required);    
  this.form.controls.verify3TextToSpeechText.updateValueAndValidity();             
} else {                
  if(this.form.get('verify3PerferTTS').value=="" && this.form.controls.verify1Voice.value==''){
    this.toastService.show("please upload verification 3 audio", { classname: 'bg-danger text-dark', delay: 10000 });
    isInValid=true;
  }
}
if(this.form.get('ratingPerferTTS').value){
  this.form.get('ratingTextToSpeechText').addValidators(Validators.required);  
  this.form.controls.ratingTextToSpeechText.updateValueAndValidity();             
} else {                
  if(this.form.get('ratingPerferTTS').value=="" &&  this.form.controls.ratingVoice.value==''){
    this.toastService.show("please upload rating 3 audio", { classname: 'bg-danger text-dark', delay: 10000 });
    isInValid=true;
  }
}
console.log(this.images)
if(this.images.imageTemplate.imageUrl==undefined){
  this.toastService.show("please upload image  for image", { classname: 'bg-danger text-dark', delay: 10000 });
  isInValid=true
}

if(this.images.claim.imageUrl==undefined){
  this.toastService.show("please upload image  for claim", { classname: 'bg-danger text-dark', delay: 10000 });
  isInValid=true
}
if(this.images.verify1.imageUrl==undefined){
  this.toastService.show("please upload image  for verification ", { classname: 'bg-danger text-dark', delay: 10000 });
  isInValid=true
}
if(this.images.verify2.imageUrl==undefined){
  this.toastService.show("please upload image  for verification 2", { classname: 'bg-danger text-dark', delay: 10000 });
  isInValid=true
}
if( this.images.verify3==undefined){
  this.toastService.show("please upload image  for verification 3", { classname: 'bg-danger text-dark', delay: 10000 });
  isInValid=true
}
if( this.images.rating.imageUrl==undefined){
  this.toastService.show("please upload image  for rating", { classname: 'bg-danger text-dark', delay: 10000 });
  isInValid=true
}
console.log("test")
if (this.form.invalid ||   isInValid  ) {
  return;
}
let languageTracks=this.videoTemplate.languages.find(language=>language._id==this.form.value.language);
console.log(languageTracks)

this.cd.detectChanges();
  console.log(JSON.stringify(this.form.value, null, 2));

try {
  

this.processingVideo=true;

this.videoTemplate.scenes[1].layers[1].text=this.form.value.claimVideoFrameText;
this.videoTemplate.scenes[1].layers[2].src=this.images['claim'].imageUrl;
this.videoTemplate.scenes[2].layers[2].fontURL=selectedLanguage.font;
this.videoTemplate.scenes[2].layers[2].text=this.form.value.verify1VideoFrameText;
this.videoTemplate.scenes[2].layers[1].src=this.images['verify1'].imageUrl;
this.videoTemplate.scenes[3].layers[1].fontURL=selectedLanguage.font;
this.videoTemplate.scenes[3].layers[1].text=this.form.value.verify2VideoFrameText;
this.videoTemplate.scenes[3].layers[2].src=this.images['verify2'].imageUrl;
this.videoTemplate.scenes[4].layers[1].fontURL=selectedLanguage.font;
this.videoTemplate.scenes[4].layers[1].text=this.form.value.verify3VideoFrameText;
this.videoTemplate.scenes[4].layers[2].src=this.images['verify3'].imageUrl;
this.videoTemplate.scenes[5].layers[1].fontURL=selectedLanguage.font;
this.videoTemplate.scenes[5].layers[1].text=this.form.value.ratingVideoFrameText;
this.videoTemplate.scenes[5].layers[2].src=this.images['rating'].imageUrl;
this.videoTemplate.scenes[1].layers[2].src=this.images['claim'].imageUrl;

// this.videoTemplate.scenes[7].layers[2].src=this.audios[''].audioUrl;


//intro
this.videoTemplate.scenes[7].audioUrl= languageTracks.introTrack;
this.videoTemplate.scenes[7].name="intro";
//headline
this.videoTemplate.scenes[8].audioUrl= languageTracks.headlineTrack;
this.videoTemplate.scenes[8].startingTime=3.6
this.videoTemplate.scenes[8].duration= 8
this.videoTemplate.scenes[8].name="headlineTrack";
//verification track
this.videoTemplate.scenes[9].audioUrl= languageTracks.verificationTrack;
this.videoTemplate.scenes[9].startingTime=11.6
this.videoTemplate.scenes[9].duration= 32;
this.videoTemplate.scenes[9].name="verificationTrack";

this.videoTemplate.scenes[10].audioUrl= languageTracks.outroTrack;
this.videoTemplate.scenes[10].startingTime=44.6;
this.videoTemplate.scenes[10].name="outroTrack";
//headline audio
if(!this.videoTemplate.scenes[11])
this.videoTemplate.scenes.push({
        type: "AudioScene",
        audioUrl: this.audios['claim'].audioUrl,
        cutFrom: 0,
        startingTime: 3.6,
        duration: 8,
        name:"headlineAudio"
})
//verification 1 audio
if(!this.videoTemplate.scenes[12])
this.videoTemplate.scenes.push({
  type: "AudioScene",
  audioUrl: this.audios['verify1'].audioUrl,
  cutFrom: 0,
  startingTime: 11.6,
  duration: 8,
  name:"verify1"
})
//verification 2 audio
if(!this.videoTemplate.scenes[13])
this.videoTemplate.scenes.push({
  type: "AudioScene",
  audioUrl: this.audios['verify2'].audioUrl,
  cutFrom: 0,
  startingTime: 19.6,
  duration: 8,
  name:"verify2"
})
//verification 3 audio
if(!this.videoTemplate.scenes[14])
this.videoTemplate.scenes.push({
  type: "AudioScene",
  audioUrl: this.audios['verify3'].audioUrl,
  cutFrom: 0,
  startingTime: 27.6,
  duration: 8,
  name:"verify3"
})
//rating audio
if(!this.videoTemplate.scenes[15])
this.videoTemplate.scenes.push({
  type: "AudioScene",
  audioUrl: this.audios['rating'].audioUrl,
  cutFrom: 0,
  startingTime: 36.6,
  duration: 8,
  name:"rating"
})
//outro track
this.imageTemplate.imageText=this.form.value.imageText;
this.imageTemplate.factImage=this.images.imageTemplate.imageUrl;
const headlineTtsText = this.mediaService.getAudioFromText({languageCode:selectedLanguage.value,ttsText:this.form.value.claimTextToSpeechText });
const verify1TtsText = this.mediaService.getAudioFromText({languageCode:selectedLanguage.value,ttsText:this.form.value.verify1TextToSpeechText });
const verify2TtsText = this.mediaService.getAudioFromText({languageCode:selectedLanguage.value,ttsText:this.form.value.verify2TextToSpeechText });
const verify3TtsText = this.mediaService.getAudioFromText({languageCode:selectedLanguage.value,ttsText:this.form.value.verify3TextToSpeechText });
const ratingTtsText = this.mediaService.getAudioFromText({languageCode:selectedLanguage.value,ttsText:this.form.value.ratingTextToSpeechText });
forkJoin([headlineTtsText, verify1TtsText,verify2TtsText,verify3TtsText,ratingTtsText]).pipe(take(1)).subscribe( result => {
this.videoTemplate.scenes[11].audioUrl=result[0].data
// this.videoTemplate.scenes[11].duration=result[0].duration
this.videoTemplate.scenes[12].audioUrl=result[1].data
// this.videoTemplate.scenes[12].duration=result[1].duration
this.videoTemplate.scenes[13].audioUrl=result[2].data
// this.videoTemplate.scenes[13].duration=result[2].duration
this.videoTemplate.scenes[14].audioUrl=result[3].data
// this.videoTemplate.scenes[14].duration=result[3].duration
this.videoTemplate.scenes[15].audioUrl=result[4].data
// this.videoTemplate.scenes[15].duration=result[4].duration

let _media:MediaModel={
  rating:this.form.value.rating,
  link:this.form.value.link,
  language:selectedLanguage,
  imageTemplate:this.imageTemplate._id,
  videoTemplate:this.videoTemplate._id,
  metaData:{
    claim:{
      frameText:this.form.value.claimVideoFrameText,
      TTSText:this.form.value.claimTextToSpeechText,
      claimImage:this.images['claim'].imageUrl,
      claimVoice:this.audios['claim'].audioUrl,
      perferTTS:this.form.value.claimPerferTTS,
      time:this.form.value.claimTime,
    },
    verification1:{
      frameText:this.form.value.verify1VideoFrameText,
      TTSText:this.form.value.verify1TextToSpeechText,
      verificationImage:this.images['verify1'].imageUrl,
      verificationVoice:this.audios['verify1'].audioUrl,
      perferTTS:this.form.value.verify1PerferTTS,
      time:this.form.value.verify1Time,
    },
    verification2:{
      frameText:this.form.value.verify2VideoFrameText,
      TTSText:this.form.value.verify2TextToSpeechText,
      verificationImage:this.images['verify2'].imageUrl,
      verificationVoice:this.audios['verify2'].audioUrl,
      perferTTS:this.form.value.verify2PerferTTS,
      time:this.form.value.verify2Time,
    },
    verification3:{
      frameText:this.form.value.verify3VideoFrameText,
      TTSText:this.form.value.verify3TextToSpeechText,
      verificationImage:this.images['verify3'].imageUrl,
      verificationVoice:this.audios['verify3'].audioUrl,
      perferTTS:this.form.value.verify3PerferTTS,
      time:this.form.value.verify3Time,
    },
    rating:{
      frameText:this.form.value.ratingVideoFrameText,
      TTSText:this.form.value.ratingTextToSpeechText,
      ratingImage:this.images['rating'].imageUrl,
      ratingVoice:this.audios['rating'].audioUrl,
      perferTTS:this.form.value.ratingPerferTTS,
      time:this.form.value.ratingTime,
    },
    videoJson:this.videoTemplate,
    imageJson:this.imageTemplate
  }
}
if(this.feed){
  _media["_id"]=this.feed._id;
  this.mediaService.updateMedia(_media,_media["_id"]).subscribe(
    result => {
      console.log(result);
    },
    error => {
      console.log("error",error);
      this.toastService.show(JSON.stringify(error), { classname: 'bg-dander text-dark', delay: 10000 });
      this.processingVideo=false;
      // this.notificationService.showError(error.error.error)
    },
    () => {
      this.processingVideo=false;
           this.toastService.show('New Feed Updated', { classname: 'bg-success text-dark', delay: 10000 });
            this._router.navigate(['/feed/list']);
    
  })
}
else{
  this.mediaService.createMedia(_media).subscribe(
    result => {
      console.log(result);
    },
    error => {
      console.log("error",error);
      this.toastService.show(JSON.stringify(error), { classname: 'bg-dander text-dark', delay: 10000 });
      this.processingVideo=false;
      // this.notificationService.showError(error.error.error)
    },
    () => {
      this.processingVideo=false;
           this.toastService.show('New Feed Added', { classname: 'bg-success text-dark', delay: 10000 });
            this._router.navigate(['/feed/list']);
    
    })
}


});
} catch (error) {
  console.log(error);
  this.processingVideo=false;
}
}
get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
}
uploadImage(event:Event,type){
let file:any = (event.target as HTMLInputElement).files[0];
console.log(type)
console.log(file);

let name= `${type}_${new Date().getTime()}_${file.name}`;
// this.form.patchValue({
//   [type+'Image']: file
// })
this.images[type]={};
 var reader = new FileReader();
  reader.onload = (event: any) => {
    this.images[type].imageUrl = event.target.result;
  }
  reader.readAsDataURL(file);
  this.images[type].file=file;
  this.images[type].name=name;

  this.uploadFile(file,type,"images")
  // this.upload(file,name).subscribe((event: HttpEvent<any>) => {
  //   switch (event.type) {
  //     case HttpEventType.Sent:
  //       console.log('Request has been made!');
  //       break;
  //     case HttpEventType.ResponseHeader:
  //       console.log('Response header has been received!');
  //       break;
  //     case HttpEventType.UploadProgress:
  //       break;
  //     case HttpEventType.Response:
  //       console.log('User successfully created!', event.body);
  //       this.images[type] = event.body.data[0].url;
  //   }
  // });
}

uploadAudio(event:Event,type:any){
  let file:any = (event.target as HTMLInputElement).files[0];
  console.log(file.duration);
  let name= `${type}_${new Date().getTime()}_${file.name}`;
  // this.form.patchValue({
  //   [type+'Voice']: file
  // })
  this.audios[type]={};
  var self=this;
   var reader = new FileReader();
    reader.onload = (event: any) => {
      var media = new Audio(event.target.result);
     media.onloadedmetadata = function(){
    console.log(media.duration);
    self.audios[type].duration=media.duration // this would give duration of the video/audio file

    }; 
    this.audios[type].audioUrl = event.target.result;

    }
    reader.readAsDataURL(file);
    this.audios[type].file=file;
    this.audios[type].name=name;
    this.uploadFile(file,type,"audios")
}
onCheckChange(e){
  this.form.patchValue({
    isActive: e.target.checked
  });
}
uploadFile(file, type,uploadType) {
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
          // this.percentDone = Math.round((event.loaded / event.total) * 100);
          console.log(`Uploaded! ${ Math.round((event.loaded / event.total) * 100)}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          // this.percentDone = false;
        if(uploadType=='images')
          this[uploadType][type].imageUrl = event.body.data[0].url;
          else
        this[uploadType][type].audioUrl = event.body.data[0].url;
      }
    });
}
upload(file: File,name:any): Observable<any> {
  const formData = new FormData();
    formData.append('file', file,name);
    return this.http.post<any>(
      `${this.baseUrl}/upload`,
      formData
    );
}
createVideo(videoJson:VideoModel): Observable<any> {
  const header = new HttpHeaders({
    timeout: '600000',
  });
  this.processingVideo=true;
    return this.http.post<any>(
      `${this.baseUrl}/media/createVideo`,
      videoJson,{headers:header}
    );
}
downloadFile(){
  this.processingVideo=true;
  this.http.get(`https://storage.googleapis.com/fact_checker/audio3.mp4`, {responseType: "blob"})
  .subscribe(blob => {
    this.processingVideo=false;
  });

}
}
