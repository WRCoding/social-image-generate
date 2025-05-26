import { FontOption, LayoutOption, AspectRatioOption } from '@/types';

export const FONT_OPTIONS: FontOption[] = [
  { name: 'Inter', value: 'Inter', preview: 'Modern & Clean' },
  { name: 'Helvetica', value: 'Helvetica', preview: 'Classic & Professional' },
  { name: 'Arial', value: 'Arial', preview: 'Universal & Readable' },
  { name: 'Georgia', value: 'Georgia', preview: 'Elegant & Serif' },
  { name: 'Times New Roman', value: 'Times New Roman', preview: 'Traditional & Formal' },
  { name: 'Roboto', value: 'Roboto', preview: 'Google & Friendly' },
];

export const LAYOUT_OPTIONS: LayoutOption[] = [
  {
    name: '文字在图片下方',
    value: 'text-under-image',
    description: '文字显示在图片下方'
  },
  {
    name: '文字左侧，图片右侧',
    value: 'text-left-image-right',
    description: '左右分栏布局'
  },
  {
    name: '文字右侧，图片左侧',
    value: 'text-right-image-left',
    description: '左右分栏布局（反向）'
  },
  {
    name: '图片作为背景',
    value: 'image-background',
    description: '图片作为背景，文字覆盖在上面'
  },
  {
    name: '文字在图片上方',
    value: 'text-above-image',
    description: '文字在上，图片在下'
  },
  {
    name: '纯图片',
    value: 'image-only',
    description: '仅显示图片内容'
  },
  {
    name: '纯文字',
    value: 'text-only',
    description: '仅显示文字内容'
  }
];

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  { name: '正方形 (1:1)', value: '1:1', width: 1080, height: 1080 },
  { name: '横屏 (16:9)', value: '16:9', width: 1200, height: 630 },
  { name: '竖屏 (4:5)', value: '4:5', width: 1080, height: 1350 },
  { name: '故事 (9:16)', value: '9:16', width: 1080, height: 1920 },
];

export const GRADIENT_PRESETS = [
  { name: '蓝紫渐变', from: '#667eea', to: '#764ba2' },
  { name: '粉橙渐变', from: '#f093fb', to: '#f5576c' },
  { name: '绿蓝渐变', from: '#4facfe', to: '#00f2fe' },
  { name: '紫粉渐变', from: '#a8edea', to: '#fed6e3' },
  { name: '橙红渐变', from: '#ff9a9e', to: '#fecfef' },
  { name: '蓝绿渐变', from: '#a1c4fd', to: '#c2e9fb' },
];

export const COLOR_PRESETS = [
  '#667eea', '#764ba2', '#f093fb', '#f5576c',
  '#4facfe', '#00f2fe', '#a8edea', '#fed6e3',
  '#ff9a9e', '#fecfef', '#a1c4fd', '#c2e9fb',
  '#ffffff', '#000000', '#374151', '#6b7280'
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_TITLE_LENGTH = 40;
export const MAX_DESCRIPTION_LENGTH = 100; 