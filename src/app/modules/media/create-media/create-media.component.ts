import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MediaService } from 'src/app/shared/services/media.service';
import Speech from 'speak-tts';
import { VideoModel, MediaModel } from 'src/app/models'
import { FileUploader } from 'ng2-file-upload';
import { Observable, timeout } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
const URL = 'http://localhost:8080/api/upload';
import { HttpClient, HttpRequest, HttpEventType, HttpEvent, HttpHeaders } from '@angular/common/http';
import { RatingServiceService } from 'src/app/services/settings/rating-service.service';
import { LanguageService } from 'src/app/services/settings/language.service';
import { TemplateService } from 'src/app/services/settings/template.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared/shared.service';
import { MediaService } from 'src/app/services/media.service'
import { ToasterComponent } from 'src/app/modules/shared/toaster/toaster.component';
import { ToastService } from 'src/app/services/shared/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-create-media',
  templateUrl: './create-media.component.html',
  styleUrls: ['./create-media.component.css']
})
export class CreateMediaComponent implements OnInit {
  
  private SELECT_FILE_ERROR = 'Please select a file to upload';
private UPLOAD_ERROR = 'Error while uploading the file';

  language: any;
  private baseUrl = environment.BASE_URL;
  processingVideo = false;
  ratings$: Observable<any>;
  languages: any = [];
  imageTemplate: any;
  videoTemplate: any;
  selectedLanguage = undefined;
  selectedRating = undefined;
  submitted: boolean = false;
  ttsSupportedLanguage: boolean = true;

  feed: any;
  imageType: string;
  images = {
    claim: { imageUrl: undefined, audioUrl: undefined, name: '' },
    verify1: { imageUrl: undefined, audioUrl: undefined, name: '' },
    verify2: { imageUrl: undefined, audioUrl: undefined, name: '' },
    verify3: { imageUrl: undefined, audioUrl: undefined, name: '' },
    verify4: { imageUrl: undefined, audioUrl: undefined, name: '' },
    rating: { imageUrl: undefined, audioUrl: undefined, name: '' },
    imageTemplate: { imageUrl: undefined, audioUrl: undefined, name: '' }
  }
  audios = {
    claim: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify1: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify2: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify3: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify4: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    rating: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },

