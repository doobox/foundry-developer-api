---
layout: default
title: Theme colour control · Foundry Developer
permalink: "/theme-colour-control.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Info.plist · controls</p>
<h1>Theme colour</h1>
<p class="lede">A palette and shade selector that resolves the selected colour for templates.</p>

## Quick example

Add this dictionary to your part's `controls` array:

```xml
<dict>
    <key>type</key><string>themeColor</string>
    <key>id</key><string>textColour</string>
    <key>label</key><string>Colour</string>
    <key>defaults</key>
    <dict>
        <key>base</key>
        <dict>
            <key>palette</key><string>text</string>
        </dict>
    </dict>
</dict>
```

Use its resolved CSS value in your stylesheet:

```css
:instance {
    color: {{ control.textColour }};
}
```

## Choosing colours

Authors can choose from the project's custom, theme and standard colour palettes using a searchable menu. The ribbon selects a shade from 1–11; Black and White each have one colour.

Palettes resolve by identity, not display name. Custom palettes never override theme or standard palettes, even when their names match. Duplicating a palette creates an independent custom colour with a unique name. Theme palette names remain fixed; their shades are editable in user-created and imported themes. Built-in themes and standard palettes are read-only.

A part stores one palette identity and separate fixed light and dark shade numbers. Choosing a palette captures its two current defaults. Changing either palette default later does not move existing part selections. The canvas sun/moon buttons select which appearance the Inspector edits, independently of macOS appearance. The Inspector star refers to that appearance's default; clicking it selects the default without creating a live link. Edits to the selected swatch colour still update the part.

Use the separate `color` control when only a literal colour picker is needed.

## Basic properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Theme colour. Always use `themeColor`. This control does not support `count`.

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

<h3 class="property-heading"><code>tooltip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text explaining what the control changes.

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control.

<h3 class="property-heading"><code>visibleWhen</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the declared condition.

<h3 class="property-heading"><code>defaults</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="required">Required</span></div>

A dictionary containing the required `base` value and optional breakpoint values: `small`, `medium`, `large`, `extraLarge`, and `doubleExtraLarge`. Breakpoint entries require `responsive: true`. Every entry uses the complete value format described below; omitted breakpoints inherit the preceding enabled value. Disabled project breakpoints are skipped without discarding their declarations. User overrides take precedence at the same breakpoint. Resetting an override restores the default cascade.

<h3 class="property-heading"><code>defaults.base</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="required">Required</span></div>

Groups the initial palette and optional appearance-specific shades. The only accepted keys are `palette`, `lightShade`, and `darkShade`. A string or array is not accepted; shade keys belong inside this dictionary, not alongside `defaults.base`.

<h3 class="property-heading"><code>defaults.base.palette</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The initially selected palette. Theme roles are: `page`, `background`, `surface`, `text`, `muted-text`, `accent`, or `links`. New parts capture that palette's light and dark defaults unless the corresponding shade key is supplied. `page` also supplies the page's outer background; `background` is available for part backgrounds. `custom` is valid only when `allowsCustom` is true, requires the control's `customColor`, and prohibits both shade keys. Standard palettes are also accepted using these stable IDs: `standard.black`, `standard.white`, `standard.red`, `standard.orange`, `standard.amber`, `standard.yellow`, `standard.lime`, `standard.green`, `standard.emerald`, `standard.teal`, `standard.cyan`, `standard.sky`, `standard.blue`, `standard.indigo`, `standard.violet`, `standard.purple`, `standard.fuchsia`, `standard.pink`, `standard.rose`, `standard.slate`, `standard.grey`, `standard.zinc`, `standard.neutral`, and `standard.stone`.

Use the exact ID, not the display name. Project-specific custom palette IDs are not accepted as portable defaults. Standard palettes do not require `allowsCustom`. Black and White have only one colour, so shade numbers do not change their rendered colour.

For example, start with Lime:

```xml
<key>defaults</key><dict><key>base</key><dict>
    <key>palette</key><string>standard.lime</string>
    <key>lightShade</key><integer>8</integer>
    <key>darkShade</key><integer>3</integer>
</dict></dict>
```

<h3 class="property-heading"><code>defaults.base.lightShade</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: palette's light default shade</span></div>

The initial light-appearance shade number, from `1` to `11` inclusive. Omit it to capture the palette's light default when the part is created. The stored shade number does not follow subsequent default changes.

Available only inside a `themeColor` default dictionary with a theme-role or standard `palette`; it cannot be combined with `palette: custom`. This setting controls initial creation, not subsequent palette choices in the Inspector.

```xml
<key>defaults</key><dict><key>base</key><dict>
    <key>palette</key><string>accent</string>
    <key>lightShade</key><integer>8</integer>
    <key>darkShade</key><integer>3</integer>
</dict></dict>
```

<h3 class="property-heading"><code>defaults.base.darkShade</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: palette's dark default shade</span></div>

The initial dark-appearance shade number, from `1` to `11` inclusive. Omit it to capture the palette's dark default when the part is created. It uses the same palette and ribbon as `lightShade`, but stores an independent fixed shade number. Available only inside a `themeColor` default dictionary with a theme-role or standard `palette`; it cannot be combined with `palette: custom`. It affects initial creation, not subsequent palette choices in the Inspector.

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Allows a different selection at each responsive breakpoint. Each breakpoint value contains one palette choice and its light and dark shade selections.

## Theme colour options

<h3 class="property-heading"><code>allowsCustom</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Adds a Custom Colour choice and literal colour picker. This permits `defaults.base.palette` to be `custom`, which also requires `customColor`. It does not control access to the project's custom palettes; those are available alongside theme and standard palettes.

<h3 class="property-heading"><code>customColor</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: #000000</span></div>

The initial literal colour for both appearances. It must be `#RRGGBB`, requires `allowsCustom` to be true, and is required when `defaults.base.palette` is `custom`. This key remains at control level, outside the `defaults.base` dictionary. Authors can subsequently edit separate light and dark literal colours using the canvas appearance buttons.

<h3 class="property-heading"><code>opacity</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Allows alpha for the literal Custom Colour choice. It does not add an opacity adjustment to palette selections.

## Return value

Returns a CSS colour, not a palette ID or shade number. The canvas resolves the appearance being edited. Light-only and dark-only sites export the corresponding colour. Sites supporting both export a CSS `light-dark(light, dark)` colour, following the browser's system preference unless explicitly overridden. Custom Colour selections include their appearance-specific opacity when enabled. Use the result directly in CSS rather than treating it as a hexadecimal string.

For sites supporting both appearances, a part can call `window.foundryAppearance.set('light')`, `.set('dark')`, or `.set('system')` in its browser script. The visitor's choice is remembered for that site. This interface is not installed in the editing canvas or on single-appearance sites.

## Complete example

```xml
<dict>
    <key>type</key><string>themeColor</string>
    <key>id</key><string>backgroundColor</string>
    <key>label</key><string>Background</string>
    <key>group</key><string>Appearance</string>
    <key>allowsCustom</key><true/>
    <key>customColor</key><string>#3366CC</string>
    <key>opacity</key><true/>
    <key>defaults</key><dict><key>base</key><dict>
        <key>palette</key><string>accent</string>
    </dict></dict>
</dict>
```

```css
background-color: {{ control.backgroundColor }};
```

{% endraw %}
