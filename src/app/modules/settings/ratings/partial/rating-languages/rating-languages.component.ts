import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-rating-languages',
  templateUrl: './rating-languages.component.html',
  styleUrls: ['./rating-languages.component.css']
})
export class RatingLanguagesComponent implements OnInit {
  constructor(){

  }
  @Input() language: any;
 
  ngOnInit(): void {
  }
}
