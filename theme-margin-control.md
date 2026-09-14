---
layout: default
title: Theme margin control · Foundry Developer
permalink: "/theme-margin-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · controls</p>
<h1>Theme margin</h1>
<p class="lede">Four always-visible edge rows with theme spacing, custom lengths, and coordinated linking.</p>

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `themeMargin`. This is a dedicated control, not a Select extension.

The control includes all four edges and built-in custom inputs. It does not accept `count`, `options`, `themeValues`, `allowsCustom`, `minimum`, `maximum`, `step`, or a top-level `unit`. Only the properties listed on this page are accepted.

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Unique control identifier, starting with a letter and containing letters, numbers, underscores or hyphens. Templates access its fields through `{{ control.yourID.top }}` or its complete shorthand through `{{ control.yourID }}`.

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Margin</span></div>

The control's label in the Inspector's normal left-hand label column, beside the all-edges link button. An omitted, empty or whitespace-only label displays Margin. The four fixed row labels are Top, Bottom, Left and Right.

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section containing the control.

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">String or Dictionary</span><span class="required">Required</span></div>

Declare one value for every edge, or a dictionary containing all four keys: `top`, `right`, `bottom` and `left`. Each edge accepts either:

- A portable theme spacing ID: `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, or `3xl`.
- `none`, which produces zero margin.
- `auto`, which lets CSS layout determine the margin. Its effect depends on the layout; it is not a fixed length.
- A custom length dictionary containing exactly `value` (a finite Number) and `unit` (String: `px`, `rem`, `em`, or `%`).

A single token or custom length dictionary applies to all four edges. Four-edge dictionaries must include every edge and no other keys. Negative custom lengths are supported. Arrays and raw CSS strings such as `"16px"` are not accepted. Project-specific custom theme IDs cannot be declared as portable defaults; authors select them from the active theme in the Inspector.

```xml
<key>default</key>
<string>sm</string>
```

For different initial values:

```xml
<key>default</key>
<dict>
    <key>top</key><string>lg</string>
    <key>right</key><string>sm</string>
    <key>bottom</key><string>lg</string>
    <key>left</key>
    <dict>
        <key>value</key><real>1.5</real>
        <key>unit</key><string>rem</string>
    </dict>
</dict>
```

Identical edge selections start linked; differing selections start independent. All four rows remain visible. Selecting Custom converts the selected theme amount to rem as the starting value; the return-to-theme button restores the previous theme choice.

The header links all edges using Top. A pair button links Top–Bottom using Top or Left–Right using Left, regardless of which button was clicked. Linking the second pair promotes to all-linked using Top. Unlinking preserves values. Linking also shares the custom/theme mode and unit; it does not merely copy the displayed number.

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Allows the whole four-edge value to override at a responsive breakpoint. There is one responsive indicator beside the main label, not one per edge. Editing at an overridden breakpoint stores all four selections and their link state together. Use the returned fields in the part's CSS template to generate responsive styles. Margin is shared between light and dark appearances.

<h3 class="property-heading"><code>tooltip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Margin</span></div>

Help text for the overall control. Individual buttons retain their action-specific help.

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text beneath the four-edge editor. Arrays are not accepted because this control does not support `count`.

<h3 class="property-heading"><code>visibleWhen</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows the complete control when another control meets the declared condition. See [Conditional visibility](visible-when.html). Margin itself is a structured value, not a scalar comparison source.

## Return value

Use `{{ control.themeMargin }}` directly to output the four CSS lengths in shorthand order: top, right, bottom, left. Qualified fields remain available:

- `top`, `right`, `bottom`, `left`: resolved CSS lengths.
- `css`: the four lengths in CSS shorthand order: top, right, bottom, left.
- `values`: an object containing the numeric amount for each edge (`top`, `right`, `bottom`, `left`).
- `units`: an object containing the corresponding unit String for each edge.

Theme choices resolve to CSS variable references, such as `var(--foundry-space-sm)`, so theme edits continue to affect the part. Custom lengths include their units. None resolves to `0`. A removed custom theme spacing choice remains marked as missing in the Inspector and resolves to `0` until replaced.

Do not append units to the CSS shorthand or individual CSS edge fields. Declaring the control does not apply margin automatically; the template chooses where to use it.

For calculations or JavaScript, use `values` together with `units`:

```text
{{ control.themeMargin.top }}        → var(--foundry-space-sm)
{{ control.themeMargin.values.top }} → 1
{{ control.themeMargin.units.top }}  → rem
```

This example uses the standard theme's SM spacing. Theme spacing amounts resolve from the current theme in `rem`; custom lengths retain their entered amount and unit (`px`, `rem`, `em`, or `%`). For `auto`, the edge's numeric entry is absent from `values` (direct interpolation is empty), and its unit is an empty String. Check the CSS edge field for `auto` before doing calculations. None and missing theme choices return numeric `0` and an empty unit String. A custom zero retains its chosen unit.

These amounts are not browser-computed pixel measurements: `1rem`, `1px`, and `1%` are different lengths. Theme amounts reflect the theme at rendering time, not later CSS variable overrides. Keep using the CSS fields for styles that should follow CSS variables.

## Example

Declare this item inside the `controls` array in `Info.plist`:

```xml
<dict>
    <key>type</key><string>themeMargin</string>
    <key>id</key><string>themeMargin</string>
    <key>label</key><string>Content margin</string>
    <key>group</key><string>Layout</string>
    <key>default</key><string>sm</string>
    <key>responsive</key><true/>
</dict>
```

Use it in the part's CSS template:

```css
:instance {
    margin: {{ control.themeMargin }};
}
```

Or apply individual edges:

```css
:instance {
    margin-top: {{ control.themeMargin.top }};
    margin-right: {{ control.themeMargin.right }};
    margin-bottom: {{ control.themeMargin.bottom }};
    margin-left: {{ control.themeMargin.left }};
}
```
{% endraw %}
