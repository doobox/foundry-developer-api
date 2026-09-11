---
layout: default
title: Output encoding · Foundry Developer
permalink: /template-encoding.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Output encoding</h1>
<p class="lede">Encode values safely for visible HTML, attributes, URLs and JSON.</p>

<p>Foundry escapes ordinary control output for HTML by default. Use an explicit output filter when a value is inserted into another context:</p>

<dl class="syntax-list">
<dt><code>escapeHTML</code></dt>
<dd>Escapes a value for visible text between HTML tags. This is the explicit form of Foundry's default control-value escaping.</dd>
<dt><code>escapeHTMLAttribute</code></dt>
<dd>Escapes a value placed inside a quoted HTML attribute.</dd>
<dt><code>encodeURL</code></dt>
<dd>Encodes a complete URL while preserving its structure. It accepts HTTP, HTTPS, email, telephone and relative URLs, and returns an empty value for unsupported schemes.</dd>
<dt><code>encodeURIComponent</code></dt>
<dd>Percent-encodes one value being inserted into a URL path, query or fragment.</dd>
<dt><code>encodeJSON</code></dt>
<dd>Serializes the control value as JSON and preserves strings, numbers, Booleans and arrays. Characters that could terminate an HTML script context are escaped.</dd>
</dl>

<div markdown="1">

```html
<h2>{{ control.title | escapeHTML }}</h2>
<div aria-label="{{ control.title | escapeHTMLAttribute }}"></div>
<a href="{{ control.website | encodeURL | escapeHTMLAttribute }}">Website from a Text control</a>
<a href="/search?q={{ control.searchTerm | encodeURIComponent }}">Search</a>
<a href="{{ control.destination }}">Complete Link control URL</a>
<script>
    const title = {{ control.title | encodeJSON }};
    const enabled = {{ control.enabled | encodeJSON }};
    const items = {{ control.items | encodeJSON }};
</script>
```

</div>

<p>Prefer a Link control for links chosen by the user. When a Text or Select control deliberately supplies a complete URL, apply <code>encodeURL</code>; use <code>encodeURIComponent</code> only for one value inserted into a URL constructed by the template.</p>

<p><code>encodeJSON</code> emits a complete JSON value, including quotation marks around strings. Do not add another pair of quotes. When JSON is placed in an HTML attribute, apply the filters from the data format outwards:</p>

<div markdown="1">

```html
<div data-title="{{ control.title | encodeJSON | escapeHTMLAttribute }}"></div>
```

</div>
{% endraw %}
