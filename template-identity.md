---
layout: default
title: Part roots and CSS · Foundry Developer
permalink: /template-identity.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Template API</p>
<h1>Part roots and CSS</h1>
<p class="lede">Configure the required root hooks, choose the correct CSS scope, and use identity values only when a selector helper is not enough.</p>
<section class="api-contract">
<h2>Required root setup</h2>
<p>The root element in every primary <code>part.html</code> must include both part hooks:</p>

<div markdown="1">

```html
<section class="my-part {{ part.class }}" {{ part.attributes }}>
    …
</section>
```

</div>

<p>Keep a literal space between your class name and <code>{{ part.class }}</code>. Place <code>{{ part.attributes }}</code> directly on the same root element. Do not give the root an <code>id</code>; Foundry reserves it for the site author’s optional anchor.</p>
</section>
<section class="reference-entry">
<h3><code>:host</code></h3>
<p>Targets every placed instance belonging to this part package. Use it only for package-wide styles that are identical for every instance. It also matches instances inside linked and overridden global parts.</p>

<div markdown="1">

```css
:host {
    display: grid;
    gap: 1rem;
}
```

</div>

<p>Use a developer-owned root class instead when the class communicates a useful role in the part’s markup:</p>

<div markdown="1">

```html
<section class="bento-grid {{ part.class }}" {{ part.attributes }}>
    …
</section>
```

```css
.bento-grid {
    display: grid;
}
```

</div>
</section>
<section class="reference-entry">
<h3><code>:instance</code></h3>
<p>Targets only the particular placed part whose instance CSS or editor CSS Foundry is currently rendering. Use it for rules containing control values or any styling that may differ between instances.</p>

<div markdown="1">

```css
:instance {
    max-width: {{ control.maxWidth }}px;
}

:instance .media {
    opacity: {{ control.imageOpacity }};
}
```

</div>

<p>Each placement of a global part has its own instance identity. Therefore <code>:instance</code> targets the exact part inside that placement, while <code>:host</code> still targets every instance of its package.</p>
</section>
<section class="reference-entry">
<h3><code>{{ part.class }}</code></h3>
<p>Required inside the root element’s <code>class</code> attribute. It emits Foundry’s generated instance and package classes together with valid classes entered by the site author. It does not emit surrounding whitespace, so add normal literal whitespace between it and an adjacent class name.</p>
</section>
<section class="reference-entry">
<h3><code>{{ part.attributes }}</code></h3>
<p>Required on the part root. It emits Foundry’s stable <code>data-foundry-id</code>, package and relationship attributes, the site author’s optional anchor and custom attributes, and canvas-only editing metadata.</p>
</section>
<section class="reference-entry">
<h3><code>{{ instance.id }}</code></h3>
<p>The raw stable identifier of this placed part. Treat its format as opaque. Use <code>:instance</code> for ordinary instance CSS; use <code>{{ instance.id }}</code> only when markup, script, or a generated name genuinely needs the identifier value.</p>

<div markdown="1">

```css
[data-foundry-id="{{ instance.id }}"] { border-radius: 12px; }
[data-foundry-id="{{ instance.id }}"] .title { font-weight: 700; }
```

</div>


</section>
<section class="reference-entry">
<h3><code>{{ package.id }}</code></h3>
<p>The escaped reverse-domain package identifier. It is available in all scopes. Use it when markup, page-scoped CSS, site-scoped CSS, or scripts need the literal package identity. Prefer <code>:host</code> when instance CSS needs a package-wide selector.</p>


<div markdown="1">

```text
[data-foundry-package="{{ package.id }}"] { … }
```

</div>


</section>
<section class="reference-entry">
<h3><code>{{ asset("&lt;path&gt;") }}</code></h3>
<p>An escaped URL for a safe relative path declared by an asset dictionary’s required <code>path</code> value. Foundry resolves it to the current page’s <code>files/</code> directory or the site’s global <code>assets/</code> directory according to the dictionary’s optional <code>scope</code> value. An omitted scope means <code>page</code>.</p>


<div markdown="1">

```html
<img src="{{ asset("images/icon.svg") }}" alt="">
```

</div>


</section>
{% endraw %}
