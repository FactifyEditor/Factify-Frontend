import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private baseURL = environment.BASE_URL;
  private renderURL = environment.RENDERER_URL;

  constructor(private http: HttpClient) { }

  getAllAudioTemplate(): Observable<any> {
    return this.http.get(`${this.baseURL}/template/audio`)
  }

  addAudioTemplate(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/template/audio`, data)
  }
  getImageTemplates(){
    return  [
      {
          "_id": "6416d78ea808d8d5975816ac",
          "name": "Theme 1",
          "description": "Theme 1",
          "image": "https://storage.googleapis.com/factify/aXYdkkiexfGWItLr1679115168095.png",
          "languages": [
              {
                  "language": "India English",
                  "_id": "6416d6dee9f4e02d3c8b75b6",
                  "image": "https://storage.googleapis.com/factify/pX4SrGfSYbk02SmW1679115176166.png",
                  "isEnabled": true
              },
              {
                  "language": "Hindi",
                  "_id": "6416d6f0e9f4e02d3c8b75b9",
                  "image": "https://storage.googleapis.com/factify/nblQPNXVE4QbUgaw1679115186218.png",
                  "isEnabled": true
              }
          ],
          "html":`<html>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href='https://fonts.googleapis.com/css?family=Nunito Sans' rel='stylesheet'>
      <style>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
              .container {
                position: relative;
                text-align: center;
                color: white;
              }
              
              .bottom-left {
                position: absolute;
                bottom: 8px;
                left: 16px;
              }
              
              .top-left {
                position: absolute;
                width: 500px;
                font-size: 1.7em;
                color:white;
                font-family: 'Nunito Sans';
                text-align: left;
                top: 120px;
                left: 80px;
              }
              
              .top-right {
                position: absolute;
                top: 8px;
                right: 16px;
              }
              
              .bottom-right {
                position: absolute;
                bottom: 8px;
                right: 16px;
              }
              
              .centered {
                position: absolute;
                top: 345px;
          left: 410px;
          width: 250px;
          font-size: 1.3em;
          color: #226099;
          font-family: 'Nunito Sans';
          text-align: left;
      
             
              }
              button {
        position: absolute;
        width: 200px;
        height: 100px;
        border-radius: 40px;
      }
      .btn {
        position: relative;
        display: inline-block;
        border: 0;
        border-radius: 30px;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        font-size: 14px;
      }
      .btn:hover {
        box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
      }
      .btn:active {
        transform: translateY(1px);
        box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.15);
      }
      .btn:focus {
        outline: none;
      }
      .btn--basic {
        background-color: #e3eacc;
        color: #455a00;
      }
      .btn--ghost {
        background-color: transparent;
        border: 1px solid #739600;
        color: #739600;
      }
      .btn--dark {
        background-color: #455a00;
        color: white;
      }
      .btn--action {
        background-color: #17A597;
        color: white;
      }
      .btn--danger {
        background-color: #ff0000;
        color: white;
      }
      .btn--link {
        background-color: transparent;
        color: #5786bd;
      }
      .btn--dropdown {
        padding-right: 3em;
      }
      .btn--dropdown:before {
        content: "";
        right: 24px;
        top: 22px;
        width: 2px;
        height: 6px;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        transform: rotate(-45deg);
      }
      .btn--dropdown:after {
        content: "";
        right: 20px;
        top: 22px;
        width: 2px;
        height: 6px;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        transform: rotate(45deg);
      }
      .fact-btn{
          position: absolute;
          font-size: 1em;
          height: 100px;
          color: white;
          font-family: 'Nunito Sans';
          text-align: center;
          top: 70px;
          left: 80px;
          max-height: 30px;
          max-width: 100px;
      
      }
      .claim-btn {
          position: absolute;
          font-size: 1em;
          height: 100px;
          color: white;
          font-family: 'Nunito Sans';
          text-align: center;
          top: 300px;
          left: 410px;
          max-height: 30px;
          max-width: 100px;
      }
      .rating{
        position: absolute;
          top: 660px;
          left: 620px;
          max-height: 60px;
      }
      .fact_image{
          position: absolute;
      
          color: white;
          font-family: 'Nunito Sans';
          text-align: center;
          top: 300px;
          left: 80px;
          max-width:300px
      
      }
      .footer{
          position: absolute;
          top: 670px;
          left: 80;
          max-width:300px
      }
      </style>
        <body>
          <div class="container">
              <img class="fact_image"  src="{{factImage}}">
              <img class="rating "  src="{{ratingImage}}">
              <img style="width:100%;" src="https://storage.googleapis.com/factify/z3rOWEpuCyocw2hX1678355786088.png">
              <button class="btn fact-btn btn--action">C L A I M</button>
              <div class="top-left">{{claim}}</div>
              <button class="btn claim-btn btn--action">F A C T</button>
              
              <div class="centered">{{fact}}</div>
                  <img class="footer" style="width:50%;"   src="https://storage.googleapis.com/factify/tzpY8NepK0CqIhpu1678355909448.png">
            </div>
          <div>
             
          <div>
        </body>  
      </html> `,
          "status": 0,
          "__v": 0
      },
      {
          "_id": "6416d7b6a808d8d5975816b0",
          "name": "Theme 2",
          "description": "Theme 2",
          "image": "https://storage.googleapis.com/factify/BufHvjAdD4IlIb3x1679115290604.png",
          "languages": [
              {
                  "language": "India English",
                  "_id": "6416d6dee9f4e02d3c8b75b6",
                  "image": "https://storage.googleapis.com/factify/wrq27r3z0QPSSVic1679115308952.png",
                  "isEnabled": true
              },
              {
                  "language": "Hindi",
                  "_id": "6416d6f0e9f4e02d3c8b75b9",
                  "image": "https://storage.googleapis.com/factify/azW34JfXXScL66VB1679115316430.png",
                  "isEnabled": true
              }
          ],
          "html":`<html>
          <link href='https://fonts.googleapis.com/css?family=Nunito Sans' rel='stylesheet'>
      <style>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
              .container {
                position: relative;
                text-align: center;
                color: white;
              }
              
              .bottom-left {
                position: absolute;
                bottom: 8px;
                left: 16px;
              }
              
              .top-left {
                position: absolute;
          width: 350px;
          font-size: 1.7em;
          color: white;
          font-family: 'Nunito Sans';
          text-align: left;
          top: 200px;
          left: 450px;
              }
              
              .top-right {
                position: absolute;
                top: 8px;
                right: 16px;
              }
              
              .bottom-right {
                position: absolute;
                bottom: 8px;
                right: 16px;
              }
              
              .centered {
                position: absolute;
          top: 390px;
          left: 450px;
          width: 300px;
          font-size: 1.3em;
          color: white;
          font-family: 'Nunito Sans';
          text-align: left;
      
             
              }
              button {
        position: absolute;
        width: 200px;
        height: 100px;
        border-radius: 40px;
      }
      .btn {
        position: relative;
        display: inline-block;
        border: 0;
        border-radius: 30px;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        font-size: 14px;
      }
      .btn:hover {
        box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
      }
      .btn:active {
        transform: translateY(1px);
        box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.15);
      }
      .btn:focus {
        outline: none;
      }
      .btn--basic {
        background-color: #e3eacc;
        color: #455a00;
      }
      .btn--ghost {
        background-color: transparent;
        border: 1px solid #739600;
        color: #739600;
      }
      .btn--dark {
        background-color: #455a00;
        color: white;
      }
      .btn--action {
        background-color: #17A597;
        color: white;
      }
      .btn--danger {
        background-color: #ff0000;
        color: white;
      }
      .btn--link {
        background-color: transparent;
        color: #5786bd;
      }
      .btn--dropdown {
        padding-right: 3em;
      }
      .btn--dropdown:before {
        content: "";
        right: 24px;
        top: 22px;
        width: 2px;
        height: 6px;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        transform: rotate(-45deg);
      }
      .btn--dropdown:after {
        content: "";
        right: 20px;
        top: 22px;
        width: 2px;
        height: 6px;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        transform: rotate(45deg);
      }
      .fact-btn{
        position: absolute;
          font-size: 1em;
          height: 100px;
          color: white;
          font-family: 'Nunito Sans';
          text-align: center;
          top: 153px;
          left: 450px;
          max-height: 30px;
          max-width: 100px;
      
      }
      .claim-btn{
        position: absolute;
          font-size: 1em;
          height: 100px;
          color: white;
          font-family: 'Nunito Sans';
          text-align: center;
          top: 340px;
          left: 460px;
          max-height: 30px;
          max-width: 100px;
      }
      .rating{
          position: absolute;
          top: 20px;
          left: 5px;
          max-height: 60px;
      }
      .fact_image{
        position: absolute;
          color: white;
          font-family: 'Nunito Sans';
          text-align: center;
          top: 125px;
          left: 20px;
          max-width: 420px;
      }
      .footer{
        position: absolute;
          top: 650px;
          left: 30px;
          max-width: 300px;
      }
      </style>
        <body>
          <div class="container">
              <img class="fact_image"  src="{{factImage}}">
              <img class="rating "  src="{{ratingImage}}">
              <img style="width:100%;" src="https://storage.googleapis.com/factify/ZeHZ58PzIsvOfJ801678355841739.png">
              <button class="btn fact-btn btn--action">C L A I M</button>
              <div class="top-left">{{claim}}</div>
              <button class="btn claim-btn btn--action">F A C T</button>
              <div class="centered">{{fact}}</div>
                  <img class="footer" style="width:50%;"   src="https://storage.googleapis.com/factify/tzpY8NepK0CqIhpu1678355909448.png">
            </div>
          <div>
             
          <div>
        </body>  
      </html> `,
          "status": 0,
          "__v": 0
      },
      {
          "_id": "6416d7e6a808d8d5975816b4",
          "name": "Theme 3",
          "description": "Theme 3",
          "image": "https://storage.googleapis.com/factify/GOrFudiabK5yR1jV1679115339045.png",
          "languages": [
              {
                  "language": "India English",
                  "_id": "6416d6dee9f4e02d3c8b75b6",
                  "image": "https://storage.googleapis.com/factify/5A8lxn6HN9lheSKW1679115349676.png",
                  "isEnabled": true
              },
              {
                  "language": "Hindi",
                  "_id": "6416d6f0e9f4e02d3c8b75b9",
                  "image": "https://storage.googleapis.com/factify/kPYsV070qGWwWuPr1679115357051.png",
                  "isEnabled": true
              }
          ],
          "html":`<html>
          <link href='https://fonts.googleapis.com/css?family=Nunito Sans' rel='stylesheet'>
      <style>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
              .container {
                position: relative;
                text-align: center;
                color: white;
              }
              
              .bottom-left {
                position: absolute;
                bottom: 8px;
                left: 16px;
              }
              
              .top-left {
                position: absolute;
                width: 550px;
                font-size: 1.7em;
                color:white;
                font-family: 'Nunito Sans';
                text-align: left;
                top: 125px;
                left: 80px;
              }
              
              .top-right {
                position: absolute;
                top: 8px;
                right: 16px;
              }
              
              .bottom-right {
                position: absolute;
                bottom: 8px;
                right: 16px;
              }
              
              .centered {
                position: absolute;
                top: 390px;
                font-weight: bold;
                left: 80px;
                width: 550px;
                font-size: 1.3em;
                color:black;
                font-family: 'Nunito Sans';
                text-align: left;
             
              }
              button {
        position: absolute;
        width: 200px;
        font-weight: bold;
        height: 100px;
        border-radius: 40px;
      }
      .btn {
        position: relative;
        display: inline-block;
        border: 0;
        border-radius: 30px;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        font-size: 14px;
      }
      .btn:hover {
        box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
      }
      .btn:active {
        transform: translateY(1px);
        box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.15);
      }
      .btn:focus {
        outline: none;
      }
      .btn--basic {
        background-color: #e3eacc;
        color: #455a00;
      }
      .btn--ghost {
        background-color: transparent;
        border: 1px solid #739600;
        color: #739600;
      }
      .btn--dark {
        background-color: #455a00;
        color: white;
      }
      .btn--action {
        background-color: #17A597;
        color: white;
      }
      .btn--danger {
        background-color: #ff0000;
        color: white;
      }
      .btn--link {
        background-color: transparent;
        color: #5786bd;
      }
      .btn--dropdown {
        padding-right: 3em;
      }
      .btn--dropdown:before {
        content: "";
        right: 24px;
        top: 22px;
        width: 2px;
        height: 6px;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        transform: rotate(-45deg);
      }
      .btn--dropdown:after {
        content: "";
        right: 20px;
        top: 22px;
        width: 2px;
        height: 6px;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        transform: rotate(45deg);
      }
      .fact-btn{
          position: absolute;
          font-size: 1em;
          height: 100px;
          color: white;
          font-family: 'Nunito Sans';
          text-align: center;
          top: 70px;
          left: 80px;
          max-height: 30px;
          max-width: 100px;
      
      }
      .claim-btn{
          position: absolute;
          font-size: 1em;
          height: 100px;
          color: white;
          font-family: 'Nunito Sans';
          text-align: center;
          top: 350px;
          left: 80px;
          max-height: 30px;
          max-width: 100px;
      }
      .rating{
          position: absolute;
          top: 50px;
          left: 640px;
          max-height: 50px;
      }
      .footer{
          position: absolute;
          top: 650px;
          left: 80;
          max-width:300px
         
      }
      </style>
        <body>
          <div class="container">
              <img class="rating"  src="{{ratingImage}}">
              <img style="width:100%;" src="https://storage.googleapis.com/factify/cyCG8KeVI2ffqOib1678355725191.png">
              <button class="btn fact-btn btn--action">C L A I M</button>
              <div class="top-left">{{claim}}</div>
              <button class="btn claim-btn btn--action">F A C T</button>
              <div class="centered">{{fact}}</div>
                  <img class="footer" style="width:50%;"   src="https://storage.googleapis.com/factify/tzpY8NepK0CqIhpu1678355909448.png">
            </div>
          <div>
             
          <div>
        </body>  
      </html>`,
          "status": 0,
          "__v": 0
      }
  ]

  }

  getTemplateJson(){
    return  {
    "id": "6LqIseL6svLDybdMzv7LM",
    "type": "VIDEO",
    "description": "",
    "image": undefined,
    "mutedIntro":undefined,
    "mutedOutro":undefined,
    "languages": [],
    "status":0,
    "name": "",
    "frame": {
     "width": 900,
     "height": 1600
    },
    "fps": 25,
    "scenes": [
      {
          "duration": 4.6,
          "layers": [
              {
                  "id": "7UtxiAvAIU1dwktPfn24E",
                  "name": "StaticVideo",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 0,
                  "top": 0,
                  "width": 900,
                  "height": 1600,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "StaticVideo",
                  "flipX": false,
                  "flipY": false, 
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": null,
                  "preview": "blob:http://127.0.0.1:5173/55b18237-ea03-4df0-b4b9-30665a92843f",
                  "src": "https://storage.googleapis.com/factify/jXuMlHkm1ivOsvFd1677045194334.mp4",
                  "speedFactor": 1
              }
          ]
      },
      {
          "duration": 9,
          "layers": [
              {
                  "id": "background",
                  "name": "Initial Frame",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 0,
                  "top": 0,
                  "width": 1080,
                  "height": 1920,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "Background",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": {
                      "color": "#fcfcfc",
                      "blur": 4,
                      "offsetX": 0,
                      "offsetY": 0,
                      "affectStroke": false,
                      "nonScaling": false
                  },
                  "fill": "#226099"
              },
              {
                  "id": "TcT1RDyz1pCCYJfHy3AGE",
                  "name": "StaticText",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 92,
                  "top": 160,
                  "width": 709.18,
                  "height": 225.1,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "StaticText",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": null,
                  "charSpacing": 0,
                  "fill": "#d9d9d9",
                  "fontFamily": "Noto+Sans",
                  "fontSize": 60,
                  "lineHeight": 1.16,
                  "text": "Does this video show assult on Muslim Voters during #GujratElections",
                  "textAlign": "center",
                  "fontURL": "https://fonts.gstatic.com/s/nunito/v20/XRXI3I6Li01BKofiOc5wtlZ2di8HDFwmRTM9jo7eTWk.ttf"
              },
              {
                "id": "vDYbggIfrecMa0wn6qUV6",
                "name": "StaticImage",
                "angle": 0,
                "stroke": null,
                "strokeWidth": 0,
                "left": 92,
                "top": 525,
                "width": 720,
                "height": 720,
                "opacity": 1,
                "originX": "left",
                "originY": "top",
                "scaleX": 1,
                "scaleY": 1,
                "type": "StaticImage",
                "flipX": false,
                "flipY": false,
                "skewX": 0,
                "skewY": 0,
                "visible": true,
                "shadow": null,
                "src":"https://storage.googleapis.com/factify/yU1I2Krpi0HS5cBf1677665067868.jpg",
                "cropX": 0,
                "cropY": 0,
                "metadata": {}
            }
          ]
      },
      {
          "duration": 9,
          "layers": [
              {
                  "id": "background",
                  "name": "Initial Frame",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 0,
                  "top": 0,
                  "width": 1080,
                  "height": 1920,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "Background",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": {
                      "color": "#fcfcfc",
                      "blur": 4,
                      "offsetX": 0,
                      "offsetY": 0,
                      "affectStroke": false,
                      "nonScaling": false
                  },
                  "fill": "#226099"
              },
              {
                "id": "vDYbggIfrecMa0wn6qUV6",
                "name": "StaticImage",
                "angle": 0,
                "stroke": null,
                "strokeWidth": 0,
                "left": 92,
                "top": 100,
                "width": 720,
                "height": 720,
                "opacity": 1,
                "originX": "left",
                "originY": "top",
                "scaleX": 1,
                "scaleY": 1,
                "type": "StaticImage",
                "flipX": false,
                "flipY": false,
                "skewX": 0,
                "skewY": 0,
                "visible": true,
                "shadow": null,
                "src":"https://storage.googleapis.com/factify/yU1I2Krpi0HS5cBf1677665067868.jpg",
                "cropX": 0,
                "cropY": 0,
                "metadata": {}
            },
              {
                  "id": "hqL89M8GuowWJCp49IUb-",
                  "name": "StaticText",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 92,
                  "top": 900,
                  "width": 709.18,
                  "height": 225.1,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "StaticText",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": null,
                  "charSpacing": 0,
                  "fill": "#d9d9d9",
                  "fontFamily": "Noto+Sans",
                  "fontSize": 60,
                  "lineHeight": 1.16,
                  "text": "#GujratElections:viral video alleges Muslim voters not allowed to vote & asulted  by the police",
                  "textAlign": "center",
                  "fontURL": "https://fonts.gstatic.com/s/nunito/v20/XRXI3I6Li01BKofiOc5wtlZ2di8HDFwmRTM9jo7eTWk.ttf"
              }
          ]
      },
      {
          "duration": 9,
          "layers": [
              {
                  "id": "background",
                  "name": "Initial Frame",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 0,
                  "top": 0,
                  "width": 1080,
                  "height": 1920,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "Background",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": {
                      "color": "#fcfcfc",
                      "blur": 4,
                      "offsetX": 0,
                      "offsetY": 0,
                      "affectStroke": false,
                      "nonScaling": false
                  },
                  "fill": "#226099"
              },
              {
                  "id": "CEUcvMkB5amqCXXWIgd6q",
                  "name": "StaticText",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 92,
                  "top": 900,
                  "width": 709.18,
                  "height": 225.1,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "StaticText",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": null,
                  "charSpacing": 0,
                  "fill": "#d9d9d9",
                  "fontFamily": "Noto+Sans",
                  "fontSize": 60,
                  "lineHeight": 1.16,
                  "text": "Keyword search indecated similar insident took place in UP Rampur",
                  "textAlign": "center",
                  "fontURL": "https://fonts.gstatic.com/s/nunito/v20/XRXI3I6Li01BKofiOc5wtlZ2di8HDFwmRTM9jo7eTWk.ttf"
              },
              {
                "id": "vDYbggIfrecMa0wn6qUV6",
                "name": "StaticImage",
                "angle": 0,
                "stroke": null,
                "strokeWidth": 0,
                "left": 92,
                "top": 100,
                "width": 720,
                "height": 720,
                "opacity": 1,
                "originX": "left",
                "originY": "top",
                "scaleX": 1,
                "scaleY": 1,
                "type": "StaticImage",
                "flipX": false,
                "flipY": false,
                "skewX": 0,
                "skewY": 0,
                "visible": true,
                "shadow": null,
                "src":"https://storage.googleapis.com/factify/yU1I2Krpi0HS5cBf1677665067868.jpg",
                "cropX": 0,
                "cropY": 0,
                "metadata": {}
            }
          ]
      },
      {
          "duration": 9,
          "layers": [
              {
                  "id": "background",
                  "name": "Initial Frame",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 0,
                  "top": 0,
                  "width": 1080,
                  "height": 1920,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "Background",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": {
                      "color": "#fcfcfc",
                      "blur": 4,
                      "offsetX": 0,
                      "offsetY": 0,
                      "affectStroke": false,
                      "nonScaling": false
                  },
                  "fill": "#226099"
              },
              {
                  "id": "VLrP4jR8xB5WKS5L5JmJa",
                  "name": "StaticText",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 92,
                  "top": 900,
                  "width": 709.18,
                  "height": 225.1,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "StaticText",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": null,
                  "charSpacing": 0,
                  "fill": "#d9d9d9",
                  "fontFamily": "Noto+Sans",
                  "fontSize": 60,
                  "lineHeight": 1.16,
                  "text": "Smajwadi party twitted similar video of Rampur insident on dec 5th",
                  "textAlign": "center",
                  "fontURL": "https://fonts.gstatic.com/s/nunito/v20/XRXI3I6Li01BKofiOc5wtlZ2di8HDFwmRTM9jo7eTWk.ttf"
              },
              {
                "id": "vDYbggIfrecMa0wn6qUV6",
                "name": "StaticImage",
                "angle": 0,
                "stroke": null,
                "strokeWidth": 0,
                "left": 92,
                "top": 100,
                "width": 720,
                "height": 720,
                "opacity": 1,
                "originX": "left",
                "originY": "top",
                "scaleX": 1,
                "scaleY": 1,
                "type": "StaticImage",
                "flipX": false,
                "flipY": false,
                "skewX": 0,
                "skewY": 0,
                "visible": true,
                "shadow": null,
                "src":"https://storage.googleapis.com/factify/yU1I2Krpi0HS5cBf1677665067868.jpg",
                "cropX": 0,
                "cropY": 0,
                "metadata": {}
            }
          ]
      },
      {
          "duration": 9,
          "layers": [
              {
                  "id": "background",
                  "name": "Initial Frame",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 0,
                  "top": 0,
                  "width": 1080,
                  "height": 1920,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "Background",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": {
                      "color": "#fcfcfc",
                      "blur": 4,
                      "offsetX": 0,
                      "offsetY": 0,
                      "affectStroke": false,
                      "nonScaling": false
                  },
                  "fill": "#226099"
              },
              {
                  "id": "7kHGr7DQg45ZTs0NFh66N",
                  "name": "StaticText",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 92,
                  "top": 900,
                  "width": 709.18,
                  "height": 225.1,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "StaticText",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": null,
                  "charSpacing": 0,
                  "fill": "#d9d9d9",
                  "fontFamily": "Noto+Sans",
                  "fontSize": 60,
                  "lineHeight": 1.16,
                  "text": "C L A I M is false As the video of muslim alleging Abuse by police is from up not from gujrat",
                  "textAlign": "center",
                  "fontURL": "https://fonts.gstatic.com/s/nunito/v20/XRXI3I6Li01BKofiOc5wtlZ2di8HDFwmRTM9jo7eTWk.ttf"
              },
              {
                "id": "vDYbggIfrecMa0wn6qUV6",
                "name": "StaticImage",
                "angle": 0,
                "stroke": null,
                "strokeWidth": 0,
                "left": 92,
                "top": 100,
                "width": 720,
                "height": 720,
                "opacity": 1,
                "originX": "left",
                "originY": "top",
                "scaleX": 1,
                "scaleY": 1,
                "type": "StaticImage",
                "flipX": false,
                "flipY": false,
                "skewX": 0,
                "skewY": 0,
                "visible": true,
                "shadow": null,
                "src":"https://storage.googleapis.com/factify/yU1I2Krpi0HS5cBf1677665067868.jpg",
                "cropX": 0,
                "cropY": 0,
                "metadata": {}
            }
          ]
      },
      {
          "duration": 6,
          "layers": [
              {
                  "id": "ocGXRYzQHzR6KflWE-ZHM",
                  "name": "StaticVideo",
                  "angle": 0,
                  "stroke": null,
                  "strokeWidth": 0,
                  "left": 0,
                  "top": 0,
                  "width": 900,
                  "height": 1600,
                  "opacity": 1,
                  "originX": "left",
                  "originY": "top",
                  "scaleX": 1,
                  "scaleY": 1,
                  "type": "StaticVideo",
                  "flipX": false,
                  "flipY": false,
                  "skewX": 0,
                  "skewY": 0,
                  "visible": true,
                  "shadow": null,
                  "preview": "blob:http://127.0.0.1:5173/d8daa380-21c0-4cc3-aad0-9700d06e221e",
                  "src": "https://storage.googleapis.com/factify/17haKEbFjDd4pgTe1677045199751.mp4",
                  "speedFactor": 1
              }
          ]
      },
      {
        "type": "AudioScene",
        "audioUrl": "",
        "cutFrom": 0,
        "startingTime": 0,
        "duration": 3.6
    },
    {
        "type": "AudioScene",
        "audioUrl": "",
        "cutFrom": 0,
        "startingTime": 3.6,
        "duration": 8
    },
    {
        "type": "AudioScene",
        "audioUrl": "",
        "cutFrom": 0,
        "startingTime": 11.6,
        "duration": 8
    },
    {
        "type": "AudioScene",
        "audioUrl": "",
        "cutFrom": 0,
        "startingTime": 44.6,
        "duration": 5
    }
  ],
    "metadata": {},
    "previews": []
    }
  }


  updateAudioTemplate(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseURL}/template/audio/${id}`, data)
  }
  getAudioTemplate(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/template/audio/${id}`)
  }
 

  deleteAudioTemplate(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/template/audio/${id}`)
  }

  //Video Template
  getAllVideoTemplate(): Observable<any> {
    return this.http.get(`${this.baseURL}/template/video`)
  }

  // addVideoTemplate(data: any): Observable<any> {
  //   return this.http.post(`${this.baseURL}/template/video`, data)
  // }
  addVideoTemplate(formData:any): Observable<any> {
    // var formData: any = new FormData();
    // formData.append('name', name);
    // formData.append('avatar', profileImage);
    return this.http.post<any>(`${this.baseURL}/template/video`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  updateVideoTemplate(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseURL}/template/video/${id}`, data)
  }
  getVideoTemplate(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/template/video/${id}`)
  }

  deleteVideoTemplate(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/template/video/${id}`)
  }

  //Image Template
  getAllImageTemplate(): Observable<any> {
    return this.http.get(`${this.baseURL}/template/image`)
  }

  addImageTemplate(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/template/image`, data)
  }

  updateImageTemplate(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseURL}/template/image/${id}`, data)
  }
  getImageTemplate(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/template/image/${id}`)
  }

  deleteImageTemplate(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/template/image/${id}`)
  }
}