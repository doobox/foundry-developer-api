---
layout: default
title: Spacing control group · Foundry Developer
permalink: /spacing-control-group.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">manifest.json · controls · control groups</p>
<h1>Spacing</h1>
<p class="lede">Adds a responsive enable switch, framework padding and framework margin to the Spacing Inspector section.</p>

## Quick example

```json
{
    "type" : "spacing"
}
```

Use the values in the part's CSS template:

```css
:instance {
    padding: {{ if control.spacingEnabled }}{{ control.frameworkPadding }}{{ else }}0{{ endif }};
    margin: {{ if control.spacingEnabled }}{{ control.frameworkMargin }}{{ else }}0{{ endif }};
}
```

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `spacing`. The group does not accept `id`, `label`, `group`, `responsive`, `styles`, or `states`.

<h3 class="property-heading"><code>defaultOverrides</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: generated defaults</span></div>

Replaces the complete base default of a generated control. Accepted keys are `spacingEnabled`, `frameworkPadding`, and `frameworkMargin`; values must use the corresponding return-value format below.

## Generated controls

<h3 class="property-heading"><code>control.spacingEnabled</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="default">Default: true</span><span>Responsive</span></div>

Shows or hides the remaining controls in the Inspector. Templates must check it explicitly; disabling spacing does not change the padding or margin values.

<h3 class="property-heading"><code>control.frameworkPadding</code></h3>
<div class="property-meta"><span class="property-type">Framework padding</span><span class="default">Default: none</span><span>Responsive</span></div>

Four-edge framework-aware padding. It has the same structured output as the [Framework padding control](framework-padding-control.html), including edge, numeric and unit fields.

<h3 class="property-heading"><code>control.frameworkMargin</code></h3>
<div class="property-meta"><span class="property-type">Framework margin</span><span class="default">Default: none</span><span>Responsive</span></div>

Four-edge framework-aware margin. It has the same structured output as the [Framework margin control](framework-margin-control.html), including edge, numeric and unit fields.

## Template behavior

The group generates no CSS or HTML. Apply its values to the intended element and emit explicit zero values when `spacingEnabled` is false so a disabled responsive breakpoint resets earlier spacing.
{% endraw %}
