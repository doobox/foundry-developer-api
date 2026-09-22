---
layout: default
title: Framework shadow control · Foundry Developer
permalink: "/framework-shadow-control.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Info.plist · controls</p>
<h1>Framework shadow</h1>
<p class="lede">A framework shadow picker with an optional author-editable stack of outer or inset shadow layers behind the framework-mode toggle.</p>


<figure class="control-screenshot">
    <img src="assets/screenshots/shadow-control.png" width="348" height="38" alt="Shadow picker with MD selected." />
    <figcaption>A compact picker for the selected shadow preset.</figcaption>
</figure>

## Quick example

Add this dictionary to your part's `controls` array:

```xml
<dict>
    <key>type</key><string>frameworkShadow</string>
    <key>id</key><string>cardShadow</string>
    <key>defaults</key>
    <dict>
        <key>base</key><string>md</string>
    </dict>
</dict>
```

Use it in the part's CSS template:

```css
:instance {
    box-shadow: {{ control.cardShadow }};
}
```


## Basic properties

Each item in `controls` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as a Framework shadow control. Always use `frameworkShadow`.

```xml
<key>type</key>
<string>frameworkShadow</string>
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

Text shown beside the Framework shadow control in the Inspector.

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

<h3 class="property-heading"><code>tooltip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains what the control changes.

```xml
<key>tooltip</key>
<string>Choose a value.</string>
```

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control.

```xml
<key>subtitle</key>
<string>Additional guidance</string>
```

<h3 class="property-heading"><code>visibleWhen</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the stated condition.

```xml
<key>visibleWhen</key>
<dict>
    <key>id</key>
    <string>showControl</string>
    <key>value</key>
    <true/>
</dict>
```

<h3 class="property-heading"><code>valueAvailability</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: always</span></div>

Controls when this control's value is available to templates. `always` preserves the value when the control is hidden. `whenVisible` makes `control.<id>` and its qualified derived values unavailable while `visibleWhen` is false, without discarding the stored value. `whenVisible` requires `visibleWhen`. See [Conditional visibility](visible-when.html).

<h3 class="property-heading"><code>defaults</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="required">Required</span></div>

A dictionary containing the required `base` value and optional breakpoint values: `small`, `medium`, `large`, `extraLarge`, and `doubleExtraLarge`. Breakpoint entries require `responsive: true`. Every entry uses the complete value format described below; omitted breakpoints inherit the preceding enabled value. Disabled project breakpoints are skipped without discarding their declarations. User overrides take precedence at the same breakpoint. Resetting an override restores the default cascade.

<h3 class="property-heading"><code>defaults.base</code></h3>
<div class="property-meta"><span class="property-type">Value</span><span class="required">Required</span></div>

The initially selected portable framework shadow. Use `none`, `inner`, `xs`, `sm`, `md`, `lg`, `xl` or `2xl`; use `custom` only when Custom is enabled. `sm` is the standard default-sized shadow.

```xml
<key>defaults</key><dict><key>base</key><string>md</string></dict>
```

> Use a portable predefined shadow ID. Use `custom` only when `allowsCustom` is true. Project-specific custom shadow IDs can be selected by an author but are not portable manifest defaults.

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow the selected framework shadow or custom layer stack to vary at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Shadow options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown. Do not declare `frameworkValues` or `count`: Framework shadow uses the active framework automatically and edits one shadow value.

<h3 class="property-heading"><code>allowsCustom</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Enables custom mode. The control shows the framework-mode toggle to the picker's right; switching it off replaces the picker with the editable shadow-layer stack, exactly as the framework spacing controls switch between tokens and custom values.

```xml
<key>allowsCustom</key>
<true/>
```

> Custom layers are author-owned. The manifest enables the editor but does not declare initial layer values; Foundry supplies the initial editable layer.

<div class="guidance" markdown="1">
<h3>Framework and custom shadows</h3>

The popup lists custom shadows from the active project framework followed by the predefined scale. Portable predefined IDs are `none`, `inner`, `xs`, `sm`, `md`, `lg`, `xl` and `2xl`. Do not declare `frameworkValues`; this control loads framework shadows automatically.

The framework-mode toggle beside the picker switches to a custom layer editor. Each layer has horizontal and vertical offsets, blur, spread, colour, opacity and an outer or inset position. Multiple layers produce a comma-separated CSS value; no layers produce `none`.

> **Important:** Framework selections resolve through the active project framework. Custom layers store horizontal and vertical offsets, blur, spread, colour, opacity and outer or inset position together under this property ID.
</div>

## Return value

`{{ control.cardShadow }}` resolves as **CSS-ready box-shadow String**. Stored internally, its value is **One structured shadow value**.

```css
box-shadow: {{ control.cardShadow }};
```

## Complete example

### Info.plist

```xml
<key>controls</key>
<array>
    <dict>
        <key>id</key><string>cardShadow</string>
        <key>label</key><string>Shadow</string>
        <key>group</key><string>Content</string>
        <key>type</key><string>frameworkShadow</string>
        <key>allowsCustom</key><true/>
        <key>defaults</key><dict><key>base</key><string>md</string></dict>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```css
box-shadow: {{ control.cardShadow }};
```

{% endraw %}
