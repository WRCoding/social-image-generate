'use client';

import React, { useRef } from 'react';
import { useImageStore } from '@/store/imageStore';
import { Upload, X } from 'lucide-react';
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_FILE_SIZE, SUPPORTED_IMAGE_TYPES } from '@/lib/constants';

export default function ContentPanel() {
  const { config, updateConfig } = useImageStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      alert('请上传 JPG、PNG 或 WEBP 格式的图片');
      return;
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      alert('图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      updateConfig({ uploadedImage: result });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    updateConfig({ uploadedImage: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="apple-panel">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">内容设置</h2>
      
      {/* 标题输入 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          标题 (最多{MAX_TITLE_LENGTH}字)
        </label>
        <textarea
          value={config.title}
          onChange={(e) => updateConfig({ title: e.target.value })}
          placeholder="输入图片标题..."
          maxLength={MAX_TITLE_LENGTH}
          className="apple-input resize-none"
          rows={2}
        />
        <p className={`text-xs mt-1 ${
          config.title.length > MAX_TITLE_LENGTH * 0.8 
            ? config.title.length >= MAX_TITLE_LENGTH 
              ? 'text-red-500' 
              : 'text-yellow-500'
            : 'text-gray-500'
        }`}>
          {config.title.length}/{MAX_TITLE_LENGTH} 字 {config.title.length >= MAX_TITLE_LENGTH && '(已达上限)'}
        </p>
      </div>

      {/* 描述输入 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          描述 (最多{MAX_DESCRIPTION_LENGTH}字)
        </label>
        <textarea
          value={config.description}
          onChange={(e) => updateConfig({ description: e.target.value })}
          placeholder="输入图片描述..."
          maxLength={MAX_DESCRIPTION_LENGTH}
          className="apple-input resize-none"
          rows={3}
        />
        <p className={`text-xs mt-1 ${
          config.description.length > MAX_DESCRIPTION_LENGTH * 0.8 
            ? config.description.length >= MAX_DESCRIPTION_LENGTH 
              ? 'text-red-500' 
              : 'text-yellow-500'
            : 'text-gray-500'
        }`}>
          {config.description.length}/{MAX_DESCRIPTION_LENGTH} 字 {config.description.length >= MAX_DESCRIPTION_LENGTH && '(已达上限)'}
        </p>
      </div>

      {/* 图片上传 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          上传图片 (可选)
        </label>
        
        {config.uploadedImage ? (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={config.uploadedImage}
                alt="Uploaded"
                className="w-full rounded-xl border border-gray-200"
                style={{ 
                  objectFit: 'contain', 
                  width: '100%', 
                  height: '150px',
                  maxHeight: '200px'
                }}
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* 图片尺寸调整 */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900">图片圆角调整</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  圆角程度: {config.imageStyle?.borderRadius || 0}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={config.imageStyle?.borderRadius || 0}
                  onChange={(e) => updateConfig({
                    imageStyle: {
                      ...config.imageStyle,
                      borderRadius: parseInt(e.target.value),
                      width: config.imageStyle?.width ?? 100,
                      height: config.imageStyle?.height ?? 100,
                      position: config.imageStyle?.position ?? { x: 0, y: 0 },
                      border: config.imageStyle?.border,
                    }
                  })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>直角</span>
                  <span>圆角</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">点击上传图片</p>
            <p className="text-xs text-gray-500 mt-1">
              支持 JPG、PNG、WEBP，最大 5MB
            </p>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
} 