import { create } from 'zustand';
import { ImageConfig } from '@/types';

interface ImageStore {
  config: ImageConfig;
  isGenerating: boolean;
  generatedImageUrl: string | null;
  updateConfig: (updates: Partial<ImageConfig>) => void;
  setGenerating: (generating: boolean) => void;
  setGeneratedImageUrl: (url: string | null) => void;
  resetConfig: () => void;
}

const defaultConfig: ImageConfig = {
  title: '',
  description: '',
  layout: 'text-under-image',
  background: {
    type: 'color',
    color: '#ffffff'
  },
  titleStyle: {
    fontFamily: 'Inter',
    fontSize: 48,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  descriptionStyle: {
    fontFamily: 'Inter',
    fontSize: 24,
    color: '#374151',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  canvasSize: {
    width: 1200,
    height: 630,
    aspectRatio: '16:9'
  },
  imageStyle: {
    width: 100,
    height: 100,
    position: { x: 0, y: 0 },
    borderRadius: 0
  },
  imageOpacity: 0.8
};

export const useImageStore = create<ImageStore>((set) => ({
  config: defaultConfig,
  isGenerating: false,
  generatedImageUrl: null,
  
  updateConfig: (updates) =>
    set((state) => ({
      config: { ...state.config, ...updates }
    })),
    
  setGenerating: (generating) =>
    set({ isGenerating: generating }),
    
  setGeneratedImageUrl: (url) =>
    set({ generatedImageUrl: url }),
    
  resetConfig: () =>
    set({ config: defaultConfig, generatedImageUrl: null })
})); 