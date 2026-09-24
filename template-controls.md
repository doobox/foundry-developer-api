---
layout: default
title: Values and paths · Foundry Developer
permalink: /template-controls.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Template API</p>
<h1>Values and paths</h1>
<p class="lede">Read Inspector values and Foundry’s current site, page and output paths.</p>
<section class="reference-entry">
<h3><code>{{ control.&lt;id&gt; }}</code></h3>
<p>Resolves a value declared in the <code>inspector</code> or a named framework control. Responsive values resolve at the breakpoint currently being rendered.</p>


<div markdown="1">

```css
:instance {
    max-width: {{ control.maxWidth }}px;
    text-align: {{ control.alignment }};
}

:instance .media {
    opacity: {{ control.imageOpacity }};
}
```

</div>

<p>Instance CSS is rendered separately for every placed part. Use <code>:instance</code> when a rule contains control values so that one instance’s values cannot style another instance of the same package. Use <code>:host</code> only for shared package-wide CSS that does not vary by instance.</p>
<p>A control with <code>valueAvailability</code> set to <code>whenVisible</code> resolves to an empty substitution while its <code>visibleWhen</code> condition is false. Its stored value is preserved. See <a href="visible-when.html">Conditional visibility</a>.</p>
</section>
<section class="reference-entry">
<h3><code>{{ control.&lt;id&gt;[&lt;index&gt;] }}</code></h3>
<p>Resolves one member of a control array using a zero-based index.</p>


<div markdown="1">

```css
:instance {
    --primary: {{ control.palette[0] }};
    --secondary: {{ control.palette[1] }};
    padding: {{ control.insets[0] }}px {{ control.insets[1] }}px;
}
```

</div>


<p>The index must refer to an item declared by the control’s <code>count</code>. See <a href="control-arrays.html">Control arrays</a>.</p>
</section>
<section class="reference-entry">
<h3><code>{{ site.baseURL }}</code></h3>
<p>The escaped public base URL configured for the site.</p>
</section>
<section class="reference-entry">
<h3><code>{{ page.url }}</code></h3>
<p>The escaped public URL of the page currently being rendered. It is unavailable to site-scoped files.</p>
</section>
<section class="reference-entry">
<h3><code>{{ path.siteRoot }}</code></h3>
<p>A relative path from the current generated file to the site output root.</p>
</section>
<section class="reference-entry">
<h3><code>{{ path.siteAssets }}</code></h3>
<p>A relative path from the current generated file to the site’s shared assets directory.</p>
</section>
{% endraw %}
