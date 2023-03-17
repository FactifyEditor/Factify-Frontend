import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TemplateService } from 'src/app/services/settings/template.service';

@Component({
  selector: 'app-video-template-list',
  templateUrl: './video-template-list.component.html',
  styleUrls: ['./video-template-list.component.css']
})
export class VideoTemplateListComponent implements OnInit{
  constructor(private templateService:TemplateService){

  }
  @Output() selectThemeEvent = new EventEmitter<any>();
  videoTemplate$:Observable<any>
  ngOnInit(): void {
    this.videoTemplate$=this.templateService.getAllVideoTemplate()
  }
  onSelectTheme(themId:any){
    this.selectThemeEvent.next(themId)
  }

}