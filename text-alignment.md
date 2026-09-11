---
layout: default
title: Text alignment control · Foundry Developer
permalink: "/text-alignment.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Text alignment</h1>
<p class="lede">A preconfigured segmented control that produces logical CSS text-alignment values.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as a Text alignment control. Always use `textAlignment`.

```xml
<key>type</key>
<string>textAlignment</string>
```

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores or hyphens.

```xml
<key>id</key>
<string>alignment</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown beside the control in the Inspector.

```xml
<key>label</key>
<string>Alignment</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section that contains this control. Omit the key to place it in Settings.

```xml
<key>group</key>
<string>Typography</string>
```

<h3 class="property-heading"><code>toolTip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains what the control changes.

```xml
<key>toolTip</key>
<string>Choose text alignment.</string>
```

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: []</span></div>

Supporting text for members of a control array. Use this key only when `count` is present.

```xml
<key>subtitle</key>
<array>
    <string>First value</string>
    <string>Second value</string>
</array>
```

<h3 class="property-heading"><code>enable</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the stated condition. See [Conditional visibility](enable-control.html).

```xml
<key>enable</key>
<dict>
    <key>id</key><string>showControl</string>
    <key>value</key><true/>
</dict>
```

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="required">Required</span></div>

The initially selected logical alignment. Use `start`, `center`, `end`, or `justify`.

```xml
<key>default</key>
<string>start</string>
```

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="required">Required</span></div>

Set to true to allow a different value at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Text alignment options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<h3 class="property-heading"><code>count</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Creates two to four text-alignment controls stored as one array.

```xml
<key>count</key>
<integer>2</integer>
```

<div class="guidance" markdown="1">
<h3>Logical alignment values</h3>

- `start` follows the writing direction’s starting edge.
- `center` centres each line.
- `end` follows the writing direction’s ending edge.
- `justify` expands spacing so lines meet both edges.

Use logical values rather than hard-coded left or right alignment so published content follows left-to-right and right-to-left writing modes.
</div>


## Return value

`{{ control.alignment }}` resolves as **CSS keyword: start, center, end, or justify**. Stored internally, its value is **String**.

```css
text-align: {{ control.alignment }};
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>type</key><string>textAlignment</string>
        <key>id</key><string>alignment</string>
        <key>label</key><string>Alignment</string>
        <key>group</key><string>Typography</string>
        <key>default</key><string>start</string>
        <key>responsive</key><true/>
    </dict>
</array>
```

### Use it in a template

```css
text-align: {{ control.alignment }};
```

{% endraw %}
