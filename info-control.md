---
layout: default
title: Info control · Foundry Developer
permalink: "/info-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Info</h1>
<p class="lede">Presentation-only explanatory text in an inspector group.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Info. Always use `info`.

```xml
<key>type</key>
<string>info</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>guidance</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section that contains this control. Omit the key to place it in Settings.

```xml
<key>group</key>
<string>Appearance</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

The explanatory text shown in the Inspector. The Info row is hidden when this value is omitted or empty.

```xml
<key>label</key>
<string>Changes here affect every breakpoint.</string>
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

## Info options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<div class="guidance" markdown="1">
<h3>Supplying the message</h3>

Use the item’s `labels` as the explanatory text. If labels is omitted or empty, Foundry hides the info row.

```xml
<key>label</key>
<string>Changes here affect every breakpoint.</string>
```

> **Important:** Use labels for the explanatory copy. An empty label causes the row to be hidden.
</div>

## Return value

`{{ control.guidance }}` resolves as **No template value**. Stored internally, its value is **None**.

```text
No template value
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>guidance</string>
        <key>label</key><string>Changes here affect every breakpoint.</string>
        <key>group</key><string>Derived values</string>
        <key>type</key><string>info</string>
    </dict>
</array>
```

### Use it in a template

```text
No template value
```

{% endraw %}
