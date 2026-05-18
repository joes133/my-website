# CarameL's Library - 个人网站

> https://caramel-personal-website.vercel.app/

## 📚 项目结构

```
my-website/
├── index.html              # 开场动画页（3D 地球）
├── library.html            # 书架主界面
├── css/
│   ├── library.css         # 书架样式
│   ├── resume.css          # 简历样式
│   └── module.css          # 模块通用样式
├── js/
│   ├── earth.js            # 3D 地球动画
│   ├── auth.js             # 密码验证逻辑
│   └── resume.js           # 简历页面交互
├── assets/
│   ├── images/             # 图片资源
│   └── sounds/             # 音效资源
├── resume/                 # 简历模块（公开）
├── hobbies/                # 个人爱好
├── social/                 # 社交
├── growth/                 # 成长经历
├── art/                    # 艺术与审美
├── personality/            # 性格与特质
└── moments/                # Moments
```

## 🚀 快速开始

### 本地预览

```bash
# 方法 1: 使用 Python
cd my-website
python3 -m http.server 8080

# 方法 2: 使用 Node.js
npx serve .

# 方法 3: 使用 PHP
php -S localhost:8080
```

然后访问 `http://localhost:8080`

### 部署到 Vercel

1. **安装 Vercel CLI**（可选）
```bash
npm i -g vercel
```

2. **推送到 GitHub**
```bash
cd my-website
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/joes133/my-website.git
git push -u origin main
```

3. **部署到 Vercel**
   - 访问 https://vercel.com
   - 导入 GitHub 仓库
   - 点击 Deploy

或者使用 CLI：
```bash
vercel --prod
```

## 🔐 密码配置

修改 `js/auth.js` 中的密码：

```javascript
const PASSWORDS = {
    hobbies: '***',      // 个人爱好密码
    social: '***',      // 社交密码
    growth: '***,      // 成长经历密码
    art: '***',          // 艺术与审美密码
    personality: '***', // 性格与特质密码
    moments: '***',     // moments 密码
    admin: '***'        // 管理员密码
};
```

⚠️ **注意**：前端密码验证仅用于简单保护，请不要无故攻击或者解码。

## 🎨 优化方向

### 修改头像

1. 准备一张图片（建议 200x200 或更大）
2. 保存到 `assets/images/avatar.jpg`
3. 或者修改 `resume/index.html` 中的图片路径

### 修改简历内容

编辑 `resume/index.html`，找到对应部分修改：
- 个人信息
- 教育经历
- 项目经历
- 技能列表
- 联系方式

### 修改模块内容

每个模块都有独立的文件夹，编辑对应的 `index.html`：
- `hobbies/index.html` - 个人爱好
- `social/index.html` - 社交
- `growth/index.html` - 成长经历
- `art/index.html` - 艺术与审美
- `personality/index.html` - 性格与特质
- `moments/index.html` - Moments

### 修改样式

- `css/resume.css` - 简历页面样式
- `css/library.css` - 书架页面样式
- `css/module.css` - 模块通用样式

## 🌍 开场动画

开场动画使用 Three.js 创建 3D 地球效果：
- 地球是程序生成的（Canvas 纹理），不需要外部图片
- 星空背景是随机生成的粒子
- 动画自动播放，用户点击"进入我的世界"后跳转到书架页

### 添加音效

1. 准备音效文件（MP3 格式）
2. 保存到 `assets/sounds/enter.mp3`
3. 音效会在点击按钮时播放

## 📱 响应式设计

网站已适配移动端：
- 书架在手机上会自动调整布局
- 简历页面在手机上会堆叠显示
- 导航栏在手机上会自动换行

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **JavaScript** - 交互逻辑
- **Three.js** - 3D 地球动画
- **Vercel** - 部署托管

## 🎯 其他建议

1. **添加后端认证** - 使用 Node.js/Python 实现真正的密码验证
2. **添加数据库** - 存储访问日志、访客留言等
3. **添加 CMS** - 方便管理内容（如 Strapi、Contentful）
4. **添加分析** - 集成 Google Analytics 或 Umami
5. **添加 PWA** - 支持离线访问和添加到主屏幕

## 📄 License

© 2026 CarameL · All Rights Reserved

---

**Made with ❤️ by CarameL**
