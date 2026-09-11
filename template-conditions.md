---
layout: default
title: Conditions and expressions · Foundry Developer
permalink: /template-conditions.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Conditions and expressions</h1>
<p class="lede">Select output with conditions and use validated expressions for calculations.</p>
<p>Use an expression after <code>if</code> or <code>elseif</code>. Expressions can combine control values, numbers, quoted Strings, Booleans and the mutually exclusive <code>canvas</code>, <code>preview</code>, and <code>published</code> environment values.</p>


<div markdown="1">

```text
{{ if control.featured }}
    <span class="badge">Featured</span>
{{ elseif control.status == "draft" && control.score >= 10 }}
    <span class="badge draft">Draft</span>
{{ else }}
    <span class="badge muted">Standard</span>
{{ endif }}

{{ if canvas }}Shown only inside Foundry’s canvas
{{ elseif preview }}Shown only on Foundry’s local preview server
{{ elseif published }}Shown only in final export or publishing output
{{ endif }}
```

</div>


<p>Exactly one environment value is true: <code>canvas</code> in Foundry’s editor, <code>preview</code> when Foundry generates a site for its local preview server, or <code>published</code> for final export and publishing output. These values describe how Foundry generated the files; <code>published</code> does not attempt to detect whether the files are currently hosted on a live server.</p>
<p>Environment conditions are available in instance-, page-, and site-scoped templates. Each <code>if</code> requires one <code>endif</code>, may contain any number of <code>elseif</code> branches, and accepts at most one final <code>else</code>.</p>
<section class="reference-entry">
<h3>Expression operators</h3>
<p>Use <code>!</code> for not, <code>&amp;&amp;</code> for and, and <code>||</code> for or. Foundry does not accept word aliases such as <code>and</code>, <code>or</code> or <code>not</code>.</p>


<div markdown="1">

```text
{{ if control.text == "xxxx" && control.number == (control.otherNumber + 32) }}
    ...
{{ endif }}
```

</div>


<p>Operators are evaluated in this order: parentheses; unary <code>!</code> and <code>-</code>; <code>*</code>, <code>/</code> and <code>%</code>; <code>+</code> and <code>-</code>; <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code> and <code>&gt;=</code>; <code>==</code> and <code>!=</code>; <code>&amp;&amp;</code>; then <code>||</code>. Operators at the same level run from left to right.</p>
<p>Arithmetic and ordered comparisons require numbers. Equality compares like-for-like values. A Boolean, non-zero number, non-empty String or non-empty array is truthy. An invalid expression, including division or remainder by zero, produces no output and is false when used as a condition.</p>
</section>
<section class="reference-entry">
<h3>Inline calculations</h3>
<p>The same expression syntax works directly inside an output tag.</p>


<div markdown="1">

```css
width: {{ control.columns * control.columnWidth }}px;
padding: {{ max(control.minimumPadding, control.padding) }}px;
```

</div>


<p>Available numeric functions are <code>abs(value)</code>, <code>round(value)</code>, <code>floor(value)</code>, <code>ceil(value)</code>, <code>min(a, b)</code>, <code>max(a, b)</code> and <code>clamp(value, minimum, maximum)</code>.</p>
</section>
{% endraw %}
