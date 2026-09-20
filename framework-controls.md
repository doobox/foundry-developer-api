---
layout: default
title: Framework-aware controls · Foundry Developer
permalink: "/framework-controls.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}

# Framework-aware controls

Framework-aware editing uses dedicated custom controls in the ordinary `controls` array. Each control owns its supported choices and output contract; Select offers only explicitly declared options.

## Fonts

Use [Framework font](framework-font-control.html) to select a semantic or custom font family, with optional weight and style editors. Templates read the enabled fields from the control.

```xml
<dict>
    <key>type</key><string>frameworkFont</string>
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

[Framework colour](framework-colour-control.html) selects a palette with light and dark shades and optional literal colour editing. [Shadow](shadow-control.html) selects a framework shadow with optional custom layers. Their individual pages define defaults, capabilities and template output.

Use [Color](colour.html) for literal colour editing without framework palettes.

## Template ownership

Foundry resolves framework selections against the active project framework. The part's own templates still decide which element and CSS declaration consume the result. A control does not automatically style a part.

There is currently no Select extension for framework font sizes or spacing. Use explicit options for literal choices; do not declare a framework source on Select.

{% endraw %}
