---
layout: default
title: Number control · Foundry Developer
permalink: "/number-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Number</h1>
<p class="lede">A numeric text field with bounds, increments and an optional displayed unit.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Number. Always use `number`.

```xml
<key>type</key>
<string>number</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>spacing</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the control in the Inspector, including when `count` is present.

```xml
<key>label</key>
<string>Number</string>
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
<div class="property-meta"><span class="property-type">String or String array</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control. Use a String for one control or a String array with `count`.

Single control

```xml
<key>subtitle</key>
<string>Additional guidance</string>
```

Control array

```xml
<key>subtitle</key>
<array>
    <string>First value</string>
    <string>Second value</string>
</array>
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
<div class="property-meta"><span class="property-type">Number or Number array</span><span class="required">Required</span></div>

The numeric value initially stored for this control. It cannot be lower than an explicitly declared `minimum` or higher than an explicitly declared `maximum`. A control array needs one value for each member.

Single control

```xml
<key>default</key>
<real>24</real>
```

Control array

```xml
<key>default</key>
<array>
    <real>24</real>
    <real>24</real>
</array>
```

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow a different value at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Number options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<h3 class="property-heading"><code>count</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Creates two to four controls that are stored as one array. Read each value with a zero-based index such as `{{ control.myControl[0] }}`.

Control array

```xml
<key>count</key>
<integer>2</integer>
```

<h3 class="property-heading"><code>minimum</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="optional">Optional</span><span class="default">Default: -10000</span></div>

Lower editor bound.

```xml
<key>minimum</key>
<real>0</real>
```

<h3 class="property-heading"><code>maximum</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="optional">Optional</span><span class="default">Default: 10000</span></div>

Upper editor bound.

```xml
<key>maximum</key>
<real>100</real>
```

<h3 class="property-heading"><code>step</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="optional">Optional</span><span class="default">Default: 1</span></div>

Editor increment.

```xml
<key>step</key>
<real>1</real>
```

<h3 class="property-heading"><code>units</code></h3>
<div class="property-meta"><span class="property-type">String or Array</span><span class="optional">Optional</span><span class="default">Default: none</span></div>

Inspector-only unit label. Use a string for one value or one array entry per multi value. Each may contain at most three characters; units are not appended to template output.

Single control

```xml
<key>units</key>
<string>px</string>
```

Control array

```xml
<key>units</key>
<array>
    <string>px</string>
    <string>%</string>
</array>
```

## Return value

`{{ control.spacing }}` resolves as **Locale-independent numeric String**. Stored internally, its value is **Number (Double)**.

```css
padding: {{ control.spacing }}px;
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>spacing</string>
        <key>label</key><string>Number</string>
        <key>group</key><string>Content</string>
        <key>type</key><string>number</string>
        <key>minimum</key><real>0</real>
        <key>maximum</key><real>100</real>
        <key>step</key><real>1</real>
        <key>units</key><string>px</string>
        <key>default</key><real>24</real>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```css
padding: {{ control.spacing }}px;
```

{% endraw %}
