---
layout: default
title: Link control · Foundry Developer
permalink: "/link-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Link</h1>
<p class="lede">A structured destination supporting URLs, plain text, project pages, project resources, anchors, new-window behaviour, and custom attributes.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as a Link control. Always use `link`.

```xml
<key>type</key>
<string>link</string>
```

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores or hyphens.

```xml
<key>id</key>
<string>destination</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the control in the Inspector, including when `count` is present.

```xml
<key>label</key>
<string>Destination</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section that contains this control. Omit the key to place it in Settings.

```xml
<key>group</key>
<string>Content</string>
```

<h3 class="property-heading"><code>toolTip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains what the control changes.

```xml
<key>toolTip</key>
<string>Choose a destination.</string>
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

The initial destination. An empty string means no destination; a non-empty string initializes a URL destination.

```xml
<key>default</key>
<string></string>
```

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow a different value at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Link options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<h3 class="property-heading"><code>count</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Creates two to four link controls stored as one array.

```xml
<key>count</key>
<integer>2</integer>
```

<h3 class="property-heading"><code>absoluteURL</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Prefixes internal page and resource paths with the project Site URL when it is a valid HTTP(S) URL. Otherwise Foundry retains the relative path.

```xml
<key>absoluteURL</key>
<true/>
```

<div class="guidance" markdown="1">
<h3>Companion template values</h3>

The base expression returns the resolved `href`. Foundry also exposes `.target` and `.attributes`, allowing the author’s new-window choice and validated custom attributes to reach the element. Page and resource destinations are stored by stable ID and resolve to their current exported path.

Invalid HTML attribute names are omitted. Opening a new window emits `_blank` and adds `rel="noopener noreferrer"` unless the author supplies `rel`.
</div>


## Return value

`{{ control.destination }}` resolves as **Escaped href plus companion strings**. Stored internally, its value is **Structured link value**.

```html
<a href="{{ control.destination }}"
   target="{{ control.destination.target }}"
   {{ control.destination.attributes }}>Read more</a>
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>type</key><string>link</string>
        <key>id</key><string>destination</string>
        <key>label</key><string>Destination</string>
        <key>group</key><string>Content</string>
        <key>absoluteURL</key><true/>
        <key>default</key><string></string>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```html
<a href="{{ control.destination }}"
   target="{{ control.destination.target }}"
   {{ control.destination.attributes }}>Read more</a>
```

{% endraw %}
