---
layout: default
title: Select control · Foundry Developer
permalink: "/select-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Select</h1>
<p class="lede">A popup containing developer-declared options, values requested from the active theme, or both.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as a Select. Always use `select`.

```xml
<key>type</key>
<string>select</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this Select and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>mySelect</string>
```

> Replace `mySelect` with your own identifier. The name is not predefined, but it must be unique in the component and follow the identifier rules above.

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the Select in the Inspector, including for a [Multi Select](#count).

```xml
<key>label</key>
<string>Font Size</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section that contains this Select. Omit the key to place it in Settings.

```xml
<key>group</key>
<string>Typography</string>
```

<h3 class="property-heading"><code>toolTip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains what the Select changes.

```xml
<key>toolTip</key>
<string>Choose the text size.</string>
```

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control. Use a String for one control or a String array with `count`.

Single control

```xml
<key>subtitle</key>
<string>Additional guidance</string>
```

Multi Select

```xml
<key>subtitle</key>
<array>
    <string>Small screen</string>
    <string>Large screen</string>
</array>
```

<h3 class="property-heading"><code>enable</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this Select only when another control meets the stated condition.

```xml
<key>enable</key>
<dict>
    <key>id</key>
    <string>showTypography</string>
    <key>value</key>
    <true/>
</dict>
```

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="required">Required</span></div>

The initially selected value. Use a declared option value, a standard key supplied by `themeValues`, or `custom` when Custom is available. A Multi Select needs one value per popup.

Single Select

```xml
<key>default</key>
<string>base</string>
```

Multi Select

```xml
<key>default</key>
<array>
    <string>compact</string>
    <string>comfortable</string>
</array>
```

> Use the `value` of a declared option, a portable key supplied by `themeValues`, or `custom` when that choice is available.

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow a different selected value at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Select options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<h3 class="property-heading"><code>count</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Creates two to four popups that share the same declared options. Their values are stored as an array and read in templates using a zero-based index. Do not use it with `themeValues`.

Multi Select

```xml
<key>count</key>
<integer>2</integer>
```

Template access

```text
{{ control.mySelect[0] }}
{{ control.mySelect[1] }}
```

> **Template access uses a zero-based index.** Use `{{ control.mySelect[0] }}` for the first value and `{{ control.mySelect[1] }}` for the second. **Not allowed with theme values.** When `themeValues` is present, the Select must contain one value.

<h3 class="property-heading"><code>options</code></h3>
<div class="property-meta"><span class="property-type">Array of dictionaries</span><span class="optional">Optional</span><span class="default">Default: \[\]</span></div>

Lists choices supplied by the component. Each dictionary needs a value to store and a title to show in the popup.

```xml
<key>options</key>
<array>
    <dict>
        <key>value</key>
        <string>compact</string>
        <key>title</key>
        <string>Compact</string>
    </dict>
    <dict>
        <key>value</key>
        <string>comfortable</string>
        <key>title</key>
        <string>Comfortable</string>
    </dict>
</array>
```

> May be used by itself or together with `themeValues`. When combined, developer-declared options appear after the standard and custom theme values.

<h3 class="property-heading"><code>themeValues</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Adds choices from one active-theme collection: `fontFamilies`, `fontSizes`, or `spacing`. When this key is present, do not declare `count`.

```xml
<key>themeValues</key>
<string>fontSizes</string>
```

> **Popup order:** standard theme values, custom values added in the Theme Editor, developer-declared `options`, then Custom when supported and enabled. Labels show only each theme value’s name.

| Source | Template output | Custom behaviour | Companion value |
| --- | --- | --- | --- |
| `fontFamilies` | CSS font family | Not supported; add fonts in Theme Editor | None |
| `fontSizes` | CSS size | Size and Line Height fields | `.lineHeight` |
| `spacing` | CSS spacing value | Custom is a literal choice | None |

<h3 class="property-heading"><code>allowsCustom</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Adds a final Custom choice for supported themeValues sources. It is not supported by fontFamilies.

```xml
<key>allowsCustom</key>
<true/>
```

> Requires a named `themeValues` source. It is not supported with `fontFamilies`; add fonts in the Theme Editor instead. For `fontSizes`, Custom reveals Size and Line Height fields. For `spacing`, it returns the literal value `custom`, which can enable a separate control.

## Return value

`{{ control.textSize }}` resolves as **Declared value, custom override, or resolved CSS theme value**. Stored internally, its value is **String or a theme-specific structured value**.

```css
font-size: {{ control.textSize }};
line-height: {{ control.textSize.lineHeight }};
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>textSize</string>
        <key>label</key><string>Select</string>
        <key>group</key><string>Content</string>
        <key>type</key><string>select</string>
        <key>themeValues</key><string>fontSizes</string>
        <key>allowsCustom</key><true/>
        <key>default</key><string>base</string>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```css
font-size: {{ control.textSize }};
line-height: {{ control.textSize.lineHeight }};
```

{% endraw %}
