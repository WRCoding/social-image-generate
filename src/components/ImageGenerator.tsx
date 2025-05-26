'use client';

import React, { forwardRef } from 'react';
import { ImageConfig } from '@/types';

interface ImageGeneratorProps {
  config: ImageConfig;
}

const ImageGenerator = forwardRef<HTMLDivElement, ImageGeneratorProps>(({ config }, ref) => {
  const getBackgroundStyle = () => {
    const { background } = config;
    
    if (background.type === 'color') {
      return { backgroundColor: background.color };
    } else if (background.type === 'gradient' && background.gradient) {
      const { from, to, direction } = background.gradient;
      // 直接映射方向
      const directionMap: { [key: string]: string } = {
        'to-r': 'to right',
        'to-br': 'to bottom right', 
        'to-b': 'to bottom',
        'to-bl': 'to bottom left',
        'to-l': 'to left',
        'to-tl': 'to top left',
        'to-t': 'to top',
        'to-tr': 'to top right'
      };
      const cssDirection = directionMap[direction] || 'to bottom right';
      return {
        background: `linear-gradient(${cssDirection}, ${from}, ${to})`
      };
    }
    
    return {};
  };

  const getLayoutClasses = () => {
    switch (config.layout) {
      case 'text-under-image':
        return 'flex-col';
      case 'text-above-image':
        return 'flex-col-reverse';
      case 'text-left-image-right':
        return 'flex-row';
      case 'text-right-image-left':
        return 'flex-row-reverse';
      case 'image-background':
        return 'flex-col';
      default:
        return 'flex-col';
    }
  };

  const getTextAlignClass = (align: string) => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
      default:
        return 'text-center';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        width: `${config.canvasSize.width}px`,
        height: `${config.canvasSize.height}px`,
        position: 'absolute',
        left: '99px',
        top: '1899px',
        ...getBackgroundStyle(),
      }}
    >
      {/* 背景图片层 - 只在image-background布局时显示 */}
      {config.layout === 'image-background' && config.uploadedImage && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${config.uploadedImage})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: config.imageOpacity || 1,
          }}
        />
      )}
      
      <div className={`h-full w-full flex items-center justify-center ${config.layout === 'image-only' ? 'p-0' : 'p-16'} ${getLayoutClasses()} relative z-10`}>

        {/* 图片作为背景的布局 */}
        {config.layout === 'image-background' && (
          <div className={`flex flex-col ${getTextAlignClass(config.titleStyle.textAlign)} w-full h-full justify-center px-16`}>
            {config.title && (
              <h1
                className={`font-${config.titleStyle.fontWeight} ${getTextAlignClass(config.titleStyle.textAlign)} leading-tight break-words`}
                style={{
                  fontSize: `${config.titleStyle.fontSize}px`,
                  color: config.titleStyle.color,
                  fontFamily: config.titleStyle.fontFamily,
                  marginBottom: config.description ? '20px' : '0',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {config.title}
              </h1>
            )}
            {config.description && (
              <p
                className={`font-${config.descriptionStyle.fontWeight} ${getTextAlignClass(config.descriptionStyle.textAlign)} leading-relaxed break-words`}
                style={{
                  fontSize: `${config.descriptionStyle.fontSize}px`,
                  color: config.descriptionStyle.color,
                  fontFamily: config.descriptionStyle.fontFamily,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {config.description}
              </p>
            )}
          </div>
        )}

        {/* 其他布局 */}
        { config.layout !== 'image-background' && (
          <>
            {/* 上传的图片 */}
            {config.uploadedImage && config.layout !== 'text-only' && (
              <div className={`flex-shrink-0 ${
                config.layout === 'text-under-image' ? 'mb-8' :
                config.layout === 'text-left-image-right' ? 'mr-8' :
                config.layout === 'text-right-image-left' ? 'ml-8' :
                config.layout === 'text-above-image' ? 'mt-8' :
                config.layout === 'image-only' ? '' :
                ''
              }`}>
                <img
                  src={config.uploadedImage}
                  alt="Preview"
                  className="object-contain"
                  style={{
                    width: config.layout === 'image-only' ? '100%' : `${config.imageStyle?.width || 100}%`,
                    height: config.layout === 'image-only' ? '100%' : `${config.imageStyle?.height || 100}%`,
                    // maxWidth: config.layout === 'image-only' ? '100%' : (config.layout.includes('image-right') || config.layout.includes('image-left') ? '800px' : '800px'),
                    maxHeight: config.layout === 'image-only' ? '100%' : (config.layout.includes('image-right') || config.layout.includes('image-left') ? '600px' : '600px'),
                    borderRadius: `${config.imageStyle?.borderRadius || 0}px`,
                  }}
                />
              </div>
            )}
            
            {/* 文字内容 */}
            {config.layout !== 'image-only' && (
              <div className={`flex flex-col ${getTextAlignClass(config.titleStyle.textAlign)} flex-1 min-w-0`}>
                {config.title && (
                  <h1
                    className={`font-${config.titleStyle.fontWeight} ${getTextAlignClass(config.titleStyle.textAlign)} leading-tight break-words`}
                    style={{
                      fontSize: `${config.titleStyle.fontSize}px`,
                      color: config.titleStyle.color,
                      fontFamily: config.titleStyle.fontFamily,
                      marginBottom: config.description ? '20px' : '0',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                    }}
                  >
                    {config.title}
                  </h1>
                )}
                {config.description && (
                  <p
                    className={`font-${config.descriptionStyle.fontWeight} ${getTextAlignClass(config.descriptionStyle.textAlign)} leading-relaxed break-words`}
                    style={{
                      fontSize: `${config.descriptionStyle.fontSize}px`,
                      color: config.descriptionStyle.color,
                      fontFamily: config.descriptionStyle.fontFamily,
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                    }}
                  >
                    {config.description}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

ImageGenerator.displayName = 'ImageGenerator';

export default ImageGenerator; 