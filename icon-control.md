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
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control.

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

## Request the icon library

The picker and the published icon both use Foundry’s bundled icon catalogue. Add this once at the top level of the component manifest, beside `customItems` and `templates`.

```xml
<key>libraries</key>
<array>
    <dict>
        <key>id</key><string>com.foundry.icons</string>
        <key>majorVersion</key><integer>1</integer>
    </dict>
</array>
```

## Return value

`{{ control.symbol }}` resolves as an **HTML-escaped icon name without the `bi-` prefix**. Stored internally, its value is a **String**.

```html
<i class="bi bi-{{ control.symbol }}" aria-hidden="true"></i>
```

## Complete example

### Info.plist

```xml
<key>libraries</key>
<array>
    <dict>
        <key>id</key><string>com.foundry.icons</string>
        <key>majorVersion</key><integer>1</integer>
    </dict>
</array>
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>symbol</string>
        <key>label</key><string>Icon</string>
        <key>group</key><string>Appearance</string>
        <key>type</key><string>icon</string>
        <key>default</key><string>stars</string>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```html
<i class="bi bi-{{ control.symbol }}" aria-hidden="true"></i>
```

{% endraw %}
