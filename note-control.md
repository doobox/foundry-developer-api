---
layout: default
title: Note control · Foundry Developer
permalink: "/note-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Note</h1>
<p class="lede">Presentation-only explanatory text in an inspector group.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name and placement.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Note. Always use `note`.

```xml
<key>type</key>
<string>note</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name for this Inspector item. It must start with a letter and may contain letters, numbers, underscores and hyphens. Note is presentation-only, so this identifier is not available as a template value.

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

<h3 class="property-heading"><code>title</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: none</span></div>

An optional heading shown above the explanatory text. Omit this key to show the text without a heading.

```xml
<key>title</key>
<string>About responsive settings</string>
```

<h3 class="property-heading"><code>body</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The explanatory text shown across the full width of the Inspector.

```xml
<key>body</key>
<string>Changes here affect every breakpoint.</string>
```

<h3 class="property-heading"><code>systemImage</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: none</span></div>

The name of an SF Symbol shown in secondary colour to the left of the title. Omit this key to show no symbol.

```xml
<key>systemImage</key>
<string>info.circle</string>
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

## Note options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<div class="guidance" markdown="1">
<h3>Supplying the message</h3>

Use `body` for the required explanatory copy, optionally add `title` as a heading, and use `systemImage` when the message benefits from an SF Symbol. Note content occupies the full Inspector width rather than using the standard label and value columns.

```xml
<key>body</key>
<string>Changes here affect every breakpoint.</string>
```

> **Important:** Note does not use `label` or `subtitle`. It is a single, presentation-only item and does not support `count` or `responsive`.
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
        <key>title</key><string>About responsive settings</string>
        <key>body</key><string>Changes here affect every breakpoint.</string>
        <key>systemImage</key><string>info.circle</string>
        <key>group</key><string>Derived values</string>
        <key>type</key><string>note</string>
    </dict>
</array>
```

### Use it in a template

```text
No template value
```

{% endraw %}
