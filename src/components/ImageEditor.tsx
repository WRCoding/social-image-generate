'use client';

import React, { useState, useRef } from 'react';
import { useImageStore } from '@/store/imageStore';
import ContentPanel from './ContentPanel';
import StylePanel from './StylePanel';
import PreviewPanel from './PreviewPanel';
import ImageGenerator from './ImageGenerator';
import { Download, RefreshCw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { log } from 'console';

export default function ImageEditor() {
  const { config, isGenerating, generatedImageUrl, setGenerating, setGeneratedImageUrl } = useImageStore();
  const generatorRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!generatorRef.current) return;
    console.log(generatorRef);
    
    setGenerating(true);
    try {
      // 使用html2canvas生成图片
      const canvas = await html2canvas(generatorRef.current, {
        useCORS: true,
        allowTaint: true,
        width: config.canvasSize.width,
        height: config.canvasSize.height,
      });

      // 确保canvas尺寸正确
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = config.canvasSize.width;
      finalCanvas.height = config.canvasSize.height;
      const ctx = finalCanvas.getContext('2d');
      
      if (ctx) {
        // 将html2canvas的结果绘制到固定尺寸的canvas上
        ctx.drawImage(canvas, 0, 0, config.canvasSize.width, config.canvasSize.height);
        
        // 转换为blob并创建URL
        finalCanvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const imageUrl = URL.createObjectURL(blob);
            setGeneratedImageUrl(imageUrl);
          }
        }, 'image/png');
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImageUrl) {
      const link = document.createElement('a');
      link.href = generatedImageUrl;
      link.download = `social-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              社交媒体图片生成器
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={generateImage}
                disabled={isGenerating}
                className="apple-button"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    生成中...
                  </>
                ) : (
                  '生成图片'
                )}
              </button>
              {generatedImageUrl && (
                <button
                  onClick={downloadImage}
                  className="apple-button-secondary"
                >
                  <Download className="w-5 h-5 mr-2" />
                  下载图片
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Content Input */}
          <div className="lg:col-span-1">
            <ContentPanel />
          </div>

          {/* Middle Panel - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 z-20">
              <PreviewPanel />
            </div>
          </div>

          {/* Right Panel - Style Controls */}
          <div className="lg:col-span-1">
            <StylePanel />
          </div>
        </div>
      </div>

      {/* 隐藏的图片生成器 */}
      <ImageGenerator ref={generatorRef} config={config} />
    </div>
  );
} 