---
layout: default
title: Theme border control · Foundry Developer
permalink: /theme-border-control.html
---
{% raw %}
<div class="breadcrumbs"><a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a></div>
<p class="eyebrow">Info.plist · controls</p>
<h1>Theme border</h1>
<p class="lede">Four linked width rows and an optional style picker.</p>

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `themeBorder`. Width rows are always visible. The optional Style row appears below them. Does not accept `count`, `options`, `themeValues`, `minimum`, `maximum`, `step`, or `unit`.

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Unique identifier starting with a letter and containing letters, numbers, underscores or hyphens. Examples use `border`.

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Border</span></div>

Shown in the normal Inspector label column beside the all-edges link button. Empty labels also fall back to Border. Fixed width rows are Top, Bottom, Left and Right; the optional additional row is Style.

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

Inspector section containing all rows.

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="required">Required</span></div>

Contains required `width` and optional `style`. No other keys are accepted.

<h3 class="property-heading"><code>default.width</code></h3>
<div class="property-meta"><span class="property-type">String or Dictionary</span><span class="required">Required</span></div>

Accepts `none`, `xs`, `sm`, `md`, `lg`, or `xl`; a custom length dictionary with exactly `value` (finite, nonnegative Number) and `unit` (`px`, `rem`, or `em`); or a dictionary containing all four `top`, `right`, `bottom`, `left` selections. Each edge accepts a token or custom length. Percentages, negative lengths, `auto`, arrays and raw CSS strings are rejected.

Theme tokens use the border-width scale in pixels. None outputs `0`. Identical selections start linked; differing edges start independent. Linking all uses Top; Top–Bottom uses Top; Left–Right uses Left. Linking the second pair promotes to all-linked using Top. Unlinking preserves values. Custom starts with the current theme amount in pixels; returning to theme restores the previous token.

<h3 class="property-heading"><code>default.style</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: solid</span></div>

One of `solid`, `dashed`, `dotted`, `double`, `none`, `hidden`, `groove`, `ridge`, `inset`, or `outset`. Applies to all sides, including when the Style row is hidden. Choosing None preserves widths.

<h3 class="property-heading"><code>showsStyle</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Shows the Style picker below widths. Otherwise the declared style is still returned.

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Enables responsive overrides for widths and the visible Style row. Four widths and link state are stored together; Style has its own indicator. A hidden Style row uses its declared default. Use outputs in a CSS template to generate responsive styles.

<h3 class="property-heading"><code>tooltip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Border</span></div>

Help for the width editor. Buttons retain action-specific help.

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text beneath the width editor.

<h3 class="property-heading"><code>visibleWhen</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Controls visibility of the whole control. See [Conditional visibility](visible-when.html). The border is not a scalar comparison source.

## Return value

Use qualified fields; the whole border is not a CSS shorthand string.

- `width`: four CSS lengths in top, right, bottom, left order.
- `width.top`, `width.right`, `width.bottom`, `width.left`: individual CSS lengths.
- `width.css`: the same width shorthand.
- `width.values.top` (and other edges): numeric amount.
- `width.units.top` (and other edges): corresponding unit.
- `style`: CSS border-style keyword.

Theme widths return CSS variables such as `var(--foundry-border-width-sm)`. Numeric theme amounts use `px`; custom values retain entered units. None and missing tokens return zero and an empty unit. Custom zero retains its unit. Missing tokens remain marked in the editor. Numeric amounts are not browser-computed measurements.

## Example

```xml
<dict>
    <key>type</key><string>themeBorder</string>
    <key>id</key><string>border</string>
    <key>label</key><string>Border</string>
    <key>group</key><string>Border</string>
    <key>showsStyle</key><true/>
    <key>responsive</key><true/>
    <key>default</key>
    <dict>
        <key>width</key><string>sm</string>
        <key>style</key><string>solid</string>
    </dict>
</dict>
```

```css
:instance {
    border-width: {{ control.border.width }};
    border-style: {{ control.border.style }};
}
```

Declaring the control does not apply the border automatically. Use its width and style outputs in the CSS template.
{% endraw %}
