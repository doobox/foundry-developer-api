---
layout: default
title: Theme colour control · Foundry Developer
permalink: "/theme-colour-control.html"
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a></div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Theme colour</h1>
<p class="lede">A theme-aware colour selector that resolves the active project theme for templates.</p>

## Basic properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Theme colour. Always use `themeColor`.

```xml
<key>type</key>
<string>themeColor</string>
```

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique template name. It must start with a letter and may contain letters, numbers, underscores and hyphens.

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the control.

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section containing the control.

<h3 class="property-heading"><code>toolTip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text explaining what the control changes.

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control.

<h3 class="property-heading"><code>enable</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the declared condition.

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The initially selected source: `background`, `surface`, `text`, `accent`, or `links`. `custom` is valid only when `allowsCustom` is true, and then `customColor` is required.

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Allows a different selection at each responsive breakpoint.

## Theme colour options

<h3 class="property-heading"><code>allowsCustom</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Adds a Custom choice and colour picker.

<h3 class="property-heading"><code>customColor</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: #000000</span></div>

The colour retained by the Custom choice. It must be `#RRGGBB` and is required when `default` is `custom`.

<h3 class="property-heading"><code>colorMath</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Adds a −100…100 lighter-or-darker adjustment. The returned colour includes it.

<h3 class="property-heading"><code>opacity</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Allows alpha for the Custom choice. Theme colours retain the active theme value.

## Return value

Returns the selected theme role resolved to its active CSS colour. A Custom selection returns its literal colour.

## Complete example

```xml
<dict>
    <key>type</key><string>themeColor</string>
    <key>id</key><string>backgroundColor</string>
    <key>label</key><string>Background</string>
    <key>group</key><string>Appearance</string>
    <key>allowsCustom</key><true/>
    <key>customColor</key><string>#3366CC</string>
    <key>colorMath</key><true/>
    <key>opacity</key><true/>
    <key>default</key><string>accent</string>
</dict>
```

```css
background-color: {{ control.backgroundColor }};
```

{% endraw %}
