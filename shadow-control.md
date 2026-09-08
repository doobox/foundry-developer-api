---
layout: default
title: Shadow control · Foundry Developer
permalink: "/shadow-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Shadow</h1>
<p class="lede">A theme shadow picker with an optional author-editable stack of outer or inset shadow layers.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as a Shadow control. Always use `shadow`.

```xml
<key>type</key>
<string>shadow</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>cardShadow</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown beside the Shadow control in the Inspector.

```xml
<key>label</key>
<string>Shadow</string>
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

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">Value</span><span class="required">Required</span></div>

The initially selected portable theme shadow. Use `default`, `none`, `inner`, `xs`, `sm`, `md`, `lg`, `xl` or `2xl`; use `custom` only when Custom is enabled.

```xml
<key>default</key>
<string>md</string>
```

> Use a portable predefined shadow ID. Use `custom` only when `allowsCustom` is true. Project-specific custom shadow IDs can be selected by an author but are not portable manifest defaults.

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow the selected theme shadow or custom layer stack to vary at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Shadow options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown. Do not declare `themeValues` or `count`: Shadow uses the active theme automatically and edits one shadow value.

<h3 class="property-heading"><code>allowsCustom</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Adds a Custom choice after the theme shadows. Selecting it reveals the editable shadow-layer stack.

```xml
<key>allowsCustom</key>
<true/>
```

> Custom layers are author-owned. The manifest enables the editor but does not declare initial layer values; Foundry supplies the initial editable layer.

<div class="guidance" markdown="1">
<h3>Theme and custom shadows</h3>

The popup lists custom shadows from the active project theme followed by the predefined scale. Portable predefined IDs are `default`, `none`, `inner`, `xs`, `sm`, `md`, `lg`, `xl` and `2xl`. Do not declare `themeValues`; this control loads theme shadows automatically.

When `allowsCustom` is true, Custom reveals a layer editor. Each layer has horizontal and vertical offsets, blur, spread, colour, opacity and an outer or inset position. Multiple layers produce a comma-separated CSS value; no layers produce `none`.

> **Important:** Theme selections resolve through the active project theme. Custom layers store horizontal and vertical offsets, blur, spread, colour, opacity and outer or inset position together under this property ID.
</div>

## Return value

`{{ control.cardShadow }}` resolves as **CSS-ready box-shadow String**. Stored internally, its value is **One structured shadow value**.

```css
box-shadow: {{ control.cardShadow }};
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>cardShadow</string>
        <key>label</key><string>Shadow</string>
        <key>group</key><string>Content</string>
        <key>type</key><string>shadow</string>
        <key>allowsCustom</key><true/>
        <key>default</key><string>md</string>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```css
box-shadow: {{ control.cardShadow }};
```

{% endraw %}
