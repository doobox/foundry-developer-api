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
<h3><code>{{ control.&lt;id&gt; }}</code></h3>
<p>Resolves a value declared by <code>customItems</code> or a named theme control. Responsive values resolve at the breakpoint currently being rendered.</p>


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

<p>Instance CSS is rendered separately for every placed component. Use <code>:instance</code> when a rule contains control values so that one instance’s values cannot style another instance of the same package. Use <code>:host</code> only for shared package-wide CSS that does not vary by instance.</p>
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
{% endraw %}
