---
layout: default
title: Identity and package values · Foundry Developer
permalink: /template-identity.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Identity and package values</h1>
<p class="lede">Reference stable component identity, package identity and declared package assets.</p>
<section class="reference-entry">
<h3>{{ id }} and {{ instance.id }}</h3>
<p>Equivalent spellings that resolve to a stable, CSS-safe developer value unique to the instance, such as <code>foundry-a12b…</code>. Foundry does not automatically place this value in the root element’s HTML <code>id</code>. Use it when your own markup, styles, or scripts need a stable generated value. Whitespace inside braces is optional, so <code>{{id}}</code> is equivalent; the spaced form is recommended for readability.</p>


<div markdown="1">

```xml
<article class="card{{ component.class }}" data-owner="{{ id }}" {{ component.attributes }}>…</article>

[data-foundry-id="{{ instance.uuid }}"] { border-radius: 12px; }
[data-foundry-id="{{ instance.uuid }}"] .title { font-weight: 700; }
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
{% endraw %}
