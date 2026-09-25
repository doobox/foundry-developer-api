---
layout: default
title: Control arrays · Foundry Developer
permalink: "/developer/control-arrays.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Shared capability</p>
<h1>Control arrays</h1>
<p class="lede">Display two, three or four controls together while retaining normal bindings, persistence, responsive overrides and undo behaviour.</p>
<h2>Declaration</h2>
<p>Add <code>count</code> directly to the custom-item dictionary. <code>label</code> remains one Inspector-row label. The <code>defaults.base</code> array must contain exactly <code>count</code> entries, while the optional <code>subtitle</code> array provides one caption for each member.</p>

<div markdown="1">

```json
{
    "id" : "palette",
    "label" : "Palette",
    "subtitle" : [
        "Primary",
        "Secondary",
        "Accent",
        "Surface"
    ],
    "type" : "color",
    "count" : 4,
    "defaults" : {
        "base" : [
            "#3366CC",
            "#8A55D7",
            "#2DA44E",
            "#F6F8FA"
        ]
    },
    "responsive" : true
}
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
<p>A <code>visibleWhen</code> condition can reference the complete stored array or one member by zero-based index. For example, <code>palette[2]</code> reads the third member. Use <code>containsValue</code> with the unindexed control ID to test exact membership across the complete array.</p>
<p><a href="visible-when.html">See every visibility operation and validation rule →</a></p>
<div class="note">
<strong>Counts are validated.</strong> <code>count</code> must be from 2 through 4, the <code>defaults.base</code> array must match that count, and <code>subtitle</code> cannot contain more entries than the controls.</div>
{% endraw %}
