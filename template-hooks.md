---
layout: default
title: Block hooks · Foundry Developer
permalink: /template-hooks.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Block hooks</h1>
<p class="lede">Connect developer-owned roots, styles and advanced attributes to Foundry.</p>
<dl class="syntax-list">
<dt>
<code>{{ block.attributes }}</code>
</dt>
<dd>Required root-element attributes. Place it on the element that represents the block. Foundry automatically emits <code>data-foundry-id="…"</code>, <code>data-foundry-block</code>, <code>data-foundry-package="…"</code>, and, for a nested block, <code>data-foundry-parent="…"</code>. It also emits the valid anchor and custom attributes entered by the site author in the final Advanced Inspector group. Canvas rendering adds private editing metadata.</dd>
<dt>
<code>{{ block.class }}</code>
</dt>
<dd>Required inside the root element’s <code>class</code> attribute. It emits Foundry’s generated classes and valid additional classes entered by the site author. It does not emit surrounding whitespace; separate it from adjacent class names with literal whitespace.</dd>
<dt>
<code>:host</code>
</dt>
<dd>In instance CSS and editor CSS, targets every placed instance belonging to the block package. Use it for shared package-wide rules whose values are identical across instances.</dd>
<dt>
<code>:instance</code>
</dt>
<dd>In instance CSS and editor CSS, targets only the exact placed block currently being rendered. Use it for rules containing control values or any style that may differ between instances. Each placement of a global block receives its own instance target.</dd>
</dl>

<p>Use the generated attributes to target block relationships with standard CSS. They identify block roots rather than ordinary internal elements.</p>

<div markdown="1">

```css
/* Any nested block */
:host [data-foundry-block] { … }

/* A particular nested block package */
:host [data-foundry-package="com.example.card"] { … }

/* This block when it contains that package */
:host:has([data-foundry-package="com.example.card"]) { … }
```

</div>
{% endraw %}
