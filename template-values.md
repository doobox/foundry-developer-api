---
layout: default
title: Template values · Foundry Developer
permalink: "/template-values.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a>
<span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Put values where they belong</h1>
<p class="lede">Use Foundry’s template values to place instance identity, inspector values, assets, conditions, editable content, and child-component slots in developer-owned markup and styles.</p>
<div class="note">
<strong>Looking for Info.plist declarations?</strong> See <a href="templates.html">Template files</a> for the separate HTML, CSS, JavaScript, PHP, additional HTML, and editor CSS rules.</div>
<h2>Identity and package values</h2>
<section class="reference-entry">
<h3>{{ id }} and {{ instance.id }}</h3>
<p>Equivalent spellings that resolve to a stable, CSS-safe ID unique to the instance, such as <code>foundry-a12b…</code>. Whitespace inside braces is optional, so <code>{{id}}</code> is equivalent; the spaced form is recommended for readability.</p>


<div markdown="1">

```xml
<article {{ component.attributes }}>…</article>

#{{ id }} { border-radius: 12px; }
#{{ id }} .title { font-weight: 700; }
```

</div>


</section>
<section class="reference-entry">
<h3>{{ instance.uuid }}</h3>
<p>The raw stable UUID for the instance, without the <code>foundry-</code> prefix. It is primarily useful in generated values that need the unprefixed identifier.</p>
</section>
<section class="reference-entry">
<h3>{{ package.id }}</h3>
<p>The escaped reverse-domain package identifier. It is available in all scopes and is the preferred value for shared package selectors.</p>


<div markdown="1">

```text
[data-foundry-package="{{ package.id }}"] { … }
```

</div>


</section>
<section class="reference-entry">
<h3>{{ asset.&lt;path&gt; }}</h3>
<p>An escaped URL for a safe relative path declared by an asset dictionary’s required <code>path</code> value. Foundry resolves it to the current page’s <code>files/</code> directory or the site’s global <code>assets/</code> directory according to the dictionary’s optional <code>scope</code> value. An omitted scope means <code>page</code>.</p>


<div markdown="1">

```xml
<img src="{{ asset.images/icon.svg }}" alt="">
```

</div>


</section>
<h2>Site, page, and path values</h2>
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
<h2>Control values</h2>
<section class="reference-entry">
<h3>{{ control.&lt;id&gt; }}</h3>
<p>Resolves a value declared by <code>customItems</code> or a named theme control. Responsive values resolve at the breakpoint currently being rendered.</p>


<div markdown="1">

```css
#{{ id }} {
    max-width: {{ control.maxWidth }}px;
    text-align: {{ control.alignment }};
}

#{{ id }} .media {
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
#{{ id }} {
    --primary: {{ control.palette[0] }};
    --secondary: {{ control.palette[1] }};
    padding: {{ control.insets[0] }}px {{ control.insets[1] }}px;
}
```

</div>


<p>The index must refer to an item declared by the control’s <code>count</code>. See <a href="control-arrays.html">Control arrays</a>.</p>
</section>
<h2>Conditions</h2>
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
<h2>Component hooks</h2>
<dl class="syntax-list">
<dt>
<code>{{ component.attributes }}</code>
</dt>
<dd>Required root-element attributes. Place it on the element that represents the component. It emits the stable HTML <code>id</code> used by instance JavaScript; Foundry adds private editing metadata only while rendering the canvas.</dd>
<dt>
<code>{{ component.class }}</code>
</dt>
<dd>Foundry’s generated class fragment, including a leading space when non-empty, for appending inside an existing <code>class</code> attribute.</dd>
<dt>
<code>:host</code>
</dt>
<dd>In component CSS, replaced with a package boundary selector matching either <code>data-foundry-package</code> or the generated package class.</dd>
</dl>
<div class="note">
<strong>No hidden selector rules.</strong> Foundry does not assume that a control belongs on the top-level element. Use the same control more than once or target any descendant your component requires.</div>
<div class="page-links">
<a class="card" href="templates.html"><strong>Template files</strong><p>File types, scopes, placement, closures, PHP, and editor CSS.</p></a>
<a class="card" href="custom-controls.html"><strong>Custom controls</strong><p>Declare the inspector values consumed by <code>{{ control.id }}</code>.</p></a>
</div>
{% endraw %}
