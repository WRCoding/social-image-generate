import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '社交媒体图片生成器',
  description: '快速生成用于社交媒体分享的自定义图片',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
} 