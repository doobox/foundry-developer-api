---
layout: default
title: Layout item control group · Foundry Developer
permalink: /developer/layout-item-control-group.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">manifest.json · inspector · control groups</p>
<h1>Layout item</h1>
<p class="lede">Adds responsive flex-item and grid-item controls to the Inspector section of your choice.</p>

## Quick example

```json
{
    "section" : "Layout item",
    "systemImage" : "square.on.square",
    "controls" : [
        {
            "type" : "layoutItem"
        }
    ]
}
```

The section is yours: any name and icon work, other controls can share it, and a group left at the top level of the `inspector` joins `Settings` instead.

```css
:instance {
    {{ if control.itemEnabled }}
    flex-grow: {{ control.flexGrow }};
    flex-shrink: {{ control.flexShrink }};
    align-self: {{ control.alignSelf }};
    grid-column: span {{ control.columnSpan }};
    grid-row: span {{ control.rowSpan }};
    {{ endif }}
}
```

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `layoutItem`. The group does not accept `id`, `label`, `group`, `responsive`, `styles`, or `states`.

<h3 class="property-heading"><code>defaultOverrides</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: generated defaults</span></div>

Replaces complete base defaults using any generated ID below.

## Generated controls

<h3 class="property-heading"><code>control.itemEnabled</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="default">Default: false</span><span>Responsive</span></div>

Shows or hides the layout-item controls. Templates must check it explicitly.

<h3 class="property-heading"><code>control.flexGrow</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 0</span><span>Responsive</span></div>

An integer from 0 through 10. In a flex parent, positive values share remaining space.

<h3 class="property-heading"><code>control.flexShrink</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 1</span><span>Responsive</span></div>

An integer from 0 through 10. In a flex parent, zero prevents shrinking.

<h3 class="property-heading"><code>control.alignSelf</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: auto</span><span>Responsive</span></div>

One of `auto`, `stretch`, `flex-start`, `center`, `flex-end`, or `baseline`.

<h3 class="property-heading"><code>control.columnSpan</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 1</span><span>Responsive</span></div>

An integer from 1 through 12 for grid parents. Keep it within the parent's column count at the current breakpoint.

<h3 class="property-heading"><code>control.rowSpan</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 1</span><span>Responsive</span></div>

An integer from 1 through 12 for grid parents.

## Template behavior

The group generates no CSS or HTML, and the values affect nothing unless the part is a direct child of a compatible flex or grid layout. When disabled, omit or reset properties that might otherwise persist from an earlier responsive breakpoint.
{% endraw %}
