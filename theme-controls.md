---
layout: default
title: Theme-aware controls · Foundry Developer
permalink: "/theme-controls.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><a href="custom-controls.html">Custom controls</a><span>›</span>Theme-aware controls</div>

# Theme-aware controls

Theme-aware editing uses dedicated custom controls in the ordinary `controls` array. Each control owns its supported choices and output contract; Select offers only explicitly declared options.

## Fonts

Use [Theme font](theme-font-control.html) to select a semantic or custom font family, with optional weight and style editors. Templates read the enabled fields from the control.

```xml
<dict>
    <key>type</key><string>themeFont</string>
    <key>id</key><string>font</string>
    <key>label</key><string>Font</string>
    <key>defaults</key><dict><key>base</key><string>body</string></dict>
    <key>showsWeight</key><true/>
    <key>showsStyle</key><true/>
</dict>
```

```css
font-family: {{ control.font.family }};
font-weight: {{ control.font.weight }};
font-style: {{ control.font.style }};
```

## Colours and shadows

[Theme colour](theme-colour-control.html) selects a palette with light and dark shades and optional literal colour editing. [Shadow](shadow-control.html) selects a theme shadow with optional custom layers. Their individual pages define defaults, capabilities and template output.

Use [Color](colour.html) for literal colour editing without theme palettes.

## Template ownership

Foundry resolves theme selections against the active project theme. The part's own templates still decide which element and CSS declaration consume the result. A control does not automatically style a part.

There is currently no Select extension for theme font sizes or spacing. Use explicit options for literal choices; do not declare a theme source on Select.

{% endraw %}
