export interface VideoModel {
    outPath: string;
    width: number;
    height: number;
    defaults: Defaults;
    clips?: (Clips)[] | null;
    audioNorm: AudioNorm;
    audioTracks?: (AudioTracks)[] | null;
  }
  export interface Defaults {
    layer: Layer;
  }
  export interface Layer {
    fontPath: string;
  }
  export interface Clips {
    layers?: (Layers)[] | null;
    duration?: number | null;
  }
  export interface Layers {
    type: string;
    path?: string | null;
    cutTo?: number | null;
    text?: string | null;
    mixVolume?: number | null;
    cutFrom?: number | null;
    start?: number | null;
    backgroundColor?:string|null
  }
  export interface AudioNorm {
    enable: boolean;
    gaussSize: number;
    maxGain: number;
  }
  export interface AudioTracks {
    path: string;
    cutFrom: number;
  }
  