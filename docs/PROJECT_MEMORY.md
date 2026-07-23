# 鼎基装饰官网项目资料库

最后核对日期：2026-07-22

本文件是新对话快速了解项目的长期资料库。实际页面和正式资料发生变化时，必须同步更新本文件。

## 一、项目身份

- 项目名称：鼎基装饰官网
- 公司全称：南京鼎基装饰工程有限公司
- 品牌简称：鼎基装饰
- 英文展示名：Top Decoration
- GitHub 仓库：`huangzhongtao12138-sudo/dingji-website`
- 默认分支：`main`
- 正式域名：`https://www.djzhuangshi.com/`
- 裸域名：`djzhuangshi.com`
- 项目定位：长期维护的正式企业官网，不是一次性演示页面。

## 二、已确认公司资料

以下资料来自当前正式官网页面与结构化数据。修改前需获得用户确认。

- 公司始建年份：1998 年
- 现代化生产基地：26,000㎡
- 累计项目实践：3,000+
- 服务城市与合作伙伴：80+
- 项目咨询手机：`13505151512`
- 办公电话：`025-83247705 / 09`
- 电子邮箱：`njdj_top@126.com`
- 公司地址：南京市鼓楼区中山路99号913-915室
- 服务区域的现有结构化数据表述：南京、江苏、中国

### 当前业务范围

- 餐饮装修与餐饮门店装修
- 连锁门店装修与标准化工程交付
- 商业空间设计施工
- 办公室装修
- 酒店装修
- 医疗空间装修
- 设计深化
- 装饰施工
- 机电消防配合
- 成品制造
- 售后维修、维护、改造升级与长期支持

任何具体项目范围仍需结合实际资料确认，官网不得写成无条件承诺。

## 三、品牌与内容原则

### 视觉

- 主品牌红：`#f30700`
- 常用深红：`#b80000`
- 背景：纸张米灰、浅灰米色渐变
- 视觉特点：大字号粗体中文标题、玻璃质感卡片、圆角胶囊导航、克制的红色强调
- 品牌调性：简洁、高级、专业、可信，适合装饰工程与商业空间企业
- 现有页面已包含桌面端与手机端适配，新增内容需延续同一语言。

### 文案

- 使用专业、可信、自然的中文。
- 保留已经确认的内容，不因新任务随意重写整站。
- 不虚构荣誉、资质、客户、数字、工期、经营规模或项目成果。
- “设计施工一体化”“标准化、可复制、可落地”是当前核心表达，但不应机械重复。
- 公司全称、品牌简称和联系方式始终保持一致。

## 四、技术与目录

- 网站类型：纯静态 HTML/CSS/JavaScript
- 全站纵向滚动：本地托管 Lenis 1.3.25，由 `outputs/site-assets/lenis-init.js` 统一初始化；手机触控与“减少动态效果”保留原生行为
- 首页精选项目：使用本地真实案例图片组成环形项目轨道；桌面端支持自动轮转、箭头、拖拽和键盘切换，手机端使用原生横向滑动
- 关于页 3D 场景：桌面端按需加载 Spline Viewer 与本地 `scene.splinecode`，仅作为无边框、无场景文字的首屏背景动效；加载前保持低对比深色背景，不显示红球等抢眼占位动画；移动端、省流量模式和“减少动态效果”使用轻量 CSS 视觉回退
- 生产目录：`outputs/`
- 生产首页：`outputs/index.html`
- Vercel Framework Preset：Other
- Build Command：留空
- Vercel Output Directory：`outputs`
- DNS：阿里云
- 托管与 HTTPS：Vercel
- 推送到 GitHub `main` 后，Vercel 自动发布正式官网。

### 关键文件

