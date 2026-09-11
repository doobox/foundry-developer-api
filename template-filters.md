---
layout: default
title: Output filters · Foundry Developer
permalink: /template-filters.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Output filters</h1>
<p class="lede">Transform emitted control values without changing the values stored by the Inspector.</p>
<p>Place a pipe after a control reference to transform only its emitted template value. Filters do not change the value stored by the Inspector.</p>


<div markdown="1">

```text
{{ control.value | filter(argument) }}
```

</div>

<p>A filter argument may be a literal or a compatible control value, such as <code>control.reviewDelay</code>. This also applies to each argument of filters that accept more than one.</p>


<p>Colour values support <code>lighten(percentage)</code>, <code>darken(percentage)</code>, <code>withAlpha(value)</code> and <code>mix("#RRGGBB", percentage)</code>. Colour filters may be chained from left to right.</p>


<div markdown="1">

```css
background: {{ control.brandColor | darken(10) | withAlpha(0.8) }};
border-color: {{ control.brandColor | mix(control.borderColor, control.mixAmount) }};
```

</div>


<p>Date values support <code>formatDate("pattern")</code>, using Unicode date-field symbols, plus chainable <code>addDays(integer)</code> and <code>addMonths(integer)</code> calendar arithmetic.</p>


<div markdown="1">

```html
<time datetime="{{ control.published }}">{{ control.published | formatDate("d MMMM yyyy") }}</time>
<time datetime="{{ control.published | addDays(control.reviewDelay) }}">Review date</time>
```

</div>

{% endraw %}
