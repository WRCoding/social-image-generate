'use client';

import React, { forwardRef } from 'react';
import { useImageStore } from '@/store/imageStore';
import { log } from 'console';

const PreviewPanel = forwardRef<HTMLDivElement>((props, ref) => {
  const { config, generatedImageUrl } = useImageStore();
  console.log(config);

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
    <div className="apple-panel">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">实时预览</h2>
      
      <div className="relative">
        {/* 预览容器 */}
        <div
          ref={ref}
          className={`relative w-full bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 ${
            config.canvasSize.aspectRatio === '1:1' ? 'aspect-square' :
            config.canvasSize.aspectRatio === '16:9' ? 'aspect-video' :
            config.canvasSize.aspectRatio === '4:5' ? 'aspect-[4/5]' :
            config.canvasSize.aspectRatio === '9:16' ? 'aspect-[9/16]' :
            'aspect-video'
          }`}
          style={{
            ...getBackgroundStyle(),
            aspectRatio: config.canvasSize.aspectRatio === '1:1' ? '1/1' :
                        config.canvasSize.aspectRatio === '16:9' ? '16/9' :
                        config.canvasSize.aspectRatio === '4:5' ? '4/5' :
                        config.canvasSize.aspectRatio === '9:16' ? '9/16' : '16/9',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
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
          
          <div className={`h-full w-full flex items-center justify-center p-4 ${getLayoutClasses()} relative z-10`}>
            {/* 图片作为背景的布局 */}
            {config.layout === 'image-background' && (
              <div className={`flex flex-col ${getTextAlignClass(config.titleStyle.textAlign)} w-full h-full justify-center px-4`}>
                {config.title && (
                  <h1
                    className={`font-${config.titleStyle.fontWeight} ${getTextAlignClass(config.titleStyle.textAlign)} leading-tight break-words`}
                    style={{
                      fontSize: `${Math.max(config.titleStyle.fontSize / 4, 12)}px`,
                      color: config.titleStyle.color,
                      fontFamily: config.titleStyle.fontFamily,
                      marginBottom: config.description ? '8px' : '0',
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
                      fontSize: `${Math.max(config.descriptionStyle.fontSize / 4, 10)}px`,
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
            {config.layout !== 'image-background' && (
              <>
                {/* 上传的图片 */}
                {config.uploadedImage && config.layout !== 'text-only' && (
                  <div className={`flex-shrink-0 ${
                    config.layout === 'text-under-image' ? 'mb-2' :
                    config.layout === 'text-left-image-right' ? 'mr-2' :
                    config.layout === 'text-right-image-left' ? 'ml-2' :
                    config.layout === 'text-above-image' ? 'mt-2' :
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
                        maxHeight: config.layout === 'image-only' ? '100%' : '120px',
                        borderRadius: `${(config.imageStyle?.borderRadius || 0) / 4}px`,
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
                          fontSize: `${Math.max(config.titleStyle.fontSize / 4, 12)}px`,
                          color: config.titleStyle.color,
                          fontFamily: config.titleStyle.fontFamily,
                          marginBottom: config.description ? '4px' : '0',
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
                          fontSize: `${Math.max(config.descriptionStyle.fontSize / 4, 10)}px`,
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
        

      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        这是实时预览，最终生成的图片可能会有细微差异
      </p>

      {/* 生成的图片显示在预览下方 */}
      {generatedImageUrl && (
        <div className="mt-6">
          <div className="bg-white p-4 rounded-xl shadow-apple border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">生成的图片：</p>
            <img
              src={generatedImageUrl}
              alt="Generated"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>
        </div>
      )}
    </div>
  );
});

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel; 