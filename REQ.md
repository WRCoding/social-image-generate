# 社交媒体分享图片生成工具 - 需求文档 (v1.2)

## 1. 项目概述

本项目旨在开发一个在线工具，允许用户快速生成用于社交媒体分享的自定义图片。用户可以通过输入标题、描述，并选择性上传本地图片，结合自定义的样式，生成符合其需求的分享图。此外，项目还将探索集成AI能力，根据用户提供的样式和信息，由AI自动生成图片。项目将主要使用 Vercel/og 和 Next.js进行开发。

## 2. 项目目标

* 提供一个简单易用且**设计美观**的界面，让用户可以轻松创建社交媒体分享图片。
* 支持高度自定义的样式选项，满足用户个性化需求。
* 实现实时预览功能，方便用户在生成前调整效果。
* 提供图片下载功能，方便用户在不同平台使用。
* 集成AI图片生成能力，为用户提供更多元、智能的图片创作方式。
* **确保代码结构清晰、模块化，易于后期维护和功能扩展。**

## 3. 功能需求

### 3.1. 用户输入与内容管理

* **FR1.1 标题输入:**
    * 用户可以输入分享图片的标题文字。
    * 应有字数限制提示（例如：最多 100 字符）。
* **FR1.2 描述输入:**
    * 用户可以输入分享图片的描述文字。
    * 应有字数限制提示（例如：最多 200 字符）。
* **FR1.3 本地图片上传 (可选):**
    * 用户可以选择上传一张本地图片作为分享图的一部分。
    * 支持常见的图片格式（如 JPG, PNG, WEBP）。
    * 应有文件大小限制提示（例如：最大 5MB）。
    * 如果用户不上传图片，应有默认处理方式（例如：纯背景色或预设图案）。

### 3.2. 样式自定义

* **FR2.1 整体布局选择:**
    * 提供多种预设的布局模板供用户选择（例如：文字在图片上方、文字在图片下方、文字在图片左侧/右侧等）。
* **FR2.2 背景自定义:**
    * 用户可以选择背景颜色（通过颜色选择器）。
    * 用户可以上传背景图片（如果未选择前景图片，或作为整体背景）。
    * 用户可以选择背景渐变色。
* **FR2.3 标题样式自定义:**
    * **FR2.3.1 字体选择:** 提供多种预选字体供用户选择（考虑引入优雅、现代的字体）。
    * **FR2.3.2 字体大小:** 用户可以调整字体大小。
    * **FR2.3.3 字体颜色:** 用户可以通过颜色选择器选择字体颜色。
    * **FR2.3.4 字体粗细:** 用户可以选择字体粗细（例如：常规、加粗）。
    * **FR2.3.5 对齐方式:** 用户可以选择文本对齐方式（左对齐、居中、右对齐）。
    * **FR2.3.6 位置调整:** 用户可以微调标题在画布上的位置（可选，可通过拖拽或坐标输入）。
* **FR2.4 描述样式自定义:**
    * **FR2.4.1 字体选择:** 提供多种预选字体供用户选择。
    * **FR2.4.2 字体大小:** 用户可以调整字体大小。
    * **FR2.4.3 字体颜色:** 用户可以通过颜色选择器选择字体颜色。
    * **FR2.4.4 对齐方式:** 用户可以选择文本对齐方式（左对齐、居中、右对齐）。
    * **FR2.4.5 位置调整:** 用户可以微调描述在画布上的位置（可选）。
* **FR2.5 上传图片样式自定义 (如果用户上传了图片):**
    * **FR2.5.1 图片尺寸调整:** 用户可以调整上传图片在画布中的显示大小。
    * **FR2.5.2 图片位置调整:** 用户可以调整上传图片在画布中的位置。
    * **FR2.5.3 图片圆角:** 用户可以设置图片的圆角。
    * **FR2.5.4 图片边框:** 用户可以为图片添加边框，并自定义边框颜色和粗细。
* **FR2.6 画布尺寸/比例:**
    * 提供常见的社交媒体图片比例预设（例如：1:1, 16:9, 4:5）。
    * 允许用户选择最终生成图片的尺寸。

### 3.3. 预览功能

* **FR3.1 实时预览:**
    * 在用户输入内容或调整样式时，预览区域应实时更新生成的图片效果。
    * 预览效果应尽可能接近最终生成的图片。

### 3.4. 图片生成与下载

* **FR4.1 生成图片按钮:**
    * 提供一个明确的"生成图片"按钮。
