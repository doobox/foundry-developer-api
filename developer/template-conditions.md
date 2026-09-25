---
layout: default
title: Conditions and expressions · Foundry Developer
permalink: /developer/template-conditions.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
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
<h3>Project breakpoints</h3>
<p>Every template scope can inspect the project’s responsive breakpoints. Each entry provides a Boolean <code>enabled</code> value and a numeric <code>minimumWidth</code> in pixels. Available names are <code>mobile</code>, <code>small</code>, <code>medium</code>, <code>large</code>, <code>extraLarge</code>, and <code>doubleExtraLarge</code>.</p>

<div markdown="1">

```css
{{ if breakpoints.medium.enabled }}
@media (min-width: {{ breakpoints.medium.minimumWidth }}px) {
    .card { display: grid; }
}
{{ endif }}
```

</div>

<p><code>minimumWidth</code> is deliberately unitless so it can participate in calculations or be used by JavaScript. Add <code>px</code> when emitting a CSS media query. The mobile breakpoint normally has a minimum width of <code>0</code> and does not require a media query.</p>
</section>
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
<h3>String and wildcard functions</h3>
<p>Template expressions provide the same canonical String and wildcard comparisons as <code>visibleWhen</code>. Each function returns a Boolean and can be combined with the other expression operators.</p>

<div markdown="1">

```text
{{ if contains(control.title, "Foundry") }}...{{ endif }}
{{ if containsInsensitive(control.title, "foundry") }}...{{ endif }}
{{ if matches(control.slug, "docs-*-?") }}...{{ endif }}
{{ if matchesInsensitive(control.filename, "*.JPG") }}...{{ endif }}
```

</div>

<ul class="rule-list">
<li><code>contains(value, search)</code> and <code>notContains(value, search)</code> perform case-sensitive substring searches.</li>
<li><code>containsInsensitive(value, search)</code> and <code>notContainsInsensitive(value, search)</code> perform substring searches while ignoring case.</li>
<li><code>matches(value, pattern)</code> and <code>notMatches(value, pattern)</code> perform case-sensitive whole-string wildcard matches.</li>
<li><code>matchesInsensitive(value, pattern)</code> and <code>notMatchesInsensitive(value, pattern)</code> perform whole-string wildcard matches while ignoring case.</li>
</ul>
<p>Wildcard patterns use <code>*</code> for zero or more characters and <code>?</code> for exactly one character. Wildcards apply only to the <code>matches</code> functions; <code>contains</code> always treats its search value literally.</p>
</section>
<section class="reference-entry">
<h3>Array and empty-value functions</h3>
<p>Use <code>containsValue(array, value)</code> to test for an exact, type-aware array member and <code>notContainsValue(array, value)</code> for its inverse. Use <code>isEmpty(value)</code> and <code>isNotEmpty(value)</code> with Strings, arrays, and objects. Number <code>0</code> and Boolean <code>false</code> are values and are not empty.</p>

<div markdown="1">

```text
{{ if containsValue(control.tags, "featured") }}...{{ endif }}
{{ if isNotEmpty(control.caption) }}...{{ endif }}
```

</div>
</section>
<section class="reference-entry">
<h3>Inline calculations</h3>
<p>The same expression syntax works directly inside an output tag.</p>


<div markdown="1">

```css
width: {{ control.columns * control.columnWidth }}px;
width: {{ max(control.minimumWidth, control.width) }}px;
```

</div>


<p>Available numeric functions are <code>abs(value)</code>, <code>round(value)</code>, <code>floor(value)</code>, <code>ceil(value)</code>, <code>min(a, b)</code>, <code>max(a, b)</code> and <code>clamp(value, minimum, maximum)</code>.</p>
</section>
{% endraw %}
