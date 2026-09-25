---
layout: default
title: Effects control group · Foundry Developer
permalink: /developer/effects-control-group.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">manifest.json · inspector · control groups</p>
<h1>Effects</h1>
<p class="lede">Adds a responsive enable switch, framework shadow and opacity to the Inspector section of your choice.</p>

## Quick example

```json
{
    "section" : "Effects",
    "systemImage" : "sparkles",
    "controls" : [
        {
            "type" : "effects"
        }
    ]
}
```

The section is yours: any name and icon work, other controls can share it, and a group left at the top level of the `inspector` joins `Settings` instead.

```css
:instance {
    box-shadow: {{ if control.effectsEnabled }}{{ control.frameworkShadow }}{{ else }}none{{ endif }};
    opacity: {{ if control.effectsEnabled }}calc({{ control.opacity }} / 100){{ else }}1{{ endif }};
}
```

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `effects`. The group does not accept `id`, `label`, `group`, `responsive`, `styles`, or `states`.

<h3 class="property-heading"><code>defaultOverrides</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: generated defaults</span></div>

Replaces complete base defaults using `effectsEnabled`, `frameworkShadow`, or `opacity`.

## Generated controls

<h3 class="property-heading"><code>control.effectsEnabled</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="default">Default: false</span><span>Responsive</span></div>

Shows or hides Shadow and Opacity. Templates must check the value explicitly.

<h3 class="property-heading"><code>control.frameworkShadow</code></h3>
<div class="property-meta"><span class="property-type">Framework shadow</span><span class="default">Default: none</span><span>Responsive</span></div>

A framework shadow with the structured output documented by the [Framework shadow control](framework-shadow-control.html).

<h3 class="property-heading"><code>control.opacity</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 100</span><span>Responsive</span></div>

An integer percentage from 0 through 100. The template value is the number, not a CSS fraction or percentage string.

## Template behavior

The group generates no CSS or HTML. Divide `opacity` by 100 for the CSS `opacity` property, and output `none` and `1` while the group is disabled to reset responsive values.
{% endraw %}
