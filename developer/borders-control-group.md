---
layout: default
title: Borders control group · Foundry Developer
permalink: /developer/borders-control-group.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">manifest.json · inspector · control groups</p>
<h1>Borders</h1>
<p class="lede">Adds a responsive enable switch, framework border, colour and radius to the Inspector section of your choice.</p>

## Quick example

```json
{
    "section" : "Borders",
    "systemImage" : "square.dashed",
    "controls" : [
        {
            "type" : "borders"
        }
    ]
}
```

The section is yours: any name and icon work, other controls can share it, and a group left at the top level of the `inspector` joins `Settings` instead.

```css
:instance {
    border-width: {{ if control.borderEnabled }}{{ control.frameworkBorder.width }}{{ else }}0{{ endif }};
    border-style: {{ control.frameworkBorder.style }};
    border-color: {{ control.frameworkBorderColour }};
    border-radius: {{ if control.borderEnabled }}{{ control.frameworkRadius }}{{ else }}0{{ endif }};
}
```

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `borders`. The group does not accept `id`, `label`, `group`, `responsive`, `styles`, or `states`.

<h3 class="property-heading"><code>defaultOverrides</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: generated defaults</span></div>

Replaces complete base defaults using `borderEnabled`, `frameworkBorder`, `frameworkBorderColour`, or `frameworkRadius`.

## Generated controls

<h3 class="property-heading"><code>control.borderEnabled</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="default">Default: false</span><span>Responsive</span></div>

Shows or hides the other controls. Templates must check it explicitly.

<h3 class="property-heading"><code>control.frameworkBorder</code></h3>
<div class="property-meta"><span class="property-type">Framework border</span><span class="default">Default: none, solid</span><span>Responsive</span></div>

Four border widths plus a visible style picker. Read `width`, individual edges, numeric and unit fields, and `style` as documented by [Framework border](framework-border-control.html).

<h3 class="property-heading"><code>control.frameworkBorderColour</code></h3>
<div class="property-meta"><span class="property-type">Framework colour</span><span class="default">Default: muted palette</span><span>Responsive</span></div>

A framework or custom colour with opacity. Its structured fields match the [Framework colour control](framework-colour-control.html).

<h3 class="property-heading"><code>control.frameworkRadius</code></h3>
<div class="property-meta"><span class="property-type">Framework radius</span><span class="default">Default: none</span><span>Responsive</span></div>

Four framework-aware corner radii with the same output as the [Framework radius control](framework-radius-control.html).

## Template behavior

The group generates no CSS or HTML. Emit explicit zero widths and radii while disabled so a later breakpoint can reset an earlier enabled value. Border style and colour may remain declared because a zero width prevents them from drawing.
{% endraw %}
