import { Component ,OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {MediaService} from 'src/app/services/media.service'
import {TemplateService} from 'src/app/services/settings/template.service'

import { Observable } from 'rxjs';
import { RatingServiceService } from 'src/app/services/settings/rating-service.service';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.css']
})
export class MediaDetailComponent implements OnInit {
  constructor(
    private location: Location, 
    private mediaService:MediaService,
    private activatedRoute: ActivatedRoute,
    private templateService:TemplateService,
    private ratingService:RatingServiceService
    ) { }
   
  media$:Observable<any>
  ngOnInit(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.media$= this.mediaService.getMedia(id);
    }
   }
  cancel() {
    alert()
    this.location.back(); // <-- go back to previous location on cancel
  }
  processVideo(feed){
    feed.videoStatus=1;
   let  media= feed.metaData.videoJson
    media.id=media._id;
    this.mediaService.processVideo(feed).subscribe(data=>{
      console.log(data)
    })
    // this.mediaService.updateMedia(feed,feed._id).subscribe(data=>{
    //   console.log(data)
    // })
  }
  processAudio(feed){
    feed.audioStatus=1;
    let  media= feed.metaData.videoJson
    media.id=media._id;
    this.mediaService.processAudio(feed).subscribe(data=>{
      console.log(data);
    });
    // this.mediaService.updateMedia(feed,feed._id).subscribe(data=>{
    //   console.log(data)
    // })
  }
  processImage(data){
   let feed=data.data;
   feed.audioStatus=1;
    let allImageTemplates= this.templateService.getImageTemplates();
    let selectedTemplate:any = allImageTemplates.find(template=>template._id==feed.imageTemplate);
    let imageText= {
      claim:feed.metaData.claim.frameText,
      fact:feed.metaData.imageJson.imageText,
      ratingImage:"",
      factImage:feed.metaData.imageJson.factImage,
      html:selectedTemplate.html
    }
    let feedData={...feed,...imageText}
    this.ratingService.getRating(feed.rating).subscribe(rating=>{
   
    imageText.ratingImage=rating.data.image;  
    console.log(feedData);
    this.mediaService.processImage(feedData).subscribe();
    })
   
  }
}
