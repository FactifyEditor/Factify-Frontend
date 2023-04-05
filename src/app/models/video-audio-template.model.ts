export interface VideoTemplateOld {
    id?: string;
    name: string;
    description: string;
    icon: string;
    jsonTemplate:any;
    mutedIntro:string;
    mutedOutro:string;
    languages: any[] ;
    status:number;
}

export interface VideoTemplate {
  _id?: string
  type: string
  description: string
  image: string
  mutedIntro: string
  mutedOutro: string
  languages: any[]
  status: number
  name: string
  frame: Frame
  fps: number
  scenes: Scene[]
  metadata: Metadata
  previews: any[]
}

export interface Frame {
  width: number
  height: number
}

export interface Scene {
  duration?: number
  layers?: Layer[]
  type?: string
  cutFrom?: number
  cutTo?: number
  startFrom?: number
  endTo?: number
  path?: string
}

export interface Layer {
  id: string
  name: string
  angle: number
  stroke: any
  strokeWidth: number
  left: number
  top: number
  width: number
  height: number
  opacity: number
  originX: string
  originY: string
  scaleX: number
  scaleY: number
  type: string
  flipX: boolean
  flipY: boolean
  skewX: number
  skewY: number
  visible: boolean
  shadow?: Shadow
  preview?: string
  src?: string
  speedFactor?: number
  fill?: string
  charSpacing?: number
  fontFamily?: string
  fontSize?: number
  lineHeight?: number
  text?: string
  textAlign?: string
  fontURL?: string
  right?: number
  cropX?: number
  cropY?: number
}

export interface Shadow {
  color: string
  blur: number
  offsetX: number
  offsetY: number
  affectStroke: boolean
  nonScaling: boolean
}

export interface Metadata {}
