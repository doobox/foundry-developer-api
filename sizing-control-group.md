---
layout: default
title: Sizing control group · Foundry Developer
permalink: /sizing-control-group.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Info.plist · controls · control groups</p>
<h1>Sizing</h1>
<p class="lede">Adds responsive width, maximum-width, minimum-height and height controls to the Sizing Inspector section.</p>

## Quick example

```xml
<dict>
    <key>type</key><string>sizing</string>
</dict>
```

```css
:instance {
    width: {{ if control.widthMode == "full" }}100%{{ elseif control.widthMode == "auto" }}auto{{ else }}{{ control.customWidth }}px{{ endif }};
    max-width: {{ if control.maxWidth == 0 }}none{{ else }}min(100%, {{ control.maxWidth }}px){{ endif }};
    min-height: {{ control.minimumHeight }}px;
    height: {{ if control.heightMode == "viewport" }}100vh{{ elseif control.heightMode == "custom" }}{{ control.customHeight }}px{{ else }}auto{{ endif }};
}
```

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `sizing`. The group does not accept `id`, `label`, `group`, `responsive`, `styles`, or `states`.

<h3 class="property-heading"><code>defaultOverrides</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: generated defaults</span></div>

Replaces complete base defaults using the generated IDs below.

## Generated controls

<h3 class="property-heading"><code>control.widthMode</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: full</span><span>Responsive</span></div>

One of `full`, `auto`, or `custom`, displayed as Fill parent, Fit content, and Custom.

<h3 class="property-heading"><code>control.customWidth</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 320</span><span>Responsive</span></div>

A pixel width from 0 through 10,000. Shown when `widthMode` is `custom`.

<h3 class="property-heading"><code>control.maxWidth</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 0</span><span>Responsive</span></div>

A pixel maximum from 0 through 10,000. Zero means no width limit. Templates should ensure the result never exceeds the available parent width.

<h3 class="property-heading"><code>control.minimumHeight</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 0</span><span>Responsive</span></div>

A pixel minimum height from 0 through 10,000.

<h3 class="property-heading"><code>control.heightMode</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: auto</span><span>Responsive</span></div>

One of `auto`, `viewport`, or `custom`, displayed as Fit content, Fill viewport, and Custom.

<h3 class="property-heading"><code>control.customHeight</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 400</span><span>Responsive</span></div>

A pixel height from 0 through 10,000. Shown when `heightMode` is `custom`.

## Template behavior

The group generates no CSS or HTML. Numeric values do not include units; append `px` when producing CSS. The mode values are semantic choices whose CSS mapping belongs to the part template.
{% endraw %}