* **FR4.2 图片生成处理:**
    * 点击按钮后，系统根据用户当前的输入和样式设置，使用 Vercel/og 生成最终图片。
    * 应有加载状态提示，告知用户图片正在生成中。
* **FR4.3 生成结果展示:**
    * 生成成功后，在预览区域或新的区域展示最终生成的图片。
* **FR4.4 下载图片:**
    * 提供"下载图片"按钮，允许用户将生成的图片下载到本地。
    * 可考虑支持多种下载格式（例如：PNG, JPEG）。
    * 默认下载文件名可包含用户输入的标题或固定前缀。
* **FR4.5 获取图片URL:**
    * **FR4.5.1 获取URL按钮:** 提供一个"获取URL"按钮，允许用户获取生成图片的限时访问链接。
    * **FR4.5.2 图片上传处理:** 点击按钮后，系统将生成的图片上传到Supabase存储服务。
        * 应有加载状态提示，告知用户图片正在上传中。
        * 上传过程应包含错误处理，如网络失败、存储空间不足等异常情况。
    * **FR4.5.3 签名URL生成与展示:** 
        * 上传成功后，系统生成图片的签名URL（Signed URL）。
        * 签名URL应设置合理的过期时间（建议7-30天），确保安全性。
        * 在界面上展示生成的签名URL，用户可以复制该链接。
        * 明确显示URL的过期时间，提醒用户有效期限。
    * **FR4.5.4 URL管理:**
        * 提供"复制URL"功能，方便用户快速复制链接。
        * 显示URL的剩余有效时间。
        * 提供"重新生成URL"功能，允许用户在URL过期前或过期后重新生成新的签名URL。
        * 可选：提供URL预览功能，用户可以点击链接在新窗口中查看图片。
        * 可选：显示URL的二维码，方便移动设备访问。
    * **FR4.5.5 存储策略:**
        * 图片文件名应使用唯一标识符（如UUID + 时间戳）避免冲突。
        * 图片应存储在Supabase的私有存储桶中，只能通过签名URL访问。
        * 签名URL的过期时间应可配置，默认建议为7天。
        * 考虑图片的生命周期管理，可设置合理的文件清理策略（如90天后自动删除）。

### 3.5. AI 生成图片 (高级功能,后续再实现，先把框架搭建起来) 

* **FR5.1 AI 生成入口:**
    * 提供一个切换到 AI 生成模式的选项或按钮。
* **FR5.2 AI 输入:**
    * 用户可以输入期望的图片风格描述（例如："赛博朋克风格"，"水彩画效果"，"minimalist design"）。
    * 用户输入的标题和描述将作为内容信息提供给 AI。
    * 用户当前选择或自定义的样式（如颜色偏好、大致布局想法）可以作为参数或提示信息传递给 AI。
* **FR5.3 AI 图片生成请求:**
    * 系统将用户输入的信息和样式偏好发送给集成的 AI 图片生成服务。
    * 应有加载状态提示，告知用户 AI 正在生成图片。
* **FR5.4 AI 生成结果展示与选择 (可选):**
    * AI 可能返回多张候选图片，系统应能展示这些图片供用户选择。
    * 如果 AI 只返回一张图片，则直接展示。
* **FR5.5 AI 图片的后续操作:**
    * 用户选择满意的 AI 生成图片后，可以进行微调（如果技术上可行，允许在 AI 生成图的基础上再应用部分自定义样式）。
    * 用户可以下载 AI 生成的图片。

## 4. 非功能需求

* **NFR1.1 性能:**
    * **NFR1.1.1 预览更新速度:** 样式调整后的预览更新应尽可能流畅，理想情况下在 1 秒内完成。
    * **NFR1.1.2 图片生成速度:** 标准图片（非 AI）生成时间应尽可能短，理想情况下在 5 秒内完成。AI 图片生成时间取决于所选 AI 服务。
    * **NFR1.1.3 图片上传速度:** 图片上传到Supabase的时间应控制在合理范围内，理想情况下在 10 秒内完成（取决于图片大小和网络状况）。
    * **NFR1.1.4 URL访问速度:** 生成的图片URL应能快速访问，加载时间应在 3 秒内。
* **NFR1.2 用户体验 (UX) 与界面设计 (UI):**
    * **NFR1.2.1 设计风格:** 整体视觉设计应追求**简洁、现代、专业、美观**，可参考**苹果 (Apple) 的设计风格**，注重细节、清晰度、留白和用户操作的流畅性。
    * **NFR1.2.2 易用性:** 界面应简洁、直观，易于上手。
    * **NFR1.2.3 操作流畅性:** 操作流程应顺畅，减少用户混淆。
    * **NFR1.2.4 引导与反馈:** 提供必要的提示、引导信息和操作反馈。
