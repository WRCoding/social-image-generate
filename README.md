# 社交媒体分享图片生成工具

一个基于 Next.js 和 Vercel/og 的在线工具，允许用户快速生成用于社交媒体分享的自定义图片。

## 功能特性

- ✨ **简洁美观的界面** - 采用苹果设计风格，简洁现代
- 🎨 **高度自定义** - 支持文字、背景、布局等多种样式自定义
- 📱 **多种尺寸** - 支持常见社交媒体平台的图片比例
- 🖼️ **图片上传** - 支持上传本地图片作为素材
- ⚡ **实时预览** - 所见即所得的实时预览功能
- 💾 **一键下载** - 生成后可直接下载高质量图片

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **图片生成**: html2canvas (客户端生成)
- **图标**: Lucide React
- **语言**: TypeScript

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── generate/      # 图片生成 API
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx          # 主页面
├── components/            # React 组件
│   ├── ContentPanel.tsx   # 内容输入面板
│   ├── ImageEditor.tsx    # 主编辑器
│   ├── PreviewPanel.tsx   # 预览面板
│   └── StylePanel.tsx     # 样式控制面板
├── lib/                   # 工具库
│   └── constants.ts       # 常量定义
├── store/                 # 状态管理
│   └── imageStore.ts      # 图片配置状态
└── types/                 # TypeScript 类型定义
    └── index.ts
```

## 使用说明

1. **输入内容**: 在左侧面板输入标题和描述文字
2. **上传图片**: 可选择上传本地图片作为素材
3. **调整样式**: 在右侧面板自定义字体、颜色、布局等
4. **实时预览**: 中间面板会实时显示效果
5. **生成图片**: 点击"生成图片"按钮创建最终图片
6. **下载保存**: 生成完成后可直接下载图片

## 部署

推荐使用 Vercel 进行部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/social-image-generator)

## 开发计划

- [ ] AI 图片生成功能
- [ ] 更多预设模板
- [ ] 用户账户系统
- [ ] 历史记录保存
- [ ] 团队协作功能
- [ ] 直接分享到社交媒体

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 