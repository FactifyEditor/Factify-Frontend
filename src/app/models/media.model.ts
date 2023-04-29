export class MediaModel {
  _id?: string;
  rating: string;
  link:String;
  language: string;
  imageTemplate: string;
  videoTemplate:string;
  metaData:  any;
  draft?: boolean;
  audioStatus?:number;
  videoStatus?:number;
  imageStatus?:number;
  audioUrl:string;
  videoUrl:string;
  imageUrl:string;
}