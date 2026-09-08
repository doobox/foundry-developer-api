---
layout: default
title: Divider control · Foundry Developer
permalink: "/divider-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Divider</h1>
<p class="lede">A presentation-only visual separator between inspector controls.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. A Divider has no editable value and is used only to separate nearby controls visually.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Divider. Always use `divider`.

```xml
<key>type</key>
<string>divider</string>
```

> **Important:** Divider supports only `type`, `id`, `group`, and optional `enable`. It has no author-editable state or template value.


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name of this Inspector item. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>separator</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section that contains this control. Omit the key to place it in Settings.

```xml
<key>group</key>
<string>Appearance</string>
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

Divider does not support `label`, `subtitle`, `toolTip`, `default`, `responsive`, or `count`.

Foundry displays 10 points of space above and below the divider.

## Return value

Divider is an Inspector-only layout item. It does not produce a template value.

```text
No template value
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>type</key><string>divider</string>
        <key>id</key><string>separator</string>
        <key>group</key><string>Derived values</string>
    </dict>
</array>
```

### Use it in a template

```text
No template value
```

{% endraw %}
