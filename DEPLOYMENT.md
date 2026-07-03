# 鼎基装饰官网部署流程

域名：`djzhuangshi.com`

## 当前采用结构

- Vercel：负责网站托管、自动部署、HTTPS、全球访问。
- 阿里云 DNS：负责 `djzhuangshi.com` 的域名解析。
- 阿里云 OSS / CDN：先不作为主站，后续备案完成后可作为国内镜像或备用加速方案。
- 源文件目录：`outputs/`
- 生产首页：`outputs/index.html`

## Vercel 自动部署 + 阿里云 DNS

1. 将当前项目推送到 GitHub 或 GitLab 仓库。
2. 在 Vercel 新建项目并绑定仓库。
3. Project Settings 中设置：
   - Framework Preset: Other
   - Build Command: 留空
   - Output Directory: `outputs`
4. 添加域名：
   - `djzhuangshi.com`
   - `www.djzhuangshi.com`
5. 建议把 `www.djzhuangshi.com` 设为主域名，`djzhuangshi.com` 自动跳转到 `www`。
6. 在阿里云 DNS 里按 Vercel 后台提示添加解析记录：
   - 主机记录 `@`：通常添加 A 记录，记录值以 Vercel 后台显示为准。
   - 主机记录 `www`：通常添加 CNAME 记录，记录值以 Vercel 后台显示为准。
   - 如果 Vercel 要求域名验证，再按提示添加 TXT 记录。
7. 等待 DNS 生效，Vercel 显示域名状态为 Valid 后，网站即可通过正式域名访问。
8. 之后每次修改网站并推送仓库，Vercel 会自动更新线上版本。

## 阿里云 OSS / CDN 备用方案

1. 如果后续要使用中国大陆 OSS / CDN，需要先完成 ICP 备案。
2. 备案后可使用 OSS 静态网站托管：
   - Bucket 放在华东或离主要客户更近的区域。
   - 上传 `outputs/` 下所有文件。
   - 设置默认首页：`index.html`
   - 设置 404 页面：可后续补 `404.html`
3. 开启 CDN：
   - 源站指向 OSS Bucket
   - 配置 HTTPS 证书
   - 设置缓存规则，图片和静态资源长期缓存，HTML 短缓存
4. 后续自动更新可以用 GitHub Actions / 阿里云 CLI，把 `outputs/` 自动同步到 OSS。

## 搜索收录

上线后确认以下地址可以打开：

- `https://www.djzhuangshi.com/`
- `https://www.djzhuangshi.com/robots.txt`
- `https://www.djzhuangshi.com/sitemap.xml`

然后提交：

- Google Search Console：验证域名并提交 sitemap。
- 百度搜索资源平台：验证站点并提交 sitemap。
- 必应站长工具、360、搜狗：可作为补充。

## 当前已完成的 SEO 基础

- 每个主要页面已配置 title。
- 每个主要页面已配置 meta description。
- 每个主要页面已配置 canonical。
- 首页已加入公司结构化数据。
- 已生成 `robots.txt`。
- 已生成 `sitemap.xml`。

## 后续建议补充

- 公司正式联系方式与底部版权信息。
- 备案号与公安备案号。
- 1200x630 官网分享封面图。
- 百度统计、Google Analytics、Microsoft Clarity。
- 页面图片 alt 文本。
- 正式案例图片与荣誉资质图片。
