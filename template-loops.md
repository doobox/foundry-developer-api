---
layout: default
title: Looping content · Foundry Developer
permalink: /template-loops.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span>Template language</div>
<p class="eyebrow">Template API</p>
<h1>Looping content</h1>
<p class="lede">Repeat markup over fixed counts, controls, navigation, pages and assets.</p>
<p>Use a <code>loop</code> block to generate the same template content a fixed or user-controlled number of times. The block may contain markup, template values, conditions, editable text, editable HTML, images, and nested loop blocks.</p>


<div markdown="1">

```html
<div class="gallery{{ component.class }}" {{ component.attributes }}>
    {{ loop 8 }}
        <figure>
            {{ image("photo") }}
            <figcaption>{{ text("caption", default: "Image caption") }}</figcaption>
        </figure>
    {{ endloop }}
</div>
```

</div>


<p>A literal count must be a whole number from <code>0</code> through <code>100</code>. Each <code>loop</code> requires a matching <code>endloop</code>.</p>

<h3>Use a control for the count</h3>
<p>Reference a number or slider control when the component user should choose how many items appear. The control must declare an explicit finite <code>maximum</code> from <code>0</code> through <code>100</code>. Foundry rounds the current value down to a whole number and constrains it to the control’s supported range.</p>


<div markdown="1">

```html
<ul class="items{{ component.class }}" {{ component.attributes }}>
    {{ loop control.itemCount }}
        <li>{{ text("label", default: "Item") }}</li>
    {{ endloop }}
</ul>
```

</div>


<div markdown="1">

```xml
<dict>
    <key>id</key><string>itemCount</string>
    <key>label</key><string>Items</string>
    <key>type</key><string>number</string>
    <key>minimum</key><integer>0</integer>
    <key>maximum</key><integer>12</integer>
    <key>default</key><integer>4</integer>
    <key>responsive</key><false/>
</dict>
```

</div>


<h3>Loop values</h3>
<dl class="syntax-list">
<dt><code>{{ loop.index }}</code></dt>
<dd>The current item’s zero-based index.</dd>
<dt><code>{{ loop.position }}</code></dt>
<dd>The current item’s one-based position.</dd>
<dt><code>{{ loop.count }}</code></dt>
<dd>The number of items currently emitted by this loop block.</dd>
<dt><code>{{ loop.first }}</code></dt>
<dd><code>true</code> for the first emitted item and <code>false</code> otherwise.</dd>
<dt><code>{{ loop.last }}</code></dt>
<dd><code>true</code> for the last emitted item and <code>false</code> otherwise.</dd>
</dl>


<div markdown="1">

```html
{{ loop control.itemCount }}
    <article class="item item-{{ loop.position }}">
        {{ if loop.first }}<strong>First item</strong>{{ endif }}
        <span>{{ loop.position }} of {{ loop.count }}</span>
    </article>
{{ endloop }}
```

</div>


<h3>Nested loops</h3>
<p>Loop blocks may be nested. Inside a nested block, prefix any outer-block value with <code>loop.parent.</code>: <code>loop.parent.index</code>, <code>loop.parent.position</code>, <code>loop.parent.count</code>, <code>loop.parent.first</code>, or <code>loop.parent.last</code>.</p>


<div markdown="1">

```html
{{ loop 3 }}
    <div class="row-{{ loop.position }}">
        {{ loop 4 }}
            <span>{{ loop.parent.position }}.{{ loop.position }}</span>
        {{ endloop }}
    </div>
{{ endloop }}
```

</div>


<div class="note">
<strong>Editable values remain stable.</strong> The quoted name in each editable macro identifies its persistent value, while the loop path identifies the repeated occurrence. Reducing and later increasing the count therefore restores the content previously entered for those positions.</div>
<div class="callout warning">
<strong>Keep nested output reasonable.</strong> To prevent accidental runaway templates, one rendered template may expand no more than 10,000 total loop iterations.</div>

<h3>Loop over a collection</h3>
<p>Use <code>as</code> to give each collection item a local name. Collection loops work with navigation, page and published-asset collections. A collection is limited to 100 emitted items.</p>

<div markdown="1">

```html
{{ loop navigation.items as item }}
    <a href="{{ item.href }}">{{ item.title }}</a>
{{ endloop }}
```

</div>

<p>Add a <code>where</code> expression to filter items before Foundry calculates <code>loop.index</code>, <code>loop.position</code>, <code>loop.count</code>, <code>loop.first</code> and <code>loop.last</code>.</p>

<div markdown="1">

```html
{{ loop assets.published as asset where asset.isImage }}
    <img src="{{ asset.href }}" alt="">
{{ endloop }}
```

</div>

<h3>Reverse a loop</h3>
<p>Add <code>reversed</code> at the end of any loop directive to emit its final sequence in reverse order. It works with literal counts, numeric controls and every collection source. Foundry applies <code>where</code> first and then reverses the filtered result.</p>

<div markdown="1">

```html
{{ loop assets.images as image where image.width >= 1200 reversed }}
    <img src="{{ image.href }}" alt="">
{{ endloop }}
```

</div>

<p>For a reversed loop, <code>loop.index</code> and <code>loop.position</code> identify the item’s position before reversal, while <code>loop.first</code> and <code>loop.last</code> identify the first and last items actually emitted. This means <code>{{ loop 4 reversed }}{{ loop.position }}{{ endloop }}</code> produces <code>4321</code>.</p>

<h3>Navigation collections</h3>
<dl class="syntax-list">
<dt><code>navigation.items</code></dt><dd>Top-level pages included in navigation, in page-tree order.</dd>
<dt><code>navigation.current.children</code></dt><dd>Visible children of the current page.</dd>
<dt><code>navigation.current.siblings</code></dt><dd>Visible pages with the same parent as the current page.</dd>
<dt><code>navigation.ancestors</code></dt><dd>The current page’s ancestors, from the root downward.</dd>
<dt><code>navigation.breadcrumbs</code></dt><dd>The ancestors followed by the current page.</dd>
<dt><code>navigation.previous</code></dt><dd>The previous visible page, when present.</dd>
<dt><code>navigation.next</code></dt><dd>The next visible page, when present.</dd>
</dl>

<p>A navigation item provides <code>id</code>, <code>title</code>, <code>href</code>, <code>slug</code>, <code>depth</code>, <code>current</code>, <code>ancestor</code>, <code>home</code>, <code>hasChildren</code> and <code>children</code>. Users control membership with the page Inspector’s <strong>Include in Navigation</strong> setting. If a page is excluded, its visible descendants are promoted one level.</p>

<h3>Page and asset collections</h3>
<dl class="syntax-list">
<dt><code>pages.all</code></dt><dd>All site pages.</dd>
<dt><code>pages.current</code></dt><dd>The page currently being rendered.</dd>
<dt><code>pages.home</code></dt><dd>The site’s home page.</dd>
<dt><code>assets.published</code></dt><dd>All assets placed in the published page tree.</dd>
<dt><code>assets.images</code></dt><dd>Published assets with an image media type.</dd>
<dt><code>assets.documents</code></dt><dd>Published non-image assets.</dd>
</dl>

<p>An asset item provides <code>id</code>, <code>filename</code>, <code>href</code>, <code>mediaType</code>, <code>width</code>, <code>height</code> and <code>isImage</code>.</p>
{% endraw %}
