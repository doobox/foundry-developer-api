---
layout: default
title: Control values · Foundry Developer
permalink: /template-controls.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Control values</h1>
<p class="lede">Read values declared by customItems and named theme controls.</p>
<section class="reference-entry">
<h3>{{ control.&lt;id&gt; }}</h3>
<p>Resolves a value declared by <code>customItems</code> or a named theme control. Responsive values resolve at the breakpoint currently being rendered.</p>


<div markdown="1">

```css
[data-foundry-id="{{ instance.uuid }}"] {
    max-width: {{ control.maxWidth }}px;
    text-align: {{ control.alignment }};
}

[data-foundry-id="{{ instance.uuid }}"] .media {
    opacity: {{ control.imageOpacity }};
}
```

</div>


</section>
<section class="reference-entry">
<h3>{{ control.&lt;id&gt;[&lt;index&gt;] }}</h3>
<p>Resolves one member of a control array using a zero-based index.</p>


<div markdown="1">

```css
[data-foundry-id="{{ instance.uuid }}"] {
    --primary: {{ control.palette[0] }};
    --secondary: {{ control.palette[1] }};
    padding: {{ control.insets[0] }}px {{ control.insets[1] }}px;
}
```

</div>


<p>The index must refer to an item declared by the control’s <code>count</code>. See <a href="control-arrays.html">Control arrays</a>.</p>
</section>
{% endraw %}
