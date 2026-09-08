---
layout: default
title: Custom controls · Foundry Developer
permalink: "/custom-controls.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Custom controls</h1>
<p class="lede">Each dictionary in <code>customItems</code> creates part of the component Inspector. Declare what the author can change, then read the resulting value from HTML, CSS, JavaScript, or PHP.</p>
<h2>Declare one control</h2>
<p>Every dictionary in <code>customItems</code> is one complete control declaration. Value-producing controls have a stable <code>id</code>, an author-facing <code>labels</code> value, a <code>type</code>, a matching <code>default</code>, and explicit responsive behaviour. Use <code>group</code> to choose the Inspector section, or omit it to use <code>Settings</code>.</p>

<div markdown="1">

```xml
<key>customItems</key>
<array>
<dict>
    <key>id</key><string>heading</string>
    <key>labels</key><string>Heading</string>
    <key>group</key><string>Content</string>
    <key>type</key><string>text</string>
    <key>default</key><string>Welcome</string>
    <key>responsive</key><false/>
</dict>
</array>
```

</div>

<p>Read the saved value with <code>{{ control.heading }}</code>. Each control-type page below lists the exact required keys, accepted options, stored value, and a working declaration.</p>
<h2>Control types</h2>
<div class="card-grid">
<a class="card" href="text-control.html"><strong>text</strong><p>Single-line text.</p></a><a class="card" href="text-area-control.html"><strong>textArea</strong><p>Multi-line text.</p></a><a class="card" href="link-control.html"><strong>link</strong><p>A structured internal or external link.</p></a><a class="card" href="number-control.html"><strong>number</strong><p>Numeric input with bounds and units.</p></a><a class="card" href="padding-control.html"><strong>padding</strong><p>Theme-aware space inside four edges.</p></a><a class="card" href="margin-control.html"><strong>margin</strong><p>Theme-aware space outside four edges.</p></a><a class="card" href="slider-control.html"><strong>slider</strong><p>Numeric slider with optional ticks.</p></a><a class="card" href="date-control.html"><strong>date</strong><p>An ISO-8601 date.</p></a><a class="card" href="colour.html"><strong>color</strong><p>A literal hexadecimal colour picker.</p></a><a class="card" href="theme-colour-control.html"><strong>themeColor</strong><p>A theme colour with an optional custom choice.</p></a><a class="card" href="icon-control.html"><strong>icon</strong><p>A searchable picker for Foundry’s built-in icon library.</p></a><a class="card" href="select-control.html"><strong>select</strong><p>A single choice from declared or theme values, with optional custom overrides.</p></a><a class="card" href="shadow-control.html"><strong>shadow</strong><p>A theme shadow picker with optional editable custom layers.</p></a><a class="card" href="toggle-control.html"><strong>toggle</strong><p>A Boolean switch.</p></a><a class="card" href="details-control.html"><strong>details</strong><p>A compact Boolean details button.</p></a><a class="card" href="button-control.html"><strong>button</strong><p>A persistent action button.</p></a><a class="card" href="math-control.html"><strong>math</strong><p>A derived numeric value.</p></a><a class="card" href="text-alignment.html"><strong>textAlignment</strong><p>Logical CSS alignment.</p></a><a class="card" href="info-control.html"><strong>info</strong><p>Presentation-only help text.</p></a><a class="card" href="divider-control.html"><strong>divider</strong><p>Presentation-only separator.</p></a>
</div>
<h2>Shared capabilities</h2>
<div class="page-links">
<a class="card" href="control-arrays.html"><strong>Control arrays</strong><p>Place two to four controls in one inspector row, with optional subtitles.</p></a><a class="card" href="enable-control.html"><strong>Conditional visibility</strong><p>Use <code>enable</code> to show a control only when another control’s value satisfies a condition.</p></a><a class="card" href="template-values.html"><strong>Template values</strong><p>Use property values and instance helpers in rendered files.</p></a><a class="card" href="theme-controls.html"><strong>Theme values</strong><p>Allow supported controls to follow the active project theme.</p></a>
</div>
{% endraw %}
