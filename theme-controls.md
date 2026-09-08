---
layout: default
title: Theme-aware controls · Foundry Developer
permalink: "/theme-controls.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><a href="custom-controls.html">Custom controls</a><span>›</span>Theme-aware controls</div>
<p class="eyebrow">Custom controls</p>
<h1>Theme-aware controls</h1>
<p class="lede">Any component developer can populate an ordinary <code>select</code> control with compatible values from the active project theme. The component keeps ownership of its property IDs and markup; Foundry supplies the choices and resolves the selected value for the template.</p>
<h2>One custom-control model</h2>
<p>Theme awareness does not introduce another plist collection or API category. Add a named <code>themeValues</code> source to a <code>select</code>, give the property an ID, and consume its resolved value through the usual template macro.</p>


<div markdown="1">

```xml
<dict>
    <key>id</key><string>gap</string>
    <key>labels</key><string>Gap</string>
    <key>group</key><string>Layout</string>
    <key>type</key><string>select</string>
    <key>themeValues</key><string>spacing</string>
    <key>allowsCustom</key><true/>
    <key>default</key><string>md</string>
    <key>responsive</key><true/>
</dict>
```

</div>


<p>The select sources are <code>fontFamilies</code>, <code>fontSizes</code> and <code>spacing</code>. Colours use the normal <code>color</code> control documented below. Required theme values appear first, followed by a divider and any values the author added to the theme. Developer-declared <code>options</code> follow in another section without duplicates.</p>
<h2>Font size and paired line height</h2>
<p>Font size is not a separate control type. Use <code>select</code> with <code>themeValues</code> set to <code>fontSizes</code> and <code>allowsCustom</code> enabled. Theme selections resolve both the configured size and its paired line height. Custom reveals editable Size and Line Height fields.</p>

<div markdown="1">

```xml
<key>type</key><string>select</string>
<key>themeValues</key><string>fontSizes</string>
<key>allowsCustom</key><true/>
<key>default</key><string>base</string>
```

</div>



<div markdown="1">

```css
font-size: {{ control.textSize }};
line-height: {{ control.textSize.lineHeight }};
```

</div>


<h2>Font families</h2>
<p>A <code>fontFamilies</code> select lists the semantic font roles and additional fonts configured in the Theme Editor. Its choices show only their names. It does not support <code>allowsCustom</code>; project authors should add reusable fonts to the theme instead.</p>

<div markdown="1">

```xml
<key>type</key><string>select</string>
<key>themeValues</key><string>fontFamilies</string>
<key>default</key><string>body</string>
```

</div>

<h2>Offering a custom branch</h2>
<p>For supported theme-backed selects, <code>allowsCustom</code> places <code>Custom</code> at the bottom of the list after a divider. A spacing-backed select stores and returns the literal value <code>custom</code>, so it can enable an ordinary companion control.</p>

<div markdown="1">

```xml
<key>enable</key>
<dict>
    <key>id</key><string>gap</string>
    <key>value</key><string>custom</string>
</dict>
```

</div>


<h2>Theme colour control</h2>
<p>Use <code>themeColor</code> when the author should choose from the active theme’s colour roles. Its <code>default</code> is the initially selected role.</p>

<div markdown="1">

```xml
<key>type</key><string>themeColor</string>
<key>default</key><string>surface</string>
```

</div>

<p>Add <code>allowsCustom</code> when the author may choose a literal colour as well. Use the separate <code>color</code> control when only a literal colour picker is needed.</p>
<div class="note">
<strong>One ID means one stored value.</strong> Foundry stores every part of a smart control together under the declared property ID. A colour keeps its source, custom colour, adjustment and opacity together; a font-size-backed select keeps its source, custom size and custom line height together; spacing keeps all four sources and custom values together. Foundry never manufactures hidden sibling IDs, so every identifier remains under the component developer’s control.</div>


<div markdown="1">

```xml
<dict>
    <key>id</key><string>alignment</string>
    <key>labels</key><string>Alignment</string>
    <key>group</key><string>Typography</string>
    <key>type</key><string>textAlignment</string>
    <key>default</key><string>start</string>
    <key>responsive</key><true/>
</dict>
```

</div>




<div markdown="1">

```css
#{{ id }} {
    text-align: {{ control.alignment }};
}
```

</div>


<p>For <code>textAlignment</code>, Foundry provides a segmented control with the correct alignment symbols, portable choices and validated CSS output. The developer does not need to rebuild that option list for every component.</p>
<h2>Storage and output</h2>
<dl>
<dt>Stable storage</dt>
<dd>The project stores the selected portable key, such as <code>accent</code>, <code>heading</code>, <code>base</code> or <code>md</code>. Changing the theme therefore updates existing components.</dd>
<dt>Resolved output</dt>
<dd>The component template receives the current CSS-safe value through <code>{{ control.&lt;id&gt; }}</code>, not the portable key.</dd>
<dt>Single value</dt>
<dd>A select that requests <code>themeValues</code> cannot use <code>count</code>. Use an explicitly designed multi-value control when several theme-backed values belong together.</dd>
<dt>Responsive support</dt>
<dd>Breakpoint overrides store the same portable keys and resolve against the active theme.</dd>
</dl>
<h2>Theme-aware custom controls</h2>
<div class="card-grid">
<a class="card" href="theme-colour-control.html"><strong>Theme colour</strong><p>Theme colours with optional custom choice, colour math and opacity.</p></a><a class="card" href="select-control.html#themevalues"><strong>Font family</strong><p>A select using the project’s semantic and custom font families.</p></a><a class="card" href="select-control.html#themevalues"><strong>Font size</strong><p>A select using the project type scale with custom Size and Line Height overrides.</p></a><a class="card" href="padding-control.html"><strong>Padding</strong><p>Theme or custom space inside each edge.</p></a><a class="card" href="margin-control.html"><strong>Margin</strong><p>Theme, custom, or automatic space outside each edge.</p></a><a class="card" href="shadow-control.html"><strong>Shadow</strong><p>Theme shadows with optional editable custom layers.</p></a><a class="card" href="text-alignment.html"><strong>Text alignment</strong><p>A related specialised custom control with logical CSS output.</p></a>
</div>
<h2>Good candidates</h2>
<dl>
<dt>Typography</dt>
<dd>Font weight, line height, letter spacing, text decoration, text transform and whitespace.</dd>
<dt>Layout</dt>
<dd>Display, flex/grid alignment, gap, sizing, overflow and aspect ratio.</dd>
<dt>Appearance</dt>
<dd>Border style, corner radius, shadow, opacity and blend mode.</dd>
<dt>Media</dt>
<dd>Object fit, object position, loading behaviour and aspect ratio.</dd>
<dt>Links and behaviour</dt>
<dd>Link target, relationship, cursor and visibility.</dd>
<dt>Accessibility</dt>
<dd>Landmark role, labels and appropriate ARIA choices where a component genuinely needs them.</dd>
</dl>
<div class="note">
<strong>Smart does not mean generated CSS.</strong> Foundry provides the value and editor; the component’s own templates still determine the target element and declaration.</div>
{% endraw %}
