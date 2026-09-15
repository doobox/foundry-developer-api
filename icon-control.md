---
layout: default
title: Icon control · Foundry Developer
permalink: "/icon-control.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Info.plist · controls</p>
<h1>Icon</h1>
<p class="lede">A searchable visual picker containing every icon in Foundry’s built-in icon library.</p>


## Quick example

Add this dictionary to your part's `controls` array:

```xml
<dict>
    <key>type</key><string>icon</string>
    <key>id</key><string>symbol</string>
    <key>defaults</key>
    <dict>
        <key>base</key><string>stars</string>
    </dict>
</dict>
```

Use it in your HTML template:

```html
<i class="bi bi-{{ control.symbol }}" aria-hidden="true"></i>
```


## Basic properties

Each item in `controls` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour.

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

<h3 class="property-heading"><code>tooltip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains what the control changes.

```xml
<key>tooltip</key>
<string>Choose an icon.</string>
```

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the picker. With `count`, use an array containing no more than one subtitle for each picker; entries correspond by zero-based index.

```xml
<key>subtitle</key>
<string>Additional guidance</string>
```

<h3 class="property-heading"><code>visibleWhen</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the stated condition. See [Conditional visibility](visible-when.html).

<h3 class="property-heading"><code>defaults</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="required">Required</span></div>

A dictionary containing the required `base` value and optional breakpoint values: `small`, `medium`, `large`, `extraLarge`, and `doubleExtraLarge`. Breakpoint entries require `responsive: true`. Every entry uses the complete value format described below; omitted breakpoints inherit the preceding enabled value. Disabled project breakpoints are skipped without discarding their declarations. User overrides take precedence at the same breakpoint. Resetting an override restores the default cascade.

<h3 class="property-heading"><code>defaults.base</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="required">Required</span></div>

An icon name from Foundry’s built-in catalogue, without the `bi-` prefix. A control array needs one value for each member.

```xml
<key>defaults</key><dict><key>base</key><string>stars</string></dict>
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

When `count` is present, `defaults.base` must be an array containing exactly `count` valid icon names.

```xml
<key>count</key>
<integer>2</integer>
<key>subtitle</key>
<array>
    <string>Previous</string>
    <string>Next</string>
</array>
<key>defaults</key><dict><key>base</key><array>
    <string>arrow-left</string>
    <string>arrow-right</string>
</array></dict>
```

## Built-in icon library

An Icon control automatically includes Foundry’s bundled Bootstrap Icons CSS and font in preview and published output. Do not add a `libraries` declaration for it. Foundry includes the library once even when a part declares several Icon controls or a page uses several parts containing them.

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
<key>controls</key>
<array>
    <dict>
        <key>type</key><string>icon</string>
        <key>id</key><string>symbol</string>
        <key>label</key><string>Icon</string>
        <key>group</key><string>Appearance</string>
        <key>defaults</key><dict><key>base</key><string>stars</string></dict>
    </dict>
</array>
```

### Use it in a template

```html
<i class="bi bi-{{ control.symbol }}" aria-hidden="true"></i>
```

{% endraw %}
