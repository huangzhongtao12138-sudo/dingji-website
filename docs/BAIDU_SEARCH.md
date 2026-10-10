# 百度品牌搜索修复与接手

目标：百度搜索“鼎基装饰”能找到 `https://www.djzhuangshi.com/`。

## 2026-10-10 检查与修改

- 线上首页、robots.txt、sitemap.xml 均返回 200，首页允许 index/follow；以 Baiduspider User-Agent 请求也返回正常 HTML，但这不能代替百度真实节点的抓取诊断。
- 检查时裸域名与 www 都直接返回 200；本次添加裸域名到 www 的保路径 301，首页 `/index.html` 与历史首页预览地址也 301 到根首页。
- 首页 title 和 og:title 改为“鼎基装饰官网｜南京鼎基装饰工程有限公司”，描述明确官网身份；删除结构化数据中被误用为公司别名的泛业务词。
- 业务案例、客户服务标题补齐品牌；同步更新实际变动页面的 sitemap lastmod。
- 正式页面待提交清单为 `docs/baidu-urls.txt`，共 13 条，内容来自 sitemap，不含重定向入口或历史预览页。

## 百度后台必须核实的事项

截至本次准备修改时，未获取百度站点后台数据或提交回执；不能将该状态描述为已提交或已收录。

1. 登录百度搜索资源平台，选择或验证 `https://www.djzhuangshi.com/`；若已有该站点，先读取当前状态，避免重复添加。
2. 若平台要求验证文件或 HTML 标签，使用平台实际生成的值。文件必须落在 `outputs/` 并可在生产域名访问；标签放入首页 head。不要生成猜测值。
3. 在抓取诊断中实际测试首页和联系页，记录百度返回的 HTTP、DNS、超时或正文问题；只有证据指向连接问题时才评估托管/CDN 调整。
4. 读取索引量、抓取异常和品牌关键词展现数据。普通搜索或 site 查询不能替代站点后台数据。
5. 按账号实际开放的功能，提交 sitemap（`https://www.djzhuangshi.com/sitemap.xml`）或 `docs/baidu-urls.txt` 中的正式 URL；若使用 API，应通过临时环境变量提供凭据，不将 token 写进仓库、聊天或记录。
6. 保存脱敏后的提交结果、日期与接受数量，之后检查抓取、索引变化和“鼎基装饰”实际搜索结果。不要重复批量推送相同旧页面来制造更新信号。

平台地址：https://ziyuan.baidu.com/

账号密码、验证码、验证身份资料和 API token 不得写入本文件。仅完成网页修改、上线或链接提交，都不代表百度已经收录；最终索引及排序由百度决定。

## 参考

- 百度首页品牌标题规范：https://ziyuan.baidu.com/college/articleinfo?id=3405
- 百度平台使用指南：https://ziyuan.baidu.com/college/articleinfo/?id=3329
- Vercel 重定向配置：https://vercel.com/docs/project-configuration/vercel-json
