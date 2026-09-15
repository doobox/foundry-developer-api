---
layout: default
title: Theme font control · Foundry Developer
permalink: "/theme-font-control.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Info.plist · controls</p>
<h1>Theme font</h1>
<p class="lede">One configurable font control with coordinated family, weight and style rows. Font browsing and previews remain in the Theme Editor.</p>


## Quick example

Add this dictionary to your part's `controls` array:

```xml
<dict>
    <key>type</key><string>themeFont</string>
    <key>id</key><string>font</string>
    <key>defaults</key>
    <dict>
        <key>base</key><string>body</string>
    </dict>
</dict>
```

Use it in the part's CSS template:

```css
:instance {
    font-family: {{ control.font.family }};
}
```

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `themeFont`. This is not a `select` extension. It does not accept `count`, `options`, `themeValues` or `allowsCustom`. Authors manage custom fonts in the Theme Editor, not inside this control.

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Unique control identifier, starting with a letter and containing letters, numbers, underscores or hyphens. Templates read it as `{{ control.yourID }}`.

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text in the family row’s left-hand label column. Enabled companion rows are labelled Weight and Style.

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section containing the control.

<h3 class="property-heading"><code>defaults</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="required">Required</span></div>

A dictionary containing the required `base` value and optional breakpoint values: `small`, `medium`, `large`, `extraLarge`, and `doubleExtraLarge`. Breakpoint entries require `responsive: true`. Every entry uses the complete value format described below; omitted breakpoints inherit the preceding enabled value. Disabled project breakpoints are skipped without discarding their declarations. User overrides take precedence at the same breakpoint. Resetting an override restores the default cascade. When `showsFamily` is false, the family is fixed: every entry must use the same family as `base`; enabled Weight and Style may still vary.

<h3 class="property-heading"><code>defaults.base</code></h3>
<div class="property-meta"><span class="property-type">Dictionary or String</span><span class="required">Required</span></div>

A dictionary containing required `family` (`body`, `heading` or `monospaced`), optional `weight` (an integer from 1 to 1000, default 400 when enabled), and optional `style` (`normal` or `italic`, default normal when enabled). Explicit weight/style defaults require their corresponding capability to be enabled. Unknown dictionary keys are rejected.

A role string such as `heading` is shorthand for a dictionary containing only `family`. Arbitrary family names and custom font IDs are not valid manifest defaults. Authors choose project custom fonts in the Inspector; selections retain the role or custom identity.

<h3 class="property-heading"><code>showsFamily</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: true</span></div>

Shows the native family picker, grouped into Theme Fonts and Custom Fonts. Set false to fix the family to the declared default while exposing weight and/or style. A hidden family does not receive responsive overrides, but is still returned in the structured value. At least one of these three capabilities must be enabled.

<h3 class="property-heading"><code>showsWeight</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Adds a Weight row for the selected family. Static faces use a menu; variable faces use a numeric weight field. When false, the return value has no weight field and Foundry does not impose a weight.

<h3 class="property-heading"><code>showsStyle</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Adds a Style row offering normal/italic as supported by the selected family and weight. When false, the return value has no style field and Foundry does not impose a style.

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Allows each exposed field to override independently at responsive breakpoints. Changing only weight does not pin the inherited family or style. Each row has its own responsive indicator. Use the fields in the part CSS template for responsive styling. All fields are shared between light and dark appearance.

<h3 class="property-heading"><code>tooltip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text explaining the control.

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text below the picker.

<h3 class="property-heading"><code>visibleWhen</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows the control when another control meets the declared condition. See [Conditional visibility](visible-when.html).

## Return value

The template receives one structured value. Read `{{ control.font.family }}` for the CSS font-family variable, `{{ control.font.weight }}` for the numeric weight when enabled, and `{{ control.font.style }}` for the style keyword when enabled. Do not insert the entire object directly into CSS. Only write weight/style declarations when those capabilities are enabled.

A missing family shows a warning and its family field resolves to `inherit`. Unavailable saved weight/style selections are retained with warnings; the browser may substitute or synthesize a face. Size, line height and letter spacing remain separate concerns.

## Available faces

Uploaded font files supply their face metadata. Google fonts configured in the Theme Editor supply their saved included faces and weight ranges, which also drive the Google stylesheet request. Both sources coordinate the Weight and Style rows automatically—no control-ID linking is needed.

Existing Google entries without saved metadata offer **Configure included styles…** in the Theme Editor. Until configured, those entries and system fonts offer standard CSS choices with availability marked unverified in help.

Disabling an included face in the Theme Editor does not rewrite parts. If a selected style or weight disappears entirely, the control offers the remaining family choices so authors can recover.

## Example

```xml
<dict>
    <key>type</key><string>themeFont</string>
    <key>id</key><string>font</string>
    <key>label</key><string>Font</string>
    <key>group</key><string>Typography</string>
    <key>showsWeight</key><true/>
    <key>showsStyle</key><true/>
    <key>defaults</key><dict><key>base</key><dict>
        <key>family</key><string>heading</string>
        <key>weight</key><integer>700</integer>
        <key>style</key><string>normal</string>
    </dict></dict>
    <key>responsive</key><true/>
</dict>
```

In the part CSS template:

```css
.title {
    font-family: {{ control.font.family }};
    font-weight: {{ control.font.weight }};
    font-style: {{ control.font.style }};
}
```

{% endraw %}
