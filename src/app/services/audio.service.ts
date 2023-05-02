import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioObj = new Audio();
  private stop$ = new Subject();
  private audioEvents$ = new Subject<any>();
  private audioEventsObservable$ = this.audioEvents$.asObservable();

  // ... constructors and other methods ...

  getAudioDuration(url:string): Observable<number> {
    return new Observable(observer => {
      let audio = new Audio();
      audio.src = url;
      console.log(url);
      audio.addEventListener('loadedmetadata', () => {
        observer.next(audio.duration);
        console.log(audio.duration);
        observer.complete();
      });
    });
  }
}
