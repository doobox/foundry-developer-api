---
layout: default
title: Persistent template areas · Foundry Developer
permalink: /template-areas.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Persistent template areas</h1>
<p class="lede">Declare named editable text, HTML, images and child-content drop zones.</p>
<p>Editable content and child-content areas use the same named function-call syntax. The first quoted argument is the permanent developer-defined name. It must begin with a letter and may then contain letters, numbers, underscores and hyphens. Names must be unique across all four macro types in the component and cannot duplicate a <code>customItems</code> control <code>id</code>.</p>
<dl class="syntax-list">
<dt>
<code>{{ text("name", default: "Text") }}</code>
</dt>
<dd>Creates canvas-editable rich text. <code>default:</code> is optional; when omitted, Foundry supplies its placeholder paragraph. Plain values are HTML-escaped, while formatting created by Foundry’s rich-text editor renders as supported inline markup.</dd>
<dt>
<code>{{ html("name", default: "&lt;p&gt;HTML&lt;/p&gt;") }}</code>
</dt>
<dd>Creates an editable HTML, CSS and JavaScript source area. <code>default:</code> is optional; when omitted, Foundry supplies a small HTML list. The HTML is trusted and inserted unescaped.</dd>
<dt>
<code>{{ image("name") }}</code>
</dt>
<dd>Creates an editable image area and an image drop target on the canvas. Once populated, it renders an <code>img.foundry-image</code> element.</dd>
<dt>
<code>{{ dropZone("name") }}</code>
</dt>
<dd>Creates an ordinary child-content area at this position in the primary HTML template. Authors can drop any component there. A component may contain any number of named drop zones and does not declare them in <code>Info.plist</code>. <code>{{ dropzone("name") }}</code> is an equivalent spelling; documentation uses <code>dropZone</code>.</dd>
</dl>
<p>Names are persistent API identifiers rather than display labels. Reordering these macros keeps saved content attached to the correct area. Removing one preserves its stored content but stops rendering it; restoring the same name reconnects that content. Changing a name removes the old area and creates a new one. See <a href="editable-text.html">Editable content primitives</a> for editing and output details.</p>

<p>The optional <code>default:</code> value is a quoted string. Use JSON-style escapes inside it: <code>\&quot;</code> for a double quote, <code>\\</code> for a backslash, and <code>\n</code> for a line break.</p>

<div markdown="1">

```html
<main class="layout{{ component.class }}" {{ component.attributes }}>
    {{ dropZone("content") }}
    <aside>{{ dropZone("sidebar") }}</aside>
</main>
```

</div>

<p>If an update removes <code>sidebar</code>, Foundry preserves children assigned to it in the project but no longer renders them. Structure marks those children with <strong>Unavailable drop zone: sidebar</strong> and offers compatible destinations under <strong>Move to Child Area</strong> in their context menu. Restoring a drop zone with the same name renders those children there again. Renaming a drop zone is therefore equivalent to removing the old name and adding a new empty one.</p>

{% endraw %}
