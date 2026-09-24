---
layout: default
title: Math control · Foundry Developer
permalink: "/math-control.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">manifest.json · inspector</p>
<h1>Math</h1>
<p class="lede">A virtual numeric result calculated from constants or other controls.</p>


## Quick example

Add this dictionary to your part's `inspector` array:

```json
{
    "type" : "math",
    "id" : "doubleWidth",
    "argument1" : 24.0,
    "argument2" : 2.0,
    "operation" : "*"
}
```

Use it in the part's CSS template:

```css
:instance {
    width: {{ control.doubleWidth }}px;
}
```


## Basic properties

Each item in the `inspector` array defines one Inspector item. These keys set its name, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Math. Always use `math`.

```json
"type" : "math"
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```json
"id" : "doubleWidth"
```

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control.

```json
"subtitle" : "Additional guidance"
```

<h3 class="property-heading"><code>visibleWhen</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the stated condition.

```json
"visibleWhen" : {
    "id" : "showControl",
    "value" : true
}
```

## Math options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<h3 class="property-heading"><code>valueAvailability</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: always</span></div>

Controls when this control's value is available to templates. `always` preserves the value when the control is hidden. `whenVisible` makes `control.<id>` and its qualified derived values unavailable while `visibleWhen` is false, without discarding the stored value. `whenVisible` requires `visibleWhen`. See [Conditional visibility](visible-when.html).

<h3 class="property-heading"><code>argument1</code></h3>
<div class="property-meta"><span class="property-type">Number or String</span><span class="required">Required</span></div>

Numeric constant, numeric String, or another control ID.

```json
"argument1" : "width"
```

<h3 class="property-heading"><code>argument2</code></h3>
<div class="property-meta"><span class="property-type">Number or String</span><span class="required">Required</span></div>

Numeric constant, numeric String, or another control ID.

```json
"argument2" : 2.0
```

<h3 class="property-heading"><code>operation</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Selects addition, subtraction, multiplication, division, remainder, minimum, or maximum using `+`, `-`, `*`, `/`, `%`, `min`, or `max`. Division or remainder by zero returns `0`.

```json
"operation" : "*"
```

<h3 class="property-heading"><code>round</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: true</span></div>

Rounds the calculated result.

```json
"round" : false
```

<div class="guidance" markdown="1">
<h3>Referencing another control</h3>

An argument can be a number or the ID of another numeric property. Foundry resolves dependent math controls repeatedly, allowing one derived value to feed another.

An unresolved argument leaves the derived value unresolved.
</div>

## Return value

`{{ control.doubleWidth }}` resolves as **Locale-independent numeric String**. Stored internally, its value is **Number (Double)**.

```css
width: {{ control.doubleWidth }}px;
```

## Complete example

### manifest.json

```json
"inspector" : [
    {
        "id" : "doubleWidth",
        "type" : "math",
        "argument1" : 24.0,
        "argument2" : 2.0,
        "operation" : "*",
        "round" : false
    }
]
```

### Use it in a template

```css
width: {{ control.doubleWidth }}px;
```

{% endraw %}
