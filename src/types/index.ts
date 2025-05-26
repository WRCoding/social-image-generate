export interface ImageConfig {
  title: string;
  description: string;
  uploadedImage?: string;
  layout: LayoutType;
  background: BackgroundConfig;
  titleStyle: TextStyle;
  descriptionStyle: TextStyle;
  imageStyle?: ImageStyle;
  canvasSize: CanvasSize;
  imageOpacity?: number; // 图片透明度 (0-1)
}

export interface BackgroundConfig {
  type: 'color' | 'gradient' | 'image';
  color?: string;
  gradient?: {
    from: string;
    to: string;
    direction: 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l' | 'to-tl' | 'to-t' | 'to-tr';
  };
  image?: string;
}

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  fontWeight: 'normal' | 'bold' | 'semibold';
  textAlign: 'left' | 'center' | 'right';
  position?: {
    x: number;
    y: number;
  };
}

export interface ImageStyle {
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  };
  borderRadius: number;
  border?: {
    width: number;
    color: string;
  };
}

export interface CanvasSize {
  width: number;
  height: number;
  aspectRatio: '1:1' | '16:9' | '4:5' | '9:16' | 'custom';
}

export type LayoutType = 
  | 'text-under-image'
  | 'text-left-image-right'
  | 'text-right-image-left'
  | 'text-only'
  | 'image-background'
  | 'text-above-image'
  | 'image-only';

export interface FontOption {
  name: string;
  value: string;
  preview: string;
}

export interface LayoutOption {
  name: string;
  value: LayoutType;
  description: string;
}

export interface AspectRatioOption {
  name: string;
  value: '1:1' | '16:9' | '4:5' | '9:16';
  width: number;
  height: number;
} 