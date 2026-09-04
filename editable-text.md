---
layout: default
title: Editable content · Foundry Developer
permalink: "/editable-text.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Canvas editing</p>
<h1>Editable content primitives</h1>
<p class="lede">Put editable text, trusted HTML or an image directly into developer-owned markup without declaring a visible <code>customItems</code> control.</p>
<h2>Editable rich text</h2>

<div markdown="1">

```xml
<h2>{{ text="A useful heading" }}</h2>
<p>{{ text }}</p>
```

</div>

<p><code>{{ text }}</code> uses Foundry’s placeholder paragraph; the assignment form supplies your own default. Double-clicking any text primitive on the canvas opens the same rich-text editor, whether the text is a short label, a heading or a longer passage. Authors can format selected text with bold, italic, underline, strikethrough, size, colour and structured links.</p>
<p>The link popover supports the same destinations as a Link control: URLs, pages, resources, anchors, new-window behaviour and custom attributes. Page and resource links remain connected to their Foundry items if the site is reorganised.</p>
<p>Unformatted values remain plain text and are HTML-escaped. When formatting is used, Foundry stores the value in a versioned internal form and emits only the supported inline markup. Component developers do not need to change their template.</p>
<h2>Trusted HTML</h2>

<div markdown="1">

```xml
<div class="rich-content">
    {{ html="<ul><li>First item</li></ul>" }}
</div>
```

</div>

<p><code>{{ html }}</code> creates a source editor for HTML, CSS and JavaScript. HTML is inserted unescaped at the primitive’s position. Its CSS is emitted with that component instance’s page CSS and its JavaScript with that instance’s page script. Foundry supplies a small list when no default is declared.</p>
<div class="callout warning">
<strong>HTML is trusted source.</strong> This primitive is intended for authors who are allowed to add executable website code. Do not use it for arbitrary visitor input.</div>
<h2>Image</h2>

<div markdown="1">

```xml
<figure {{ component.attributes }}>
    {{ image }}
</figure>
```

</div>

<p><code>{{ image }}</code> creates an implicit <code>source</code> asset property and a drop zone in the canvas. Once an image is selected, Foundry emits an <code>img.foundry-image</code> element. Add captions, aspect-ratio wrappers and production styling in your own template and CSS.</p>
<h2>Stable declaration order</h2>
<p>Repeated text primitives become hidden properties named <code>content1</code>, <code>content2</code>, and so on. Repeated HTML primitives become <code>html1</code>, <code>html2</code>, and so on. Their order is part of saved component data, so append new primitives where possible rather than reordering shipped ones.</p>

<div markdown="1">

```xml
<article {{ component.attributes }}>
    <h2>{{ text="Title" }}</h2>
    <div>{{ html }}</div>
    <small>{{ text="Footnote" }}</small>
</article>
```

</div>


<div class="callout warning">
<strong>Use custom controls for named values.</strong> If content needs a meaningful template ID, responsive variants, reuse in another template file, or specialised inspector UI, declare it under <code>customItems</code>.</div>
{% endraw %}
