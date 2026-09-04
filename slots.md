---
layout: default
title: Child slots · Foundry Developer
permalink: "/slots.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><a href="info-plist.html">Info.plist</a>
</div>
<p class="eyebrow">Info.plist · slots</p>
<h1>Accept child components</h1>
<p class="lede">Any functional component can contain children. Declare one or more named slots in <code>Info.plist</code>, then place each slot exactly where its children should render.</p>
<h2>Declare a slot</h2>

<div markdown="1">

```xml
<key>slots</key>
<array>
    <dict>
        <key>id</key><string>content</string>
        <key>title</key><string>Content</string>
        <key>accepts</key><array><string>Components</string></array>
        <key>minimum</key><integer>0</integer>
        <key>maximum</key><integer>6</integer>
    </dict>
</array>
```

</div>


<h2>Place it in HTML</h2>

<div markdown="1">

```xml
<section {{ component.attributes }}>
    <header>{{ text="Section title" }}</header>
    <div class="items">
        {{ slot id="content" }}
    </div>
</section>
```

</div>


<h2>Slot fields</h2>
<dl>
<dt>id</dt>
<dd>Stable identifier matching the template’s slot ID.</dd>
<dt>title</dt>
<dd>Name shown in Foundry.</dd>
<dt>accepts</dt>
<dd>Accepted component identifiers or supported categories.</dd>
<dt>minimum</dt>
<dd>Required minimum child count.</dd>
<dt>maximum</dt>
<dd>Optional upper limit. Omit for no limit.</dd>
</dl>
<div class="note">
<strong>Packaging and composition are separate.</strong> A component can both contain child components at runtime and contain nested <code>.foundrypack</code> products inside its bundle.</div>
{% endraw %}
