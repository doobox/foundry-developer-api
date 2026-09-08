---
layout: default
title: Icon control · Foundry Developer
permalink: "/icon-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Icon</h1>
<p class="lede">A searchable visual picker containing every icon in Foundry’s built-in icon library.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as an Icon control. Always use `icon`.

```xml
<key>type</key>
<string>icon</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>symbol</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the control in the Inspector, including when `count` is present.

```xml
<key>label</key>
<string>Icon</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section that contains this control.

```xml
<key>group</key>
<string>Appearance</string>
```

<h3 class="property-heading"><code>toolTip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains what the control changes.

```xml
<key>toolTip</key>
<string>Choose an icon.</string>
```

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the picker. With `count`, use an array containing no more than one subtitle for each picker; entries correspond by zero-based index.

```xml
<key>subtitle</key>
<string>Additional guidance</string>
```

<h3 class="property-heading"><code>enable</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the stated condition. See [Conditional visibility](enable-control.html).

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="required">Required</span></div>

An icon name from Foundry’s built-in catalogue, without the `bi-` prefix. A control array needs one value for each member.

```xml
<key>default</key>
<string>stars</string>
```

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow a different icon at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Icon options

<h3 class="property-heading"><code>count</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Creates two to four icon controls stored as one array. Read each value using a zero-based index.

When `count` is present, `default` must be an array containing exactly `count` valid icon names.

```xml
<key>count</key>
<integer>2</integer>
<key>subtitle</key>
<array>
    <string>Previous</string>
    <string>Next</string>
</array>
<key>default</key>
<array>
    <string>arrow-left</string>
    <string>arrow-right</string>
</array>
```

## Built-in icon library

An Icon control automatically includes Foundry’s bundled Bootstrap Icons CSS and font in preview and published output. Do not add a `libraries` declaration for it. Foundry includes the library once even when a component declares several Icon controls or a page uses several components containing them.

## Return value

`{{ control.symbol }}` resolves as an **HTML-escaped icon name without the `bi-` prefix**. A single Icon stores a **String**; a multi Icon stores a **String array**.

```html
<i class="bi bi-{{ control.symbol }}" aria-hidden="true"></i>
```

For a multi Icon, read each name by zero-based index.

```html
<i class="bi bi-{{ control.directions[0] }}" aria-hidden="true"></i>
<i class="bi bi-{{ control.directions[1] }}" aria-hidden="true"></i>
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>type</key><string>icon</string>
        <key>id</key><string>symbol</string>
        <key>label</key><string>Icon</string>
        <key>group</key><string>Appearance</string>
        <key>default</key><string>stars</string>
    </dict>
</array>
```

### Use it in a template

```html
<i class="bi bi-{{ control.symbol }}" aria-hidden="true"></i>
```

{% endraw %}
