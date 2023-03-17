import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TemplateService } from 'src/app/services/settings/template.service';

@Component({
  selector: 'app-image-template-list',
  templateUrl: './image-template-list.component.html',
  styleUrls: ['./image-template-list.component.css']
})
export class ImageTemplateListComponent  implements OnInit{
  constructor(private templateService:TemplateService){
  }
  @Output() selectThemeEvent = new EventEmitter<any>();
  imageTemplate$:Observable<any>
  ngOnInit(): void {
    this.imageTemplate$=this.templateService.getAllImageTemplate()
  }
  onSelectTheme(themId:any){
    this.selectThemeEvent.next(themId)
  }

}