    claimAudio: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify1Audio: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify2Audio: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify3Audio: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify4Audio: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    ratingAudio: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },

    claimTTS: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify1TTS: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify2TTS: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify3TTS: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    verify4TTS: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 },
    ratingTTS: { imageUrl: undefined, audioUrl: undefined, name: '', duration: 0 }
  }
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });
  speech: any;
  speechData: any
  form: any;
  yesNo = [
    { value: 'False', name: 'False' },
    { value: 'True', name: 'True' },
  ];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild('cropImageModelBtn', { static: true }) cropImageModelBtn: any;
  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private ratingService: RatingServiceService,
    private languageService: LanguageService,
    private templateService: TemplateService,
    private mediaService: MediaService,
    private sharedService: SharedService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private cd: ChangeDetectorRef,
    private audioService: AudioService
  ) {

  }
  onLanguageChange(arg0: EventTarget) {
    console.log(arg0);
    let selectedLanguage = this.languages.find(x => x._id == this.form.value.language);
    if(selectedLanguage.value="") {
     
      this.disableForm();
    }
    else {
     this.enableForm();
    }
    this.cd.detectChanges();
  }
  enableForm() {
      this.form.get('claimTextToSpeechText')?.enable();
      this.form.get('verify1TextToSpeechText')?.enable();
      this.form.get('verify2TextToSpeechText')?.enable();
      this.form.get('verify3TextToSpeechText')?.enable();
      this.form.get('ratingTextToSpeechText')?.enable();
      this.form.get('claimPerferTTS')?.enable();
      this.form.get('verify1PerferTTS')?.enable();
      this.form.get('verify2PerferTTS')?.enable();
      this.form.get('verify3PerferTTS')?.enable();
      this.form.get('ratingPerferTTS')?.enable();
  }
  disableForm(){
    this.form.get('claimTextToSpeechText')?.disable();
    this.form.get('verify1TextToSpeechText')?.disable();
    this.form.get('verify2TextToSpeechText')?.disable();
    this.form.get('verify3TextToSpeechText')?.disable();
    this.form.get('ratingTextToSpeechText')?.disable();
    this.form.get('claimPerferTTS')?.disable();
    this.form.get('verify1PerferTTS')?.disable();
    this.form.get('verify2PerferTTS')?.disable();
    this.form.get('verify3PerferTTS')?.disable();
    this.form.get('ratingPerferTTS')?.disable();
  }
  ngOnInit() {

    this.languageService.getAllLanguages().subscribe(language => {
      this.languages = language.data
    })
    this.ratings$ = this.ratingService.getAllRatings();
    this.templateService.getAllImageTemplate().subscribe(imageTemplates => {
      if(this.imageTemplate==undefined)
      this.imageTemplate = imageTemplates.data[0]
    })
    this.templateService.getAllVideoTemplate().subscribe(videoTemplates => {
      if(this.videoTemplate==undefined)
      this.videoTemplate = videoTemplates.data[0];
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
        this.feed = media.data
        this.initForm(this.feed);
        this.images['claim'].imageUrl = media.data.metaData.claim.claimImage;
        this.audios.claimAudio.audioUrl = media.data.metaData.claim.claimVoice;
        this.images['verify1'].imageUrl = media.data.metaData.verification1.verificationImage;
        this.audios.verify1Audio.audioUrl = media.data.metaData.verification1.verificationVoice;
        this.images['verify2'].imageUrl = media.data.metaData.verification2.verificationImage;
        this.audios.verify2Audio.audioUrl = media.data.metaData.verification2.verificationVoice;
        this.images['verify3'].imageUrl = media.data.metaData.verification3.verificationImage;
        this.audios.verify3Audio.audioUrl = media.data.metaData.verification3.verificationVoice;
        this.images['rating'].imageUrl = media.data.metaData.rating.ratingImage;
        this.audios.ratingAudio.audioUrl = media.data.metaData.rating.ratingVoice;
        this.imageTemplate.factImage = media.data.metaData?.imageJson?.factImage;
        this.images.imageTemplate.imageUrl = media.data.metaData?.imageJson?.factImage;
        this.imageTemplate=media.data.metaData?.imageJson;
        this.videoTemplate=media.data.metaData?.videoJson;
        // this.langulage = langulage.data;
        // if(this.langulage.font)
        // this.fontFileName=this.getFileNameFromUrl(this.langulage.font)
        // this.initForm(this.langulage);
        // this.buttonText = 'Update';
        // this.headerText = "Edit";
      });
    }
    else {
      this.initForm()
    }
  }
  initForm(media?: any) {
    let feed = media?.metaData;
    console.log(media?.language);

    this.form = this.fb.group({
      language: [media?.language._id || "", Validators.required],
      link: [media?.link || "", [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      rating: [media?.rating || "", Validators.required],
      audio: ['1', Validators.required],
      videoTheme: [media?.imageTemplate || "1", Validators.required],
      imageTheme: [media?.videoTemplate || "1", Validators.required],
      claimVideoFrameText: [feed?.claim?.frameText, Validators.required],
      claimTextToSpeechText: [feed?.claim?.TTSText,],
      claimImage: ['', media?._id ? '' : Validators.required],
      claimVoice: [""],
      claimPerferTTS: [feed?.claim ? feed.claim.perferTTS : true],
      claimTime: [feed?.claim?.time || 8, Validators.required],
      verify1VideoFrameText: [feed?.verification1?.frameText, Validators.required],
      verify1TextToSpeechText: [feed?.verification1?.TTSText],
      verify1Image: ['', media?._id ? '' : Validators.required],
      verify1Voice: [''],
      verify1PerferTTS: [feed?.claim ? feed.verification1.perferTTS : true],
      verify1Time: [feed?.verification1?.time || 8, Validators.required],
      verify2VideoFrameText: [feed?.verification2?.frameText, Validators.required],
      verify2TextToSpeechText: [feed?.verification2?.TTSText],
      verify2Image: ['', media?._id ? '' : Validators.required],
      verify2Voice: [''],
      verify2PerferTTS: [feed?.claim ? feed.verification2.perferTTS : true],
      verify2Time: [feed?.verification2?.time || 8, Validators.required],
      verify3VideoFrameText: [feed?.verification3?.frameText, Validators.required],
      verify3TextToSpeechText: [feed?.verification3?.TTSText],
      verify3Image: ['', media?._id ? '' : Validators.required],
      verify3Voice: [''],
      verify3PerferTTS: [feed?.claim ? feed.verification3.perferTTS : true],
      verify3Time: [feed?.verification3?.time || 8, Validators.required],
      ratingVideoFrameText: [feed?.rating?.frameText, Validators.required],
      ratingTextToSpeechText: [feed?.rating?.TTSText],
      ratingImage: ['', media?._id ? '' : Validators.required],
      ratingVoice: [''],
      ratingPerferTTS: [feed?.claim ? feed.rating.perferTTS : true],
      ratingTime: [feed?.rating?.time || 8, Validators.required],
      imageText: [feed?.imageJson?.imageText, Validators.required],
      image: ['', media?._id ? '' : Validators.required],
      claimTimeSetting: [feed?.claim?.claimTimeSetting || false],
      verify1TimeSetting: [feed?.verification1?.timeSetting || false],
      verify2TimeSetting: [feed?.verification2?.timeSetting || false],
      verify3TimeSetting: [feed?.verification3?.timeSetting || false],
      ratingTimeSetting: [feed?.rating?.timeSetting || false]
    });

    if (feed) {

    }
    // if(media.)
  }
  OnSelectThemeImageEvent(event: any) {
    this.imageTemplate = event;
    let element: HTMLElement = document.getElementById('close_image') as HTMLElement;

    element.click();
  }
  OnSelectThemeVideoEvent(event: any) {
    this.videoTemplate = event;
    let element: HTMLElement = document.getElementById('close_video') as HTMLElement;
    element.click();
  }
  textToSpeech(text) {
    this.speech.speak({
      text: text,
    }).then((data) => {
      console.log(data);
      console.log("Success !")
    }).catch(e => {
      console.error("An error occurred :", e)
    })
  }
  calculateDuration(claimDuration, verificationStartTime, verification1Duraton, verification2StartTime, verification2Duration, verification3StartTime, verification3Duration, ratingStartTime, ratingDuration) {
    //headline claim audio
    if (!this.videoTemplate.scenes[11])
      this.videoTemplate.scenes.push({
        type: "AudioScene",
        audioUrl: this.form.value.claimPerferTTS ? this.audios.claim.audioUrl : this.audios.claimAudio.audioUrl,
        cutFrom: 0,
        startingTime: 3.6,
        duration: claimDuration,
        name: "headlineAudio"
      })
    else {
      //headline claim audio
      this.videoTemplate.scenes[11] = {
        type: "AudioScene",
        audioUrl: this.form.value.claimPerferTTS ? this.audios.claim.audioUrl : this.audios.claimAudio.audioUrl,
        cutFrom: 0,
        startingTime: 3.6,
        duration: claimDuration,
        name: "headlineAudio"

      }
    }
    //verification1 audio
    if (!this.videoTemplate.scenes[12])
      this.videoTemplate.scenes.push({
        type: "AudioScene",
        audioUrl: this.form.value.verify1PerferTTS ? this.audios.verify1.audioUrl : this.audios.verify1Audio.audioUrl,
        cutFrom: 0,
        startingTime: verificationStartTime,
        duration: verification1Duraton,
        name: "verify1"
      })
    else {
      //verification 1 audio
      this.videoTemplate.scenes[12] = {
        type: "AudioScene",
        audioUrl: this.form.value.verify1PerferTTS ? this.audios.verify1.audioUrl : this.audios.verify1Audio.audioUrl,
        cutFrom: 0,
        startingTime: verificationStartTime,
        duration: verification1Duraton,
        name: "verify1"
      }
    }
    //verification 2 audio
    if (!this.videoTemplate.scenes[13])
      this.videoTemplate.scenes.push({
        type: "AudioScene",
        audioUrl: this.form.value.verify2PerferTTS ? this.audios.verify2.audioUrl : this.audios.verify2Audio.audioUrl,
        cutFrom: 0,
        startingTime: verification2StartTime,
        duration: verification2Duration,
        name: "verify2"
      })
    else {
      //verification 2 audio
      this.videoTemplate.scenes[13] = {
        type: "AudioScene",
        audioUrl: this.form.value.verify2PerferTTS ? this.audios.verify2.audioUrl : this.audios.verify2Audio.audioUrl,
        cutFrom: 0,
        startingTime: verification2StartTime,
        duration: verification2Duration,
        name: "verify2"
      }
    }
    //verification 3 audio
    if (!this.videoTemplate.scenes[14])
      this.videoTemplate.scenes.push({
        type: "AudioScene",
        audioUrl: this.form.value.verify3PerferTTS ? this.audios.verify3.audioUrl : this.audios.verify3Audio.audioUrl,
        cutFrom: 0,
        startingTime: verification3StartTime,
        duration: verification3Duration,
        name: "verify3"
      })
    else {
      // verification 3 audio
      this.videoTemplate.scenes[14] = {
        type: "AudioScene",
        audioUrl: this.form.value.verify3PerferTTS ? this.audios.verify3.audioUrl : this.audios.verify3Audio.audioUrl,
        cutFrom: 0,
        startingTime: verification3StartTime,
        duration: verification3Duration,
        name: "verify3"
      }
    }
    //rating audio
    if (!this.videoTemplate.scenes[15])
      this.videoTemplate.scenes.push({
        type: "AudioScene",
        audioUrl: this.form.value.ratingPerferTTS ? this.audios.rating.audioUrl : this.audios.ratingAudio.audioUrl,
        cutFrom: 0,
        startingTime: ratingStartTime,
        // duration: this.form.value.ratingTime || 8,
        duration: ratingDuration,
        name: "rating"
      })
    else {
      //rating audio
      this.videoTemplate.scenes[15] = {
        type: "AudioScene",
        audioUrl: this.form.value.ratingPerferTTS ? this.audios.rating.audioUrl : this.audios.ratingAudio.audioUrl,
        cutFrom: 0,
        startingTime: ratingStartTime,
        // duration: this.form.value.ratingTime || 8,
        duration: ratingDuration,
        name: "rating"
      }
    }
    //clamim video 
    this.videoTemplate.scenes[1].duration = claimDuration + 1
    //verification 1 video 
    this.videoTemplate.scenes[2].duration = verification1Duraton + 1
    //verification 2 video
    this.videoTemplate.scenes[3].duration = verification2Duration + 1
    //verification 3 video
    this.videoTemplate.scenes[4].duration = verification3Duration + 1
    //rating video
    this.videoTemplate.scenes[5].duration = ratingDuration + 1
  }
  async processVideo(form: FormGroup, draft: boolean = false) {
    // console.log(this.form.value.language);
    let selectedLanguage = this.languages.find(x => x._id == this.form.value.language);
    if (!draft)
      this.submitted = true;
    let isInValid: boolean = false;
    if (this.form.get('claimPerferTTS').value) {
      this.form.get('claimTextToSpeechText').addValidators(Validators.required);
      this.form.controls.claimTextToSpeechText.updateValueAndValidity();
    } else {
      // add validation 
      if (!draft && (this.audios.claimAudio.audioUrl == undefined && this.form.get('claimPerferTTS').value == false)) {
        this.toastService.show("please upload audio  for claim", { classname: 'bg-danger text-dark', delay: 10000 });
        isInValid = true
      }
    }
    if (this.form.get('verify1PerferTTS').value) {
      this.form.get('verify1TextToSpeechText').addValidators(Validators.required);
      this.form.controls.verify1TextToSpeechText.updateValueAndValidity();

    } else {
      // add validation  
      if (!draft && (this.form.get('verify1PerferTTS').value == false && this.audios.verify1Audio.audioUrl == undefined)) {
        this.toastService.show("please upload verification 1 audio", { classname: 'bg-danger text-dark', delay: 10000 });
        isInValid = true;
      }
    }
    if (this.form.get('verify2PerferTTS').value) {
      this.form.get('verify2TextToSpeechText').addValidators(Validators.required);
      this.form.controls.verify2TextToSpeechText.updateValueAndValidity();
    } else {
      if (!draft && (this.form.get('verify2PerferTTS').value == false && this.audios.verify2Audio.audioUrl == undefined)) {
        this.toastService.show("please upload verification 2 audio", { classname: 'bg-danger text-dark', delay: 10000 });
        isInValid = true;
      }
    }
    if (this.form.get('verify3PerferTTS').value) {
      this.form.get('verify3TextToSpeechText').addValidators(Validators.required);
      this.form.controls.verify3TextToSpeechText.updateValueAndValidity();
    } else {
      if (!draft && (this.form.get('verify3PerferTTS').value == false && this.audios.verify3Audio.audioUrl == undefined)) {
        this.toastService.show("please upload verification 3 audio", { classname: 'bg-danger text-dark', delay: 10000 });
        isInValid = true;
      }
    }
    if (this.form.get('ratingPerferTTS').value) {
      this.form.get('ratingTextToSpeechText').addValidators(Validators.required);
      this.form.controls.ratingTextToSpeechText.updateValueAndValidity();
    } else {
      if (!draft && (this.form.get('ratingPerferTTS').value == false && this.audios.ratingAudio.audioUrl == undefined)) {
        this.toastService.show("please upload rating 3 audio", { classname: 'bg-danger text-dark', delay: 10000 });
        isInValid = true;
      }
    }

    if (!draft && this.images.imageTemplate.imageUrl == undefined) {
      this.toastService.show("please upload image  for image", { classname: 'bg-danger text-dark', delay: 10000 });
      isInValid = true
    }

    if (!draft && this.images.claim.imageUrl == undefined) {
      this.toastService.show("please upload image  for claim", { classname: 'bg-danger text-dark', delay: 10000 });
      isInValid = true
    }
    if (!draft && this.images.verify1.imageUrl == undefined) {
      this.toastService.show("please upload image  for verification ", { classname: 'bg-danger text-dark', delay: 10000 });
      isInValid = true
    }
    if (!draft && this.images.verify2.imageUrl == undefined) {
      this.toastService.show("please upload image  for verification 2", { classname: 'bg-danger text-dark', delay: 10000 });
      isInValid = true
    }
    if (!draft && this.images.verify3 == undefined) {
      this.toastService.show("please upload image  for verification 3", { classname: 'bg-danger text-dark', delay: 10000 });
      isInValid = true
    }
    if (!draft && this.images.rating.imageUrl == undefined) {
      this.toastService.show("please upload image  for rating", { classname: 'bg-danger text-dark', delay: 10000 });
      isInValid = true
    }
    // console.log("test")
    if (!draft && (this.form.invalid || isInValid)) {
      return;
    }
    if (draft && this.form.value.language == "" || this.form.value.rating == "") {
      this.toastService.show("please select language and rating for draft", { classname: 'bg-danger text-dark', delay: 10000 });
      return;
    }
    let languageTracks = this.videoTemplate.languages.find(language => language._id == this.form.value.language);
    console.log(languageTracks)

    this.cd.detectChanges();
    console.log(JSON.stringify(this.form.value, null, 2));

    try {
      this.processingVideo = true;
      // claim
      this.videoTemplate.scenes[1].layers[2].text = this.form.value.claimVideoFrameText;
      this.videoTemplate.scenes[1].layers[3].src = this.images['claim'].imageUrl;
      this.videoTemplate.scenes[1].layers[2].fontURL = selectedLanguage.font;
      // verification1
      this.videoTemplate.scenes[2].layers[3].fontURL = selectedLanguage.font;
      this.videoTemplate.scenes[2].layers[3].text = this.form.value.verify1VideoFrameText;
      this.videoTemplate.scenes[2].layers[2].src = this.images['verify1'].imageUrl;
      // verification2
      this.videoTemplate.scenes[3].layers[2].fontURL = selectedLanguage.font;
      this.videoTemplate.scenes[3].layers[2].text = this.form.value.verify2VideoFrameText;
      this.videoTemplate.scenes[3].layers[3].src = this.images['verify2'].imageUrl;
      // verification3
      this.videoTemplate.scenes[4].layers[2].fontURL = selectedLanguage.font;
      this.videoTemplate.scenes[4].layers[2].text = this.form.value.verify3VideoFrameText;
      this.videoTemplate.scenes[4].layers[3].src = this.images['verify3'].imageUrl;
      // verification4
      this.videoTemplate.scenes[5].layers[2].fontURL = selectedLanguage.font;
      this.videoTemplate.scenes[5].layers[2].text = this.form.value.ratingVideoFrameText;
      this.videoTemplate.scenes[5].layers[3].src = this.images['rating'].imageUrl;

      //intro background track
      this.videoTemplate.scenes[7].audioUrl = languageTracks.introTrack;
      this.videoTemplate.scenes[7].name = "intro";
      //headline background track
      let claimDuration = this.form.value.claimTimeSetting ? this.audios.claimAudio.duration == 0 ? await this.getAudioDuration(this.audios.claimAudio.audioUrl) : this.audios.claimAudio.duration : this.form.value.claimTime || 8;
      console.log("claimDuration", claimDuration)
      this.videoTemplate.scenes[8].audioUrl = languageTracks.headlineTrack;
      this.videoTemplate.scenes[8].startingTime = 3.6
      this.videoTemplate.scenes[8].duration = claimDuration;
      this.videoTemplate.scenes[8].name = "headlineTrack";

      let verification1Duraton = this.form.value.verify1TimeSetting ? this.audios.claimAudio.duration == 0 ? await this.getAudioDuration(this.audios.verify1Audio.audioUrl) : this.audios.verify1Audio.duration : this.form.value.verify1Time || 8
      let verificationStartTime = claimDuration + verification1Duraton;
      let verification2Duration = this.form.value.verify2TimeSetting ? this.audios.claimAudio.duration == 0 ? await this.getAudioDuration(this.audios.verify2Audio.audioUrl) : this.audios.verify2Audio.duration : this.form.value.verify2Time || 8

      let verification2StartTime = verificationStartTime + verification2Duration;
      let verification3Duration = this.form.value.verify3TimeSetting ? this.audios.claimAudio.duration == 0 ? await this.getAudioDuration(this.audios.verify3Audio.audioUrl) : this.audios.verify3Audio.duration : this.form.value.verify3Time || 8

      let verification3StartTime = verification2StartTime + verification3Duration;
      let ratingDuration = this.form.value.ratingTimeSetting ? this.audios.claimAudio.duration == 0 ? await this.getAudioDuration(this.audios.ratingAudio.audioUrl) : this.audios.ratingAudio.duration : this.form.value.ratingTime || 8

      let ratingStartTime = verification3StartTime + ratingDuration;
      this.calculateDuration(claimDuration, verificationStartTime, verification1Duraton, verification2StartTime, verification2Duration, verification3StartTime, verification3Duration, ratingStartTime, ratingDuration)

      //outro track
      this.imageTemplate.imageText = this.form.value.imageText;
      this.imageTemplate.factImage = this.images.imageTemplate.imageUrl;
      const headlineTtsText = this.mediaService.getAudioFromText({ languageCode: selectedLanguage.value, ttsText: this.form.value.claimTextToSpeechText });
      const verify1TtsText = this.mediaService.getAudioFromText({ languageCode: selectedLanguage.value, ttsText: this.form.value.verify1TextToSpeechText });
      const verify2TtsText = this.mediaService.getAudioFromText({ languageCode: selectedLanguage.value, ttsText: this.form.value.verify2TextToSpeechText });
      const verify3TtsText = this.mediaService.getAudioFromText({ languageCode: selectedLanguage.value, ttsText: this.form.value.verify3TextToSpeechText });
      const ratingTtsText = this.mediaService.getAudioFromText({ languageCode: selectedLanguage.value, ttsText: this.form.value.ratingTextToSpeechText });
      forkJoin([headlineTtsText, verify1TtsText, verify2TtsText, verify3TtsText, ratingTtsText]).subscribe(result => {
        if (this.form.value.claimPerferTTS) {
          this.audios.claim.audioUrl = result[0].data;
          this.videoTemplate.scenes[11].audioUrl = result[0].data
          this.videoTemplate.scenes[11].duration = (this.form.value.claimTimeSetting ? result[0].duration : this.form.value.claimTime || 8)
          this.videoTemplate.scenes[1].duration = (this.form.value.claimTimeSetting ? result[0].duration : this.form.value.claimTime || 8) + 1
          claimDuration = this.videoTemplate.scenes[11].duration;
          verificationStartTime = 3.6 + claimDuration
        }
        if (this.form.value.verify1PerferTTS) {
          //verification 1
          // this.form.value.verify1TimeSetting &&
          this.audios.verify1.audioUrl = result[1].data;
          this.videoTemplate.scenes[12].audioUrl = result[1].data
          this.videoTemplate.scenes[2].duration = (this.form.value.verify1TimeSetting ? result[1].duration : this.form.value.verify1Time || 8) + 1
          this.videoTemplate.scenes[12].duration = (this.form.value.verify1TimeSetting ? result[1].duration : this.form.value.verify1Time || 8)
          this.videoTemplate.scenes[12].startingTime = verificationStartTime
          verification1Duraton = this.videoTemplate.scenes[12].duration;
          verification2StartTime = verificationStartTime + verification1Duraton;

        }
        if (this.form.value.verify2PerferTTS) {
          this.audios.verify2.audioUrl = result[2].data;
          this.videoTemplate.scenes[13].audioUrl = result[2].data
          this.videoTemplate.scenes[3].duration = (this.form.value.verify2TimeSetting ? result[2].duration : this.form.value.verify2Time || 8) + 1
          this.videoTemplate.scenes[13].duration = (this.form.value.verify2TimeSetting ? result[2].duration : this.form.value.verify2Time || 8)
          this.videoTemplate.scenes[13].startingTime = verification2StartTime;

          verification2Duration = this.videoTemplate.scenes[13].duration;
          verification3StartTime = verification2StartTime + verification2Duration;
        }
        if (this.form.value.verify3PerferTTS) {

          this.audios.verify3.audioUrl = result[3].data;
          this.videoTemplate.scenes[14].audioUrl = result[3].data
          this.videoTemplate.scenes[4].duration = (this.form.value.verify3TimeSetting ? result[3].duration : this.form.value.verify3Time || 8) + 1
          this.videoTemplate.scenes[14].duration = (this.form.value.verify3TimeSetting ? result[3].duration : this.form.value.verify3Time || 8)
          this.videoTemplate.scenes[14].startingTime = verification3StartTime;
          verification3Duration = this.videoTemplate.scenes[14].duration;
          ratingStartTime = verification3StartTime + verification3Duration;
        }
        if (this.form.value.ratingPerferTTS) {
          //Rating
          this.audios.rating.audioUrl = result[4].data;
          this.videoTemplate.scenes[15].audioUrl = result[4].data
          this.videoTemplate.scenes[5].duration = (this.form.value.ratingTimeSetting ? result[4].duration : this.form.value.ratingTime || 8) + 1
          this.videoTemplate.scenes[15].duration = (this.form.value.ratingTimeSetting ? result[4].duration : this.form.value.ratingTime || 8)
          ratingDuration = this.videoTemplate.scenes[15].duration;
          this.videoTemplate.scenes[15].startingTime = ratingStartTime;
        }
        verificationStartTime = 3.6 + claimDuration;
        verification2StartTime = verificationStartTime + verification1Duraton;
        verification3StartTime = verification2StartTime + verification2Duration;
        ratingStartTime = verification3StartTime + verification3Duration;
        this.calculateDuration(claimDuration, verificationStartTime, verification1Duraton, verification2StartTime, verification2Duration, verification3StartTime, verification3Duration, ratingStartTime, ratingDuration)

        //verification background track
        let varficationBackgroundDuration = verification1Duraton + verification2Duration + verification3Duration + ratingDuration; //this.videoTemplate.scenes[12].duration + this.videoTemplate.scenes[13].duration + this.videoTemplate.scenes[14].duration + this.videoTemplate.scenes[15].duration
        this.videoTemplate.scenes[9].audioUrl = languageTracks.verificationTrack;
        this.videoTemplate.scenes[9].startingTime = verificationStartTime
        this.videoTemplate.scenes[9].duration = varficationBackgroundDuration
        this.videoTemplate.scenes[9].name = "verificationTrack";
        //outro background track
        this.videoTemplate.scenes[10].audioUrl = languageTracks.outroTrack;
        this.videoTemplate.scenes[10].startingTime = verificationStartTime + varficationBackgroundDuration
        this.videoTemplate.scenes[10].name = "outroTrack";
        let _media: MediaModel = {
          rating: this.form.value.rating,
          link: this.form.value.link,
          language: selectedLanguage,
          imageTemplate: this.imageTemplate._id,
          videoTemplate: this.videoTemplate._id,
          metaData: {
            claim: {
              frameText: this.form.value.claimVideoFrameText,
              TTSText: this.form.value.claimTextToSpeechText,
              claimImage: this.images['claim'].imageUrl,
              claimVoice: this.audios['claimAudio'].audioUrl || "",
              perferTTS: this.form.value.claimPerferTTS,
              time: this.form.value.claimTime,
              claimTimeSetting: this.form.value.claimTimeSetting,

            },
            verification1: {
              frameText: this.form.value.verify1VideoFrameText,
              TTSText: this.form.value.verify1TextToSpeechText,
              verificationImage: this.images['verify1'].imageUrl,
              verificationVoice: this.audios['verify1Audio'].audioUrl || "",
              perferTTS: this.form.value.verify1PerferTTS,
              time: this.form.value.verify1Time,
              timeSetting: this.form.value.verify1TimeSetting
            },
            verification2: {
              frameText: this.form.value.verify2VideoFrameText,
              TTSText: this.form.value.verify2TextToSpeechText,
              verificationImage: this.images['verify2'].imageUrl,
              verificationVoice: this.audios['verify2Audio'].audioUrl || "",
              perferTTS: this.form.value.verify2PerferTTS,
              time: this.form.value.verify2Time,
              timeSetting: this.form.value.verify2TimeSetting
            },
            verification3: {
              frameText: this.form.value.verify3VideoFrameText,
              TTSText: this.form.value.verify3TextToSpeechText,
              verificationImage: this.images['verify3'].imageUrl,
              verificationVoice: this.audios['verify3Audio'].audioUrl || "",
              perferTTS: this.form.value.verify3PerferTTS,
              time: this.form.value.verify3Time,
              timeSetting: this.form.value.verify3TimeSetting
            },
            rating: {
              frameText: this.form.value.ratingVideoFrameText,
              TTSText: this.form.value.ratingTextToSpeechText,
              ratingImage: this.images['rating'].imageUrl,
              ratingVoice: this.audios['ratingAudio'].audioUrl || "",
              perferTTS: this.form.value.ratingPerferTTS,
              time: this.form.value.ratingTime,
              timeSetting: this.form.value.ratingTimeSetting
            },
            videoJson: this.videoTemplate,
            imageJson: this.imageTemplate
          },
          "audioStatus": 0,
          "imageStatus": 0,
          "videoStatus": 0,
          "audioUrl": "",
          "imageUrl": "",
          "videoUrl": "",
          draft: draft || false
        }
        if (draft)
          _media.draft = true;
        if (this.feed) {
          //_media["_id"] = this.feed._id;
          this.mediaService.updateMedia(_media, this.feed._id).subscribe(
            async resposse => {
              if (!_media.draft) {
                _media._id = this.feed._id;
                await this.processAll(_media);
              }
            },
            error => {
              console.log("error", error);
              this.toastService.show(JSON.stringify(error), { classname: 'bg-danger text-dark', delay: 10000 });
              this.processingVideo = false;
              // this.notificationService.showError(error.error.error)
            },
            async () => {

              this.processingVideo = false;
              this.toastService.show('New Feed Updated', { classname: 'bg-success text-dark', delay: 10000 });
              this._router.navigate(['/feed/list']);
            })
        }
        else {

          this.mediaService.createMedia(_media).subscribe(
            async response => {
              if (!_media.draft) {
                await this.processAll(response["data"]);
              }
            },
            error => {
              console.log("error", error);
              this.toastService.show(JSON.stringify(error), { classname: 'bg-danger text-dark', delay: 10000 });
              this.processingVideo = false;
              // this.notificationService.showError(error.error.error)
            },
            async () => {
              this.processingVideo = false;
              this.toastService.show('New Feed Added', { classname: 'bg-success text-dark', delay: 10000 });
              this._router.navigate(['/feed/list']);

            })
        }


      });
    } catch (error) {
      console.log(error);
      this.processingVideo = false;
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  base64ToFile(base64, fileName) {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return new File([blob], fileName, { type: mimeString });
  }

  processImageAfterCrop() {

    let file = this.croppedImage;
    let type = this.imageType;
    let name = `${type}_${new Date().getTime()}_${file.name}`;
    this.images[type] = {};
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.images[type].imageUrl = file
    }
    reader.readAsDataURL(file);
    this.images[type].file = file;
    this.images[type].name = name;

    this.uploadFile(file, type, "images")
  }
  processAll(data) {
    return new Promise((resolve, reject) => {
      let feed = data;
      feed.imageStatus = 1;
      feed.audioStatus = 1;
      feed.videoStatus = 1;
      let allImageTemplates = this.templateService.getImageTemplates();
      let selectedTemplate: any = allImageTemplates.find(template => template._id == feed.imageTemplate);
      let imageText = {
        claim: feed.metaData.claim.frameText,
        fact: feed.metaData.imageJson.imageText,
        ratingImage: "",
        factImage: feed.metaData.imageJson.factImage,
        html: selectedTemplate.html
      }
      let feedData = { ...feed, ...imageText }
      this.ratingService.getRating(feed.rating).subscribe(rating => {
        imageText.ratingImage = rating.data.image;
        console.log(feedData);
        this.mediaService.processAll(feedData).subscribe((data: any) => {
          feed.imageStatus = 2;
          feed.imageUrl = data.data;
          resolve(true);
        });
      })
    })


  }
  uploadImage(event: Event, type) {
    this.imageChangedEvent = event;
    let file: any = (event.target as HTMLInputElement).files[0];
    this.imageType = type;
    this.cropImageModelBtn.nativeElement.click();

  }
  // 
  getStartingTime(lastFrameTime, duration) {
    return lastFrameTime + duration;

  }
  uploadAudio(event: Event, type: any) {
    let file: any = (event.target as HTMLInputElement).files[0];
    console.log(file.duration);
    let name = `${type}_${new Date().getTime()}_${file.name}`;
    this.audios[type] = {};
    var self = this;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      var media = new Audio(event.target.result);
      media.onloadedmetadata = function () {
        console.log(media.duration);
        self.audios[type].duration = media.duration // this would give duration of the video/audio file
      };
      this.audios[type].audioUrl = event.target.result;
    }
    reader.readAsDataURL(file);
    this.audios[type].file = file;
    this.audios[type].name = name;
    this.uploadFile(file, type, "audios")
  }
  onCheckChange(e) {
    this.form.patchValue({
      isActive: e.target.checked
    });
  }
  uploadFile(file, type, uploadType) {
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
            console.log(`Uploaded! ${Math.round((event.loaded / event.total) * 100)}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            // this.percentDone = false;
            if (uploadType == 'images')
              this[uploadType][type].imageUrl = event.body.data[0].url;
            else {
              this[uploadType][type].audioUrl = event.body.data[0].url;
              console.log(this[uploadType][type].audioUrl)
            }
        }
      });
  }
  upload(file: File, name: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, name);
    return this.http.post<any>(
      `${this.baseUrl}/upload`,
      formData
    );
  }
  createVideo(videoJson: VideoModel): Observable<any> {
    const header = new HttpHeaders({
      timeout: '600000',
    });
    this.processingVideo = true;
    return this.http.post<any>(
      `${this.baseUrl}/media/createVideo`,
      videoJson, { headers: header }
    );
  }

  downloadFile() {
    this.processingVideo = true;
    this.http.get(`https://storage.googleapis.com/fact_checker/audio3.mp4`, { responseType: "blob" })
      .subscribe(blob => {
        this.processingVideo = false;
      });

  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.base64ToFile(event.base64, 'cropped-image.jpg');

  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  async getAudioDuration(url) {
    if (url == "" || url == undefined)
      return 0
    return new Promise((resolve, reject) => {
      this.audioService.getAudioDuration(url).subscribe(duration => {
        console.log(duration);
        resolve(duration);
      });
    })
  }
}