* **NFR1.3 兼容性:**
    * 应兼容主流现代桌面浏览器（Chrome, Firefox, Safari, Edge 最新版本）。
    * 响应式设计，适应不同屏幕尺寸（至少在桌面端良好显示）。
* **NFR1.4 可用性:**
    * 服务应保持高可用性。
* **NFR1.5 安全性:**
    * 对于用户上传的图片，处理后应及时清理，不应永久存储（除非用户明确同意或有其他功能需要）。
    * 防止常见的 Web 攻击（如 XSS）。
    * **NFR1.5.1 存储安全:** Supabase存储的图片应配置为私有存储桶，只能通过有效的签名URL访问。
    * **NFR1.5.2 文件安全:** 上传的图片文件应进行基本的安全检查，防止恶意文件上传。
    * **NFR1.5.3 URL安全:** 
        * 签名URL应使用安全的签名算法，防止被伪造或篡改。
        * URL应包含过期时间验证，过期后自动失效。
        * 生成的文件名应使用安全的随机标识符，避免被恶意猜测或遍历。
    * **NFR1.5.4 数据隐私:** 不应在URL或文件名中包含用户的敏感信息。
    * **NFR1.5.5 访问控制:** 
        * 签名URL的过期时间应合理设置，平衡安全性和用户体验。
        * 应提供URL撤销机制，必要时可以使URL提前失效。
* **NFR1.6 代码质量与可维护性:**
    * **NFR1.6.1 模块化:** 代码结构应高度模块化，各功能模块职责清晰、低耦合。
    * **NFR1.6.2 清晰度与可读性:** 代码应编写清晰，遵循统一的编码规范，易于理解和阅读。
    * **NFR1.6.3 可扩展性:** 系统设计应考虑到未来的功能扩展，方便添加新功能或修改现有功能。
    * **NFR1.6.4 文档:** 关键模块和复杂逻辑应有必要的注释或文档。

## 5. 技术栈与集成

* **TS1.1 前端框架:** Next.js
* **TS1.2 图片生成库:** Vercel/og
* **TS1.3 样式:** CSS Modules, Tailwind CSS (或其他现代 CSS 方案，需能支持实现类似苹果的精致设计风格)。
* **TS1.4 状态管理 (可选):** Zustand, Recoil, 或 Next.js 内建方案。
* **TS1.5 云存储服务:** Supabase Storage
    * 用于存储用户生成的图片文件。
    * 需要配置私有存储桶，确保文件只能通过签名URL访问。
    * 集成Supabase JavaScript客户端SDK进行文件上传和签名URL生成。
    * 需要合理配置存储策略，包括文件命名规则、签名URL过期时间和文件生命周期管理。
    * 实现签名URL的生成、验证和重新生成功能。
* **TS1.6 AI 图片生成服务:**
    * 需要调研并选择合适的 AI 图片生成 API (例如：OpenAI DALL·E API, Stability AI API, 或其他类似服务)。
    * 集成方式将取决于所选 API 的 SDK 或 HTTP 请求规范。
* **TS1.7 部署平台:** Vercel (天然契合 Next.js 和 Vercel/og)。
* **TS1.8 代码规范与工具:** ESLint, Prettier 等工具来保证代码风格一致性和质量。

## 6. 界面原型草图 (可选，建议补充)

* (在此处可以添加简单的线框图或描述主要界面的布局和元素)
    * **主编辑界面:** 左侧为输入和样式调整面板（设计上应有清晰的分组和直观的控件），右侧为实时预览区域。整体配色和元素风格参考苹果设计语言。
    * **AI 生成界面:** 切换后的界面，包含风格描述输入框、内容输入区域，以及 AI 生成结果展示区。交互应简洁明了。

## 7. 未来展望 (可选)

* 用户账户系统，保存用户自定义样式和历史生成记录。
* 更多预设模板和素材库 (设计需符合整体风格)。
* 团队协作功能。
* 直接分享到社交媒体平台的功能。

---

已将您的补充说明整合进文档的相应部分，特别是在"项目目标"、"非功能需求"（用户体验与界面设计、代码质量与可维护性）以及"技术栈与集成"（样式、代码规范工具）部分。这使得文档对设计和技术实现的要求更加明确。