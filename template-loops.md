---
layout: default
title: Looping content · Foundry Developer
permalink: /template-loops.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Template API</p>
<h1>Looping content</h1>
<p class="lede">Repeat markup over fixed counts, controls, navigation, pages and assets.</p>
<p>Use a <code>loop</code> block to generate the same template content a fixed or user-controlled number of times. The block may contain markup, template values, conditions, editable text, editable HTML, images, and nested loop blocks.</p>


<div markdown="1">

```html
<div class="gallery {{ part.class }}" {{ part.attributes }}>
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
<p>Reference a number or slider control when the part user should choose how many items appear. The control must declare an explicit finite <code>maximum</code> from <code>0</code> through <code>100</code>. Foundry rounds the current value down to a whole number and constrains it to the control’s supported range.</p>


<div markdown="1">

```html
<ul class="items {{ part.class }}" {{ part.attributes }}>
    {{ loop control.itemCount }}
        <li>{{ text("label", default: "Item") }}</li>
    {{ endloop }}
</ul>
```

</div>


<div markdown="1">

```json
{
    "id" : "itemCount",
    "label" : "Items",
    "type" : "number",
    "minimum" : 0,
    "maximum" : 12,
    "defaults" : {
        "base" : 4
    },
    "responsive" : false
}
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
    <img src="{{ asset("href") }}" alt="">
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

<p>All ordinary loop metadata describes emitted order. Therefore <code>{{ loop 4 reversed }}{{ loop.position }}{{ endloop }}</code> produces <code>1234</code>, and <code>loop.first</code> and <code>loop.last</code> identify the first and last items actually emitted. Use zero-based <code>loop.sourceIndex</code> or one-based <code>loop.sourcePosition</code> when a reversed or filtered loop needs the item’s position in its original source.</p>

<h3>Navigation collections</h3>
<dl class="syntax-list">
<dt><code>navigation.items</code></dt><dd>Top-level pages and navigation folders, in Pages-panel order.</dd>
<dt><code>navigation.folders</code></dt><dd>Every non-empty page folder as a group item, whether or not it joins the site navigation — address one by <code>id</code> or <code>slug</code> with a <code>where</code> expression to build folder-scoped menus. Pair with the <a href="page-folder-control.html">page folder control</a> so users pick the folder in the Inspector.</dd>
<dt><code>navigation.current.children</code></dt><dd>Visible children of the current page.</dd>
<dt><code>navigation.current.siblings</code></dt><dd>Visible pages with the same parent as the current page.</dd>
<dt><code>navigation.ancestors</code></dt><dd>The current page’s ancestors, from the root downward.</dd>
<dt><code>navigation.breadcrumbs</code></dt><dd>The ancestors followed by the current page.</dd>
<dt><code>navigation.previous</code></dt><dd>The previous visible page, when present.</dd>
<dt><code>navigation.next</code></dt><dd>The next visible page, when present.</dd>
</dl>

<p>A navigation item provides <code>id</code>, <code>title</code>, <code>href</code>, <code>slug</code>, <code>depth</code>, <code>current</code>, <code>ancestor</code>, <code>home</code>, <code>hasChildren</code> and <code>children</code>. Users control membership with the page Inspector’s <strong>Include in Navigation</strong> setting. If a page is excluded, its visible descendants are promoted one level.</p>

<p>Page folders join menus by default, so navigation mirrors the Pages panel. A folder emits a group item carrying the same fields plus <code>folder</code> as <code>true</code>: its <code>href</code> is empty, <code>current</code> is always <code>false</code>, <code>ancestor</code> reports whether the current page lives inside it, and <code>children</code> holds its contents. Render group items as labels, not links. A folder opted out through its Inspector’s <strong>Include in Navigation</strong> setting promotes its contents in place, and empty groups are omitted.</p>

<h3>Worked examples</h3>

<p>A Pages panel using both hierarchies — Services is a page with nested pages, Company is a folder:</p>

<div markdown="1">

```text
Pages panel                        navigation.items
───────────────────────────       ─────────────────────────────────────────────
Home                               Home            href "/"                home
Services                           Services        href "/services/"       hasChildren
├─ Consulting                      ├─ Consulting   href "/services/consulting/"
└─ Training                        └─ Training     href "/services/training/"
Company            (folder)        Company         href ""     folder     hasChildren
├─ About                           ├─ About        href "/company/about/"
└─ Team                            └─ Team         href "/company/team/"
Contact                            Contact         href "/contact/"
```

</div>

<p>Services is a destination — its item links to the overview page and carries its nested pages as <code>children</code>. Company is a group — <code>folder</code> is <code>true</code>, its <code>href</code> is empty, and its pages sit in <code>children</code> with URLs shaped by the folder’s slug.</p>

<p>The same panel after two opt-outs — the Company folder’s <strong>Include in Navigation</strong> is off, and the Training page’s is off:</p>

<div markdown="1">

```text
Pages panel                        navigation.items
───────────────────────────       ─────────────────────────────────────────────
Home                               Home            href "/"                home
Services                           Services        href "/services/"       hasChildren
├─ Consulting                      └─ Consulting   href "/services/consulting/"
└─ Training        (excluded)      About           href "/company/about/"
Company    (folder, excluded)      Team            href "/company/team/"
├─ About                           Contact         href "/contact/"
└─ Team
Contact
```

</div>

<p>Opting out changes menu placement, never URLs: About and Team promote to the top level at the folder’s position while keeping their <code>/company/…</code> paths, and Training simply disappears from menus while remaining published at <code>/services/training/</code>.</p>

<h3>Build a menu from the tree</h3>

<p>Nested loops turn the tree into a menu-ready list. Pages link; folders render as labels; either kind carries its <code>children</code>:</p>

<div markdown="1">

```html
<ul class="menu">
    {{ loop navigation.items as item }}
    <li>
        {{ if item.folder }}
        <span>{{ item.title }}</span>
        {{ else }}
        <a href="{{ item.href }}"{{ if item.current }} aria-current="page"{{ endif }}>{{ item.title }}</a>
        {{ endif }}
        {{ if item.hasChildren }}
        <ul>
            {{ loop item.children as child }}
            <li><a href="{{ child.href }}"{{ if child.current }} aria-current="page"{{ endif }}>{{ child.title }}</a></li>
            {{ endloop }}
        </ul>
        {{ endif }}
    </li>
    {{ endloop }}
</ul>
```

</div>

<p>Rendering the first example’s site from its Home page emits:</p>

<div markdown="1">

```html
<ul class="menu">
    <li><a href="/" aria-current="page">Home</a></li>
    <li>
        <a href="/services/">Services</a>
        <ul>
            <li><a href="/services/consulting/">Consulting</a></li>
            <li><a href="/services/training/">Training</a></li>
        </ul>
    </li>
    <li>
        <span>Company</span>
        <ul>
            <li><a href="/company/about/">About</a></li>
            <li><a href="/company/team/">Team</a></li>
        </ul>
    </li>
    <li><a href="/contact/">Contact</a></li>
</ul>
```

</div>

<p>Templates do not recurse, so each menu level is an explicit loop; add a third level by nesting another <code>{{ loop child.children as sub }}</code> the same way. From here it is styling and, if you want dropdown or disclosure behaviour, an instance script — the built-in Navigation part is a complete worked example of both.</p>

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
