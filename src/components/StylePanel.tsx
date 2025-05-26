'use client';

import React from 'react';
import { useImageStore } from '@/store/imageStore';
import { FONT_OPTIONS, LAYOUT_OPTIONS, ASPECT_RATIO_OPTIONS, GRADIENT_PRESETS, COLOR_PRESETS } from '@/lib/constants';

export default function StylePanel() {
  const { config, updateConfig } = useImageStore();

  const updateTitleStyle = (updates: any) => {
    updateConfig({
      titleStyle: { ...config.titleStyle, ...updates }
    });
  };

  const updateDescriptionStyle = (updates: any) => {
    updateConfig({
      descriptionStyle: { ...config.descriptionStyle, ...updates }
    });
  };

  const updateBackground = (updates: any) => {
    updateConfig({
      background: { ...config.background, ...updates }
    });
  };

  const updateCanvasSize = (aspectRatio: string) => {
    const option = ASPECT_RATIO_OPTIONS.find(opt => opt.value === aspectRatio);
    if (option) {
      updateConfig({
        canvasSize: {
          width: option.width,
          height: option.height,
          aspectRatio: option.value
        }
      });
    }
  };

  return (
    <div className="apple-panel">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">样式设置</h2>
      
      {/* 布局选择 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          布局样式
        </label>
        <div className="grid grid-cols-1 gap-2">
          {LAYOUT_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="layout"
                value={option.value}
                checked={config.layout === option.value}
                onChange={(e) => updateConfig({ layout: e.target.value as any })}
                className="mr-3 text-primary-600 focus:ring-primary-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">{option.name}</span>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 图片透明度 */}
      {config.uploadedImage && config.layout === 'image-background' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            图片透明度: {Math.round((config.imageOpacity || 1) * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={config.imageOpacity || 1}
            onChange={(e) => updateConfig({ imageOpacity: parseFloat(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>透明</span>
            <span>不透明</span>
          </div>
        </div>
      )}

      {/* 画布尺寸 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          画布比例
        </label>
        <select
          value={config.canvasSize.aspectRatio}
          onChange={(e) => updateCanvasSize(e.target.value)}
          className="apple-input"
        >
          {ASPECT_RATIO_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* 背景设置 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          背景样式
        </label>
        
        {/* 背景类型选择 */}
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="backgroundType"
              value="color"
              checked={config.background.type === 'color'}
              onChange={() => updateBackground({ type: 'color', color: '#667eea' })}
              className="mr-2 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">纯色</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="backgroundType"
              value="gradient"
              checked={config.background.type === 'gradient'}
              onChange={() => updateBackground({ 
                type: 'gradient',
                gradient: { from: '#667eea', to: '#764ba2', direction: 'to-br' }
              })}
              className="mr-2 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">渐变</span>
          </label>
        </div>

        {/* 颜色预设 */}
        {config.background.type === 'color' && (
          <div>
            <div className="grid grid-cols-8 gap-2 mb-3">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => updateBackground({ color })}
                  className={`w-8 h-8 rounded-lg border-2 ${
                    config.background.color === color ? 'border-primary-500' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <input
              type="color"
              value={config.background.color || '#667eea'}
              onChange={(e) => updateBackground({ color: e.target.value })}
              className="w-full h-10 rounded-lg border border-gray-300"
            />
          </div>
        )}

        {/* 渐变预设 */}
        {config.background.type === 'gradient' && (
          <div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {GRADIENT_PRESETS.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => updateBackground({
                    gradient: { from: preset.from, to: preset.to, direction: 'to-br' }
                  })}
                  className="h-12 rounded-lg border border-gray-200 text-xs text-white font-medium"
                  style={{
                    background: `linear-gradient(to bottom right, ${preset.from}, ${preset.to})`
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 标题样式 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">标题样式</h3>
        
        {/* 字体选择 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体
          </label>
          <select
            value={config.titleStyle.fontFamily}
            onChange={(e) => updateTitleStyle({ fontFamily: e.target.value })}
            className="apple-input"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name} - {font.preview}
              </option>
            ))}
          </select>
        </div>

        {/* 字体大小 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体大小: {config.titleStyle.fontSize}px
          </label>
          <input
            type="range"
            min="24"
            max="120"
            value={config.titleStyle.fontSize}
            onChange={(e) => updateTitleStyle({ fontSize: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* 字体颜色 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体颜色
          </label>
          <input
            type="color"
            value={config.titleStyle.color}
            onChange={(e) => updateTitleStyle({ color: e.target.value })}
            className="w-full h-10 rounded-lg border border-gray-300"
          />
        </div>

        {/* 字体粗细 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体粗细
          </label>
          <select
            value={config.titleStyle.fontWeight}
            onChange={(e) => updateTitleStyle({ fontWeight: e.target.value })}
            className="apple-input"
          >
            <option value="normal">常规</option>
            <option value="semibold">半粗体</option>
            <option value="bold">粗体</option>
          </select>
        </div>

        {/* 对齐方式 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            对齐方式
          </label>
          <div className="flex space-x-2">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                onClick={() => updateTitleStyle({ textAlign: align })}
                className={`px-4 py-2 rounded-lg border ${
                  config.titleStyle.textAlign === align
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {align === 'left' ? '左对齐' : align === 'center' ? '居中' : '右对齐'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 描述样式 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">描述样式</h3>
        
        {/* 字体选择 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体
          </label>
          <select
            value={config.descriptionStyle.fontFamily}
            onChange={(e) => updateDescriptionStyle({ fontFamily: e.target.value })}
            className="apple-input"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name} - {font.preview}
              </option>
            ))}
          </select>
        </div>

        {/* 字体大小 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体大小: {config.descriptionStyle.fontSize}px
          </label>
          <input
            type="range"
            min="16"
            max="60"
            value={config.descriptionStyle.fontSize}
            onChange={(e) => updateDescriptionStyle({ fontSize: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* 字体颜色 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体颜色
          </label>
          <input
            type="color"
            value={config.descriptionStyle.color}
            onChange={(e) => updateDescriptionStyle({ color: e.target.value })}
            className="w-full h-10 rounded-lg border border-gray-300"
          />
        </div>

        {/* 对齐方式 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            对齐方式
          </label>
          <div className="flex space-x-2">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                onClick={() => updateDescriptionStyle({ textAlign: align })}
                className={`px-4 py-2 rounded-lg border ${
                  config.descriptionStyle.textAlign === align
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {align === 'left' ? '左对齐' : align === 'center' ? '居中' : '右对齐'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 