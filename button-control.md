---
layout: default
title: Button control · Foundry Developer
permalink: "/button-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Button</h1>
<p class="lede">A persistent push button backed by Boolean state and optional mapped outputs.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Button. Always use `button`.

```xml
<key>type</key>
<string>button</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>state</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the control in the Inspector, including when `count` is present.

```xml
<key>label</key>
<string>Button</string>
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
<div class="property-meta"><span class="property-type">Boolean or Boolean array</span><span class="required">Required</span></div>

The Boolean state initially stored by the Inspector. A control array requires exactly one Boolean for each button.

Single control

```xml
<key>default</key>
<false/>
```

Control array

```xml
<key>default</key>
<array>
    <false/>
    <false/>
</array>
```

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow a different value at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Button options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<h3 class="property-heading"><code>count</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Creates two to four controls that are stored as one array. Read each value with a zero-based index such as `{{ control.myControl[0] }}`.

Control array

```xml
<key>count</key>
<integer>2</integer>
```

<h3 class="property-heading"><code>selectionMode</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: multiple</span></div>

Controls how Buttons behave when `count` is present.

- `multiple` displays up to four independent Buttons. Any number may be active.
- `single` displays one segmented Picker and keeps exactly one segment selected.

With `single`, the `default` array must contain exactly one `true` value.

```xml
<key>selectionMode</key>
<string>single</string>
```

<h3 class="property-heading"><code>buttonText</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="optional">Optional</span><span class="default">Default: Button when no icon</span></div>

Text displayed inside the Button. With `count`, supply a String array to set the text for each Button.

When `buttonIcon` is present and the corresponding text is omitted or empty, Foundry displays an icon-only Button. When both text and icon are omitted, Foundry displays `Button`.

Single control

```xml
<key>buttonText</key>
<string>Apply</string>
```

Control array

```xml
<key>buttonText</key>
<array>
    <string>Previous</string>
    <string>Next</string>
</array>
```

<h3 class="property-heading"><code>buttonIcon</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

SF Symbol displayed beside `buttonText`. With `count`, provide an array to assign a different icon to each Button.

```xml
<key>buttonIcon</key>
<array>
    <string>arrow.left</string>
    <string>arrow.right</string>
</array>
```

<h3 class="property-heading"><code>activeButtonText</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="optional">Optional</span><span class="default">Default: buttonText</span></div>

Replacement Button text while its stored state is `true`. With `count`, each entry corresponds to the Button at the same index.

```xml
<key>activeButtonText</key>
<string>Applied</string>
```

<h3 class="property-heading"><code>activeButtonIcon</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="optional">Optional</span><span class="default">Default: buttonIcon</span></div>

Replacement SF Symbol while a Button's stored state is `true`. With `count`, each entry corresponds to the Button at the same index.

```xml
<key>activeButtonIcon</key>
<string>checkmark</string>
```

<h3 class="property-heading"><code>trueValue</code></h3>
<div class="property-meta"><span class="property-type">String, Number, Boolean or array</span><span class="optional">Optional</span><span class="default">Default: true</span></div>

The value supplied to templates while the stored Boolean state is `true`. With `selectionMode` `multiple`, use one value for every Button or an array containing exactly `count` mapped values. With `single`, an array maps each segment to the scalar value returned when selected.

```xml
<key>trueValue</key>
<string>active</string>
```

<h3 class="property-heading"><code>falseValue</code></h3>
<div class="property-meta"><span class="property-type">String, Number, Boolean or array</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

The value supplied to templates while the stored Boolean state is `false`. This applies to single Buttons and `multiple` Button arrays; a `single` segmented Picker returns only its selected `trueValue`.

```xml
<key>falseValue</key>
<string>idle</string>
```

<div class="guidance" markdown="1">
<h3>Stored state and returned output</h3>

Pressing an independent Button toggles its stored Boolean state. A `false` Button uses the bordered appearance; a `true` Button uses the prominent bordered appearance. A `single` Button array uses a segmented Picker and stores its selection as a Boolean array.
</div>

## Return value

For a single Button, `{{ control.state }}` resolves to its mapped value or Boolean state. A `multiple` Button array resolves to an array. A `single` segmented Picker always has one selection and resolves to the selected entry in `trueValue`, or its zero-based selected index when `trueValue` is omitted.

```text
data-state="{{ control.state }}"
```

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>state</string>
        <key>label</key><string>Button</string>
        <key>group</key><string>Content</string>
        <key>type</key><string>button</string>
        <key>buttonText</key><string>Apply</string>
        <key>buttonIcon</key><string>bolt.fill</string>
        <key>trueValue</key><string>active</string>
        <key>falseValue</key><string>idle</string>
        <key>default</key><false/>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```text
data-state="{{ control.state }}"
```

{% endraw %}
