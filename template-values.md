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
<h2 id="repeating-content">Repeating content</h2>
<p>Use a <code>repeat</code> block to generate the same template content a fixed or user-controlled number of times. The block may contain markup, template values, conditions, editable text, editable HTML, images, and nested repeat blocks.</p>


<div markdown="1">

```html
<div class="gallery" {{ component.attributes }}>
    {{ repeat 8 }}
        <figure>
            {{ image }}
            <figcaption>{{ text="Image caption" }}</figcaption>
        </figure>
    {{ endrepeat }}
</div>
```

</div>


<p>A literal count must be a whole number from <code>0</code> through <code>100</code>. Each <code>repeat</code> requires a matching <code>endrepeat</code>.</p>

<h3>Use a control for the count</h3>
<p>Reference a number or slider control when the component user should choose how many items appear. The control must declare an explicit finite <code>maximum</code> from <code>0</code> through <code>100</code>. Foundry rounds the current value down to a whole number and constrains it to the control’s supported range.</p>


<div markdown="1">

```html
<ul class="items" {{ component.attributes }}>
    {{ repeat control.itemCount }}
        <li>{{ text="Item" }}</li>
    {{ endrepeat }}
</ul>
```

</div>


<div markdown="1">

```xml
<dict>
    <key>id</key><string>itemCount</string>
    <key>labels</key><string>Items</string>
    <key>type</key><string>number</string>
    <key>minimum</key><integer>0</integer>
    <key>maximum</key><integer>12</integer>
    <key>default</key><integer>4</integer>
    <key>responsive</key><false/>
</dict>
```

</div>


<h3>Repeat values</h3>
<dl class="syntax-list">
<dt><code>{{ repeat.index }}</code></dt>
<dd>The current item’s zero-based index.</dd>
<dt><code>{{ repeat.position }}</code></dt>
<dd>The current item’s one-based position.</dd>
<dt><code>{{ repeat.count }}</code></dt>
<dd>The number of items currently emitted by this repeat block.</dd>
<dt><code>{{ repeat.first }}</code></dt>
<dd><code>true</code> for the first emitted item and <code>false</code> otherwise.</dd>
<dt><code>{{ repeat.last }}</code></dt>
<dd><code>true</code> for the last emitted item and <code>false</code> otherwise.</dd>
</dl>


<div markdown="1">

```html
{{ repeat control.itemCount }}
    <article class="item item-{{ repeat.position }}">
        {{ if repeat.first }}<strong>First item</strong>{{ endif }}
        <span>{{ repeat.position }} of {{ repeat.count }}</span>
    </article>
{{ endrepeat }}
```

</div>


<h3>Nested repeats</h3>
<p>Repeat blocks may be nested. Inside a nested block, prefix any outer-block value with <code>repeat.parent.</code>: <code>repeat.parent.index</code>, <code>repeat.parent.position</code>, <code>repeat.parent.count</code>, <code>repeat.parent.first</code>, or <code>repeat.parent.last</code>.</p>


<div markdown="1">

```html
{{ repeat 3 }}
    <div class="row-{{ repeat.position }}">
        {{ repeat 4 }}
            <span>{{ repeat.parent.position }}.{{ repeat.position }}</span>
        {{ endrepeat }}
    </div>
{{ endrepeat }}
```

</div>


<div class="note">
<strong>Editable values remain stable.</strong> Foundry assigns a distinct persistent value to every repeated <code>{{ text }}</code>, <code>{{ html }}</code>, and <code>{{ image }}</code> position up to the declared maximum. Reducing and later increasing the count therefore restores the content previously entered for those positions.</div>
<div class="callout warning">
<strong>Keep nested output reasonable.</strong> To prevent accidental runaway templates, one rendered template may expand no more than 10,000 total repeat iterations.</div>
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
<h2>Output filters</h2>
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

<h2>Output encoding</h2>

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
