---
layout: default
title: Colour control · Foundry Developer
permalink: "/colour.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Theme-aware custom control</p>
<h1>Colour</h1>
<p class="lede">A colour control can offer custom colours, the project’s theme colours, optional lighter/darker adjustment and optional opacity. It remains a normal <code>customItems</code> control.</p>

<h2>Default behaviour</h2>
<p>With only <code>type = color</code>, the author gets a custom colour picker. The initial selection is <code>custom</code>. Theme values, colour math and opacity are not shown unless the developer enables them.</p>


<div markdown="1">

```xml
<key>type</key><string>color</string>
<key>default</key><string>custom</string>
```

</div>



<h2>Control options</h2>
<section class="reference-entry"><h3>themeValues</h3>
<div class="api-meta">
<span class="pill">String</span><span class="pill">Optional</span><span class="pill">Default: omitted</span>
</div>
<p>Use <code>background</code>, <code>surface</code>, <code>text</code>, <code>accent</code> or <code>links</code> to add the theme choices and initially select that role. The custom picker stays hidden until Custom is selected.</p></section>
<section class="reference-entry"><h3>colorMath</h3>
<div class="api-meta">
<span class="pill">Boolean</span><span class="pill">Optional</span><span class="pill">Default: false</span>
</div>
<p>Adds the lighter/darker adjustment control. The adjustment is applied to either a selected theme colour or a custom colour.</p></section>
<section class="reference-entry"><h3>opacity</h3>
<div class="api-meta">
<span class="pill">Boolean</span><span class="pill">Optional</span><span class="pill">Default: false</span>
</div>
<p>Allows alpha in the native picker for a custom colour. It never adds a separate opacity control and does not alter colours selected from the theme.</p></section>

<h2>Defaults</h2>
<p>The top-level <code>default</code> remains <code>custom</code>, matching the normal colour control. When <code>themeValues</code> is present, its role string becomes the initial selection and keeps the underlying custom picker hidden.</p>
<p><code>customColor</code> supplies the initial literal colour used by the custom choice and defaults to <code>#000000</code>.</p>

<h2>Full example</h2>

<div markdown="1">

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>textColor</string>
        <key>labels</key><string>Text colour</string>
        <key>group</key><string>Typography</string>
    <key>type</key><string>color</string>
            <key>themeValues</key><string>text</string>
            <key>colorMath</key><true/>
            <key>opacity</key><true/>
            <key>customColor</key><string>#202020</string>
        <key>default</key><string>custom</string>
        <key>responsive</key><false/>
    </dict>
</array>
```

</div>




<div markdown="1">

```css
#{{ id }} {
    color: {{ control.textColor }};
}
```

</div>


<h2>Colour math in templates</h2>
<p>When <code>colorMath</code> is enabled, the resolved colour can also be passed through readable lighter or darker operations.</p>

<div markdown="1">

```text
{{ control.textColor }}
{{ control.textColor | lighten(15) }}
{{ control.textColor | darken(12) }}
```

</div>

<dl>
<dt>lighten(0…100)</dt>
<dd>Mixes the resolved colour towards white by a percentage.</dd>
<dt>darken(0…100)</dt>
<dd>Mixes the resolved colour towards black by a percentage.</dd>
</dl>
<p>When <code>opacity</code> is enabled, the author’s opacity selection is already included in <code>{{ control.textColor }}</code>.</p>
<div class="note">
<strong>One atomic property.</strong> Foundry stores the source, custom colour, adjustment and opacity together under the declared ID. No generated sibling property names are reserved or exposed.</div>
{% endraw %}