- `outputs/index.html`：正式首页
- `outputs/dingji-about.html`：关于我们
- `outputs/dingji-cases.html`：业务案例
- `outputs/dingji-service.html`：客户服务
- `outputs/dingji-careers.html`：加入我们
- `outputs/dingji-honors.html`：荣誉资质
- `outputs/dingji-contact.html`：联系我们
- `outputs/dingji-consulting.html`：咨询服务
- `outputs/dingji-chain-store.html`：连锁店装修
- `outputs/dingji-faq.html`：常见问题
- `outputs/cases/`：案例详情页面
- `outputs/site-assets/`：Logo、工厂、资质与共享样式等资源
- `outputs/site-assets/lenis.min.js`、`lenis.css`、`lenis-init.js`：全站平滑滚动依赖与统一配置
- `outputs/site-assets/about-v2.css`、`about-v2.js`、`about/scene.splinecode`：关于页视觉、交互与 3D 场景资源
- `outputs/public/assets/cases/`：案例图片
- `outputs/sitemap.xml`：站点地图
- `outputs/robots.txt`：搜索引擎抓取规则
- `vercel.json`：缓存、安全响应头与案例路由重写
- `DEPLOYMENT.md`：部署与 DNS 流程

### 非生产或辅助内容

- `outputs/dingji-homepage-preview.html`：首页预览/历史辅助文件；正式首页始终以 `outputs/index.html` 为准。
- 根目录中与正式仓库无关的临时文件或空目录，不得当作生产源码。

## 五、页面与搜索结构

### 首页搜索标题

`南京装修公司｜餐饮门店与连锁商业空间设计施工｜鼎基装饰`

### 当前重点站点入口

1. 联系我们
2. 咨询服务
3. 客户服务
4. 连锁店装修
5. 常见问题

2026-07-22 已完成的搜索结构改进：

- 新增上述独立可收录页面；
- 首页增加“快速找到所需服务”入口区；
- 主导航用独立页面替换首页联系锚点；
- 新增 Service、ContactPage、FAQPage 与 BreadcrumbList 等 JSON-LD；
- sitemap 已加入四个新增页面；
- 已通过桌面端、390px 手机端、内部链接、JSON-LD 与 sitemap 验证；
- Git 提交：`db5c63f Improve search sitelink structure`。

Google 站点子链接由搜索引擎自动生成。网站结构只能提高出现概率，不能保证展示时间和结果。更新后通常需要等待重新抓取与处理。

## 六、部署与发布状态

截至 2026-07-22：

- `main` 已推送到 GitHub；
- Lenis 全站滚动更新由提交 `22b5d6a` 引入并已发布；
- Vercel 已自动发布当前 `main`；
- `https://www.djzhuangshi.com/dingji-contact.html` 返回 HTTP 200；
- sitemap 已在线包含 contact、consulting、chain-store 和 faq 四个新入口。

发布后的常规确认：

1. 正式首页能打开；
2. 新增或修改页面返回 HTTP 200；
3. 页面标题和 canonical 正确；
4. `robots.txt` 与 `sitemap.xml` 正常；
5. Vercel 构建没有报错；
6. 重要页面在桌面端和手机端正常。

## 七、资料更新联动规则

### 修改电话、邮箱或地址

同步检查首页、联系页、客户服务页、咨询页、JSON-LD 和本资料库。

### 修改公司名称或品牌名

同步检查所有页面标题、页头品牌、页脚、Open Graph、WebSite/Organization/LocalBusiness JSON-LD、README 和本资料库。

### 修改业务范围

同步检查首页介绍、关于页、业务案例页、连锁店装修页、咨询页、服务页、首页结构化数据和相关 meta description。

### 新增或删除页面

同步更新主导航或相关入口、内部链接、canonical、JSON-LD、sitemap、页面清单和本资料库。

### 新增确定性资料

只有用户明确提供或正式文件能够验证的资料才能写入“已确认公司资料”。不确定信息放入“待确认事项”。

## 八、待确认或后续可补资料

- ICP 备案号与公安备案号
- 1200×630 的正式官网分享封面图
- 百度统计、Google Analytics 或 Microsoft Clarity 是否启用
- Google Search Console、百度搜索资源平台等是否已经完成验证与 sitemap 提交
- 更完整的公司正式简介、发展节点和已授权客户/案例资料
- 各资质证书的正式文字说明与有效期展示规则

这些内容没有确认前，不应擅自添加到官网。

## 九、信息优先级

发生冲突时按以下顺序处理：

1. 用户在当前任务中明确确认的新资料；
2. 公司正式文件、证照或用户提供的权威原件；
3. 当前生产页面及其结构化数据；
4. 本资料库；
5. README、部署文档和历史提交；
6. 旧聊天记录或模型推测。

确认新事实后，应同时修改实际页面与本资料库，避免长期记忆落后于官网。
