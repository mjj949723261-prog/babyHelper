# 宝宝陪伴助手

这是一个基于 `uni-app + Vue 3 + Vite` 的项目，当前已经整理成一套可同时支持：

- `浏览器 Web`
- `微信小程序`

## 环境要求

- Node.js 18 及以上
- npm 9 及以上
- 微信开发者工具

## 安装依赖

```bash
npm install
```

## 浏览器运行

启动浏览器开发环境：

```bash
npm run dev:h5
```

默认地址：

```text
http://localhost:5173
```

构建浏览器版本：

```bash
npm run build:h5
```

本地预览浏览器构建产物：

```bash
npm run preview:h5
```

## 微信小程序运行

启动小程序开发编译：

```bash
npm run dev:mp-weixin
```

启动后，将微信开发者工具导入以下目录：

```text
dist/dev/mp-weixin
```

如果只需要打包产物：

```bash
npm run build:mp-weixin
```

构建目录：

```text
dist/build/mp-weixin
```

## 当前目录结构

- `src/pages/` 页面入口
- `src/components/` 共享组件
- `src/composables/` 组合式逻辑
- `src/constants/` 常量
- `src/web-main.ts` 浏览器入口
- `src/main.ts` 微信小程序入口
- `project.config.json` 微信开发者工具项目配置

## 常用命令

```bash
npm run type-check
npm run dev:h5
npm run dev:mp-weixin
npm run build:h5
npm run build:mp-weixin
```
