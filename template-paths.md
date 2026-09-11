---
layout: default
title: Site, page, and path values · Foundry Developer
permalink: /template-paths.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Site, page, and path values</h1>
<p class="lede">Resolve public URLs and paths relative to the generated output.</p>
<dl class="syntax-list">
<dt><code>{{ site.baseURL }}</code></dt>
<dd>The site’s validated public base URL, without a trailing slash. It is empty when no valid public URL is configured.</dd>
<dt><code>{{ page.url }}</code></dt>
<dd>The absolute public URL of the current page. It is available to instance- and page-scoped templates and is empty when no valid public URL is configured.</dd>
<dt><code>{{ path.siteRoot }}</code></dt>
<dd>A relative path from the generated output containing the template to the published site root.</dd>
<dt><code>{{ path.siteAssets }}</code></dt>
<dd>A relative path from the generated output containing the template to the global <code>assets/</code> directory.</dd>
</dl>
{% endraw %}
