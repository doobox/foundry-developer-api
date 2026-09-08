---
layout: default
title: Padding control · Foundry Developer
permalink: "/padding-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Padding</h1>
<p class="lede">A four-sided spacing editor that offers the active theme’s spacing scale and a local custom value for every edge.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Padding. Always use `padding`.

```xml
<key>type</key>
<string>padding</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>padding</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the control in the Inspector, including when `count` is present.

```xml
<key>label</key>
<string>Padding</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section that contains this control. Omit the key to place it in Settings.

```xml
<key>group</key>
<string>Appearance</string>
```

<h3 class="property-heading"><code>toolTip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains what the control changes.

```xml
<key>toolTip</key>
<string>Choose a value.</string>
```

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control.

```xml
<key>subtitle</key>
<string>Additional guidance</string>
```

<h3 class="property-heading"><code>enable</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the stated condition.

```xml
<key>enable</key>
<dict>
    <key>id</key>
    <string>showControl</string>
    <key>value</key>
    <true/>
</dict>
```

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="required">Required</span></div>

Exactly four strings in top, right, bottom, left order. Each value must be `none`, `custom`, or a portable theme spacing ID: `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, or `3xl`.

```xml
<key>default</key>
<array>
    <string>lg</string>
    <string>none</string>
    <string>lg</string>
    <string>none</string>
</array>
```

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow a different value at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Padding options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown. `count` and `units` do not apply because Padding always edits all four sides.

<h3 class="property-heading"><code>customValue</code></h3>
<div class="property-meta"><span class="property-type">Number array</span><span class="optional">Optional</span><span class="default">Default: \[0, 0, 0, 0\]</span></div>

Exactly four non-negative initial pixel values in top, right, bottom, left order, used when the matching side is set to Custom.

```xml
<key>customValue</key>
<array>
    <real>16</real>
    <real>16</real>
    <real>16</real>
    <real>16</real>
</array>
```

<h3 class="property-heading"><code>minimum</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="optional">Optional</span><span class="default">Default: 0</span></div>

Lower bound for custom pixel values; cannot be negative.

```xml
<key>minimum</key>
<real>0</real>
```

<h3 class="property-heading"><code>maximum</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="optional">Optional</span><span class="default">Default: 640</span></div>

Upper bound for custom pixel values.

```xml
<key>maximum</key>
<real>100</real>
```

<h3 class="property-heading"><code>step</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="optional">Optional</span><span class="default">Default: 1</span></div>

Increment for custom pixel values.

```xml
<key>step</key>
<real>1</real>
```

> **Important:** Foundry stores all four sources and custom values atomically under this property ID. It does not create hidden companion properties.

## Return value

`{{ control.padding }}` resolves as **CSS padding shorthand String**. Stored internally, its value is **One structured spacing value**.

```css
padding: {{ control.padding }};
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>padding</string>
        <key>label</key><string>Padding</string>
        <key>group</key><string>Content</string>
        <key>type</key><string>padding</string>
        <key>customValue</key>
        <array><real>64</real><real>0</real><real>64</real><real>0</real></array>
        <key>minimum</key><real>0</real>
        <key>maximum</key><real>320</real>
        <key>step</key><real>4</real>
        <key>default</key><array>
            <string>lg</string>
            <string>none</string>
            <string>lg</string>
            <string>none</string>
        </array>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```css
padding: {{ control.padding }};
```

{% endraw %}
