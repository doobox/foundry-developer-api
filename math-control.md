---
layout: default
title: Math control · Foundry Developer
permalink: "/math-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Math</h1>
<p class="lede">A virtual numeric result calculated from constants or other controls.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Math. Always use `math`.

```xml
<key>type</key>
<string>math</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>doubleWidth</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section that contains this control. Omit the key to place it in Settings.

```xml
<key>group</key>
<string>Appearance</string>
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

## Math options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<h3 class="property-heading"><code>argument1</code></h3>
<div class="property-meta"><span class="property-type">Number or String</span><span class="required">Required</span></div>

Numeric constant, numeric String, or another control ID.

```xml
<key>argument1</key>
<string>width</string>
```

<h3 class="property-heading"><code>argument2</code></h3>
<div class="property-meta"><span class="property-type">Number or String</span><span class="required">Required</span></div>

Numeric constant, numeric String, or another control ID.

```xml
<key>argument2</key>
<real>2</real>
```

<h3 class="property-heading"><code>operation</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Selects addition, subtraction, multiplication, division, remainder, minimum, or maximum using `+`, `-`, `*`, `/`, `%`, `min`, or `max`. Division or remainder by zero returns `0`.

```xml
<key>operation</key>
<string>*</string>
```

<h3 class="property-heading"><code>round</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: true</span></div>

Rounds the calculated result.

```xml
<key>round</key>
<false/>
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

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>doubleWidth</string>
        <key>group</key><string>Derived values</string>
        <key>type</key><string>math</string>
        <key>argument1</key><string>width</string>
        <key>argument2</key><real>2</real>
        <key>operation</key><string>*</string>
        <key>round</key><false/>
    </dict>
</array>
```

### Use it in a template

```css
width: {{ control.doubleWidth }}px;
```

{% endraw %}
