---
layout: default
title: Font family · Foundry Developer
permalink: "/font-family.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Theme-aware custom control</p>
<h1>Font family</h1>
<p class="lede">A <code>fontFamily</code> custom item lets the author choose from the project theme’s font roles and theme-defined fonts. Authors add or configure fonts in the Theme Editor, not in a component inspector.</p>
<h2>Example</h2>

<div markdown="1">

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>typeface</string>
        <key>labels</key><string>Typeface</string>
        <key>group</key><string>Typography</string>
    <key>type</key><string>fontFamily</string>
        <key>default</key><string>body</string>
        <key>responsive</key><true/>
    </dict>
</array>
```

</div>



<div markdown="1">

```css
#{{ id }} { font-family: {{ control.typeface }}; }
```

</div>


<h2>Theme choices</h2>
<dl>
<dt>body</dt>
<dd>The active theme’s body family. This is the recommended default.</dd>
<dt>heading</dt>
<dd>The active theme’s heading family.</dd>
<dt>monospaced</dt>
<dd>The active theme’s monospaced family.</dd>
<dt>Theme-defined fonts</dt>
<dd>Any additional font added in the project’s Theme Editor.</dd>
</dl>
<p>The manifest default must be <code>body</code>, <code>heading</code> or <code>monospaced</code>. The stored semantic selection stays live when the theme changes; the template receives the resolved CSS value. There is no component-level Custom option or companion custom-value property.</p>
{% endraw %}
