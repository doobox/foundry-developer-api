---
layout: default
title: Select control · Foundry Developer
permalink: "/select-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · controls</p>
<h1>Select</h1>
<p class="lede">A native popup containing explicitly declared options.</p>


## Basic properties

Each item in `controls` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

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

> Replace `mySelect` with your own identifier. The name is not predefined, but it must be unique in the block and follow the identifier rules above.

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

<h3 class="property-heading"><code>tooltip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains what the Select changes.

```xml
<key>tooltip</key>
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

<h3 class="property-heading"><code>visibleWhen</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this Select only when another control meets the stated condition.

```xml
<key>visibleWhen</key>
<dict>
    <key>id</key>
    <string>showTypography</string>
    <key>value</key>
    <true/>
</dict>
```

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="required">Required</span></div>

The initially selected value. Use a declared option value. A Multi Select needs one value per popup.

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

> Use the `value` of a declared option.

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

Creates two to four popups that share the same declared options. Their values are stored as an array and read in templates using a zero-based index.

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

> **Template access uses a zero-based index.** Use `{{ control.mySelect[0] }}` for the first value and `{{ control.mySelect[1] }}` for the second.

<h3 class="property-heading"><code>options</code></h3>
<div class="property-meta"><span class="property-type">Array of dictionaries</span><span class="optional">Optional</span><span class="default">Default: \[\]</span></div>

Lists choices supplied by the block. Each dictionary needs a value to store and a title to show in the popup.

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

Select offers only the options declared here. It does not populate choices from the theme. Use a dedicated theme control for theme-aware editing.

## Return value

`{{ control.layout }}` returns the selected option's String value unchanged. With `count`, it returns an array of those strings, accessed by zero-based index.

## Complete example

### Info.plist

```xml
<key>controls</key>
<array>
    <dict>
        <key>type</key><string>select</string>
        <key>id</key><string>layout</string>
        <key>label</key><string>Layout</string>
        <key>group</key><string>Content</string>
        <key>options</key>
        <array>
            <dict><key>value</key><string>block</string><key>title</key><string>Block</string></dict>
            <dict><key>value</key><string>flex</string><key>title</key><string>Flex</string></dict>
        </array>
        <key>default</key><string>block</string>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```css
display: {{ control.layout }};
```

{% endraw %}
