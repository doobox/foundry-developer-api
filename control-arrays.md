---
layout: default
title: Control arrays · Foundry Developer
permalink: "/control-arrays.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Shared capability</p>
<h1>Control arrays</h1>
<p class="lede">Display two, three or four controls together while retaining normal bindings, persistence, responsive overrides and undo behaviour.</p>
<h2>Declaration</h2>
<p>Add <code>count</code> directly to the custom-item dictionary. <code>label</code> remains one Inspector-row label. The <code>default</code> array must contain exactly <code>count</code> entries, while the optional <code>subtitle</code> array provides one caption for each member.</p>

<div markdown="1">

```xml
<dict>
    <key>id</key><string>palette</string>
    <key>label</key><string>Palette</string>
    <key>subtitle</key>
    <array>
        <string>Primary</string><string>Secondary</string>
        <string>Accent</string><string>Surface</string>
    </array>
    <key>group</key><string>Appearance</string>
    <key>type</key><string>color</string>
    <key>count</key><integer>4</integer>
    <key>default</key>
    <array>
        <string>#3366CC</string><string>#8A55D7</string>
        <string>#2DA44E</string><string>#F6F8FA</string>
    </array>
    <key>responsive</key><true/>
</dict>
```

</div>

<h2>Layout</h2>
<p>Foundry chooses an appropriate inspector layout for each control type. Compact controls may share one row; slider arrays stack vertically so every slider retains a useful track width. This presentation does not change the stored array or its indexed output.</p>
<h2>Template values</h2>
<p>Read members by zero-based index.</p>

<div markdown="1">

```css
color: {{ control.palette[0] }};
background: {{ control.palette[3] }};
```

</div>

<h2>Conditional visibility</h2>
<p>An <code>enable</code> condition can reference the complete stored array or one member by zero-based index. For example, <code>palette[2]</code> reads the third member. Use <code>containsValue</code> with the unindexed property ID to test exact membership across the complete array.</p>
<p><a href="enable-control.html">See every enable operation and validation rule →</a></p>
<div class="note">
<strong>Counts are validated.</strong> <code>count</code> must be from 2 through 4, the <code>default</code> array must match that count, and <code>subtitle</code> cannot contain more entries than the controls.</div>
{% endraw %}
