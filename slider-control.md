---
layout: default
title: Slider control · Foundry Developer
permalink: "/slider-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Slider</h1>
<p class="lede">A continuous or stepped numeric slider with optional visual tick marks and an exact-value field.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Slider. Always use `slider`.

```xml
<key>type</key>
<string>slider</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>intensity</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the control in the Inspector, including when `count` is present.

```xml
<key>label</key>
<string>Slider</string>
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
<div class="property-meta"><span class="property-type">Number or Number array</span><span class="optional">Optional</span><span class="default">Default: zero clamped to range</span></div>

The value initially stored for this control. An omitted value becomes zero when zero is in range, otherwise the nearest bound. An explicit value must be numeric and within the declared range. A control array needs one value for each member.

Single control

```xml
<key>default</key>
<real>50</real>
```

Control array

```xml
<key>default</key>
<array>
    <real>50</real>
    <real>50</real>
</array>
```

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow a different value at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Slider options

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
<div class="property-meta"><span class="property-type">Number</span><span class="optional">Optional</span><span class="default">Default: 0</span></div>

Lower slider bound.

```xml
<key>minimum</key>
<real>0</real>
```

<h3 class="property-heading"><code>maximum</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="optional">Optional</span><span class="default">Default: 100</span></div>

Upper slider bound. It must be greater than `minimum`. Directly entered values are clamped to the resulting range.

```xml
<key>maximum</key>
<real>100</real>
```

<h3 class="property-heading"><code>step</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="optional">Optional</span><span class="default">Default: 0</span></div>

Selectable increment relative to `minimum`. It cannot be negative; zero means continuous. Directly entered values snap to a positive step.

```xml
<key>step</key>
<real>1</real>
```

<h3 class="property-heading"><code>ticks</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: 0</span></div>

Exact number of evenly distributed visible marks, including both endpoints. Use zero for no marks or an integer of at least two. Ticks are visual only.

```xml
<key>ticks</key>
<integer>11</integer>
```

<h3 class="property-heading"><code>showsValueField</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: true</span></div>

Shows an editable number field for precise entry beside the slider.

```xml
<key>showsValueField</key>
<true/>
```

<h3 class="property-heading"><code>units</code></h3>
<div class="property-meta"><span class="property-type">String or Array</span><span class="optional">Optional</span><span class="default">Default: none</span></div>

Inspector-only unit label. Use a string for one slider or one array entry per multi slider. Each may contain at most three characters; units are not appended to template output.

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

<div class="guidance" markdown="1">
<h3>Steps and ticks are independent</h3>

`step` controls selectable values and is measured from `minimum`. Omit it or use zero for a continuous slider. `ticks` is purely visual and gives the exact number of marks, including both endpoints. For a 0–100 percentage slider in increments of 10, use a step of 10 and 11 marks.

```xml
<key>minimum</key><real>0</real>
<key>maximum</key><real>100</real>
<key>step</key><real>10</real>
<key>ticks</key><integer>11</integer>
```

For a 0–1000 integer slider without marks, use `step` 1 and omit `ticks`.
</div>

## Return value

`{{ control.intensity }}` resolves as **Locale-independent numeric String**. Stored internally, its value is **Number (Double)**.

```css
filter: brightness({{ control.intensity }}%);
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>intensity</string>
        <key>label</key><string>Slider</string>
        <key>group</key><string>Content</string>
        <key>type</key><string>slider</string>
        <key>minimum</key><real>0</real>
        <key>maximum</key><real>100</real>
        <key>step</key><real>10</real>
        <key>ticks</key><integer>11</integer>
        <key>showsValueField</key><true/>
        <key>units</key><string>%</string>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```css
filter: brightness({{ control.intensity }}%);
```

{% endraw %}
