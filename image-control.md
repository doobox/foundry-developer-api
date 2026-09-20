---
layout: default
title: Image control · Foundry Developer
permalink: "/image-control.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Info.plist · controls</p>
<h1>Image</h1>
<p class="lede">Let someone choose, import, replace or clear a project image using the standard media well.</p>

## Quick example

```xml
<dict>
    <key>type</key><string>image</string>
    <key>id</key><string>hero</string>
    <key>label</key><string>Image</string>
    <key>group</key><string>Media</string>
</dict>
```

```html
<img src="{{ control.hero }}" alt="{{ control.hero.alt }}">
```

<p>The direct value is the selected image path, and it is empty until an image is chosen. The Inspector shows a preview well with Pick and Clear buttons, accepts an image dropped from Finder or Resources, and always includes an Alt text field. Imported files are added to Resources. Other media types are rejected.</p>

<p>When the primary template binds an <code>img</code> element's <code>src</code> to the control — as <code>{{ control.hero }}</code>, <code>{{ control.hero.href }}</code> or a declared rendition — Foundry recognises the element. In the editing canvas it becomes a drop target and shows a placeholder while no image is selected. In preview and published output an <code>img</code> whose control has no image is removed. An <code>img src</code> control binding must reference an image control; the pack fails validation otherwise.</p>

## Properties

<section class="key-reference"><h3><code>type</code></h3><div class="key-meta"><span>String</span><strong>Required</strong><span><code>image</code></span></div><p>This control does not support <code>count</code>: an image control represents one named image. Declare each image property explicitly.</p></section>
<section class="key-reference"><h3><code>id</code></h3><div class="key-meta"><span>String</span><strong>Required</strong></div><p>The unique control and template value name.</p></section>
<section class="key-reference"><h3><code>label</code></h3><div class="key-meta"><span>String</span><span>Optional</span></div></section>
<section class="key-reference"><h3><code>group</code></h3><div class="key-meta"><span>String</span><span>Optional</span><span>Default: Settings</span></div></section>
<section class="key-reference"><h3><code>defaults</code></h3><div class="key-meta"><span>Dictionary</span><span>Optional</span></div><p>Omit <code>defaults</code> to start empty. A non-empty <code>base</code> is a package-relative path and must reference a declared package asset, which is used until someone chooses their own image. Image asset defaults support <code>base</code> only; breakpoints apply to responsive selections, not defaults.</p></section>
<section class="key-reference"><h3><code>alt</code></h3><div class="key-meta"><span>String</span><span>Optional</span><span>Default: empty</span></div><p>The initial alternative text. Site authors edit the final text in the Inspector's Alt field. Only image controls accept <code>alt</code>.</p></section>
<section class="key-reference"><h3><code>focalPoint</code></h3><div class="key-meta"><span>Boolean</span><span>Optional</span><span>Default: false</span></div><p>Adds a draggable focal-point marker over the Inspector preview and provides the <code>position</code>, <code>focalPointX</code> and <code>focalPointY</code> template values. Declaring <code>focalPoint</code> makes the control responsive so the focal point can differ at each breakpoint. Only image controls accept <code>focalPoint</code>.</p></section>
<section class="key-reference"><h3><code>renditions</code></h3><div class="key-meta"><span>Array of Dictionaries</span><span>Optional</span></div><p>Declares named scaled variants for templates that want smaller sources. Each dictionary requires a String <code>id</code> — starting with a letter, containing letters, digits, hyphens or underscores, and unique within the control — and an Integer <code>maximumDimension</code> greater than zero. Values above 3,840 are clamped to 3,840, Foundry's maximum stored image dimension. Only image controls accept <code>renditions</code>.</p></section>
<section class="key-reference"><h3><code>responsive</code></h3><div class="key-meta"><span>Boolean</span><span>Optional</span><span>Default: false</span></div><p>A responsive image control lets each breakpoint override the selected image and its focal point. Always <code>true</code> when <code>focalPoint</code> is declared.</p></section>
<section class="key-reference"><h3><code>tooltip</code></h3><div class="key-meta"><span>String</span><span>Optional</span></div></section>
<section class="key-reference"><h3><code>visibleWhen</code></h3><div class="key-meta"><span>Dictionary</span><span>Optional</span></div><p>Conditionally shows the complete image row. A hidden row retains its selected value.</p></section>

## Template values

<p><code>control.hero</code> is the image path. Use the structured values when the part needs alternative text, focal-point styling or file metadata:</p>

```text
control.hero.href
control.hero.alt
control.hero.position
control.hero.focalPointX
control.hero.focalPointY
control.hero.rendition.myRendition
control.hero.filename
control.hero.extension
control.hero.mimeType
control.hero.byteCount
control.hero.width
control.hero.height
control.hero.aspectRatio
```

<p><code>control.hero.href</code> returns the same path as the direct value: the exported image path in preview and published output, and both are empty when no image is selected. <code>control.hero.position</code> returns the focal point as a CSS position such as <code>50% 50%</code>, ready for <code>object-position</code> or <code>background-position</code>; <code>focalPointX</code> and <code>focalPointY</code> are the same coordinates as numbers from 0 to 100. <code>control.hero.rendition.myRendition</code> returns the path of that declared rendition — a copy whose longest side does not exceed the rendition's <code>maximumDimension</code>, or the original image when it is already small enough. The editing canvas always uses the full-size image.</p>

<p><code>width</code> and <code>height</code> are the stored pixel dimensions. Dimensions, aspect ratio and file metadata are empty when that metadata is unavailable. Imported images are stored with a longest side of at most 3,840 pixels.</p>
{% endraw %}
