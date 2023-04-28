import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private baseURL = environment.BASE_URL;
  private renderURL = environment.RENDERER_URL;
  constructor(private http: HttpClient) { }

  getAllMedias(): Observable<any> {
    return this.http.get(`${this.baseURL}/media`);
  }
  processVideo(data) {
    return this.http.post(`${this.baseURL}/media/render-video`, data);
  }
  processImage(data) {
    return this.http.post(`${this.baseURL}/media/render-image`, data);
  }
  processAudio(data) {
    return this.http.post(`${this.baseURL}/media/render-audio`, data);
  }
  createMedia(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/media`, data);
  }

  updateMedia(data: any, id: string): Observable<any> {
    console.log(data);
    console.log(id);
    return this.http.put(`${this.baseURL}/media/${id}`, data);
  }
  getMedia(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/media/${id}`);
  }
  getAudioFromText(tts: any): Observable<any> {
    if (!tts.ttsText)
      return of({ data: [""] })
    return this.http.post(`${this.baseURL}/media/ttsToAudio`, tts)
  }

  deleteMedia(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseURL}/media`,{ body: { ids } });
  }
}
