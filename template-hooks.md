---
layout: default
title: Component hooks · Foundry Developer
permalink: /template-hooks.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Component hooks</h1>
<p class="lede">Connect developer-owned roots, styles and advanced attributes to Foundry.</p>
<dl class="syntax-list">
<dt>
<code>{{ component.attributes }}</code>
</dt>
<dd>Required root-element attributes. Place it on the element that represents the component. Foundry automatically emits <code>data-foundry-id="…"</code>, <code>data-foundry-component</code>, <code>data-foundry-package="…"</code>, and, for a nested component, <code>data-foundry-parent="…"</code>. It also emits the valid anchor and custom attributes entered by the site author in the final Advanced Inspector group. Canvas rendering adds private editing metadata. If the hook is omitted, Foundry places these attributes on its generated wrapper instead.</dd>
<dt>
<code>{{ component.class }}</code>
</dt>
<dd>Required inside the root element’s <code>class</code> attribute. It emits Foundry’s generated classes and valid additional classes entered by the site author, including a leading space when non-empty.</dd>
<dt>
<code>:host</code>
</dt>
<dd>In component CSS, replaced with a package boundary selector matching either <code>data-foundry-package</code> or the generated package class.</dd>
</dl>

<p>Use the generated attributes to target component relationships with standard CSS. They identify component roots rather than ordinary internal elements.</p>

<div markdown="1">

```css
/* Any nested component */
:host [data-foundry-component] { … }

/* A particular nested component package */
:host [data-foundry-package="com.example.card"] { … }

/* This component when it contains that package */
:host:has([data-foundry-package="com.example.card"]) { … }
```

</div>
{% endraw %}
