# 拓客TI

TECC Type Indicator 是复旦 TECC 招新期间使用的移动端公益人格互动测试。项目为纯前端静态网站，不需要登录、服务器或数据库；答案只保存在当前浏览器的 `localStorage` 中。

## 功能

- 移动端优先的首页、12 道单题答题、计算过渡和结果页
- 全站中英文切换，语言偏好独立保存在当前浏览器
- ME / HF / CH 确定性计分及第 12 题平票裁决
- 刷新后恢复答题位置，支持返回修改答案
- 本次测试倾向百分比与完整部门、项目推荐
- 3:4 人格卡生成与 PNG 下载，资源全部本地加载
- GitHub Pages 自动部署和通用 `dist` 静态构建

## 本地运行

要求 Node.js 20.19 或更高版本。

```bash
npm install
npm run dev
```

Vite 默认在 `http://localhost:5173/` 启动。质量检查命令：

```bash
npm run lint
npm run test
npm run build
npm run preview
```

## 内容与配置

- `src/data/questions.ts`：中英文 12 道题、选项和原始计分映射
- `src/data/results.ts`：中英文人格、部门、项目、口号、颜色和插画路径
- `src/data/siteContent.ts`：中英文首页文案、界面文案和海报文案
- `src/config/siteConfig.ts`：三类人格的招新推送链接、Logo、二维码和分享地址
- `src/data/suggestedScoring.ts`：不参与运行的建议修改版计分表
- `src/lib/scoring.ts`：计分、平票裁决和百分比归一化
- `src/lib/language.ts`：语言偏好的读取与保存

`recruitmentUrls.ME/HF/CH` 分别控制三类人格结果页的招新推送按钮。某一项保持空字符串时，对应结果页会自动隐藏该按钮。

## GitHub Pages 部署

1. 在 GitHub 新建仓库，建议仓库名为 `tecc-ti`。
2. 将本目录提交并推送到 `main` 分支。
3. 推送后 `.github/workflows/deploy.yml` 会尝试自动启用 Pages，执行检查、构建并发布。
4. 如果仓库或组织策略禁止自动启用，请在 `Settings > Pages > Build and deployment` 中手动选择 `GitHub Actions`，再重新运行工作流。

项目采用相对资源路径，因此仓库页地址和自定义域名都可直接使用。仓库名为 `tecc-ti` 时，默认网址形式为：

```text
https://<GitHub用户名>.github.io/tecc-ti/
```

如果 GitHub 拒绝工作流自动启用 Pages，首次确认仓库权限需要仓库所有者本人完成。

## 其他静态托管

运行 `npm run build` 后，把 `dist/` 目录整体上传到 Netlify、Vercel、Cloudflare Pages、对象存储静态网站或任意 Web 服务器即可。构建命令为 `npm run build`，发布目录为 `dist`。本项目无服务端路由，也不需要重写规则。

## 题库审查

原始计分分布、直接暴露部门的问题和平衡建议见 `DESIGN_REVIEW.md`。线上实现保留原始题目与原始计分，没有自动套用建议版。
