---
layout: default
title: Build a component · Foundry Developer
permalink: "/quick-start.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a>
<span>›</span>Get started</div>
<p class="eyebrow">Quick start</p>
<h1>Build a component</h1>
<p class="lede">This component has editable text, a padding control, a theme colour control, responsive CSS and room for child components.</p>
<div class="steps">
<section class="step">
<h2>Create the pack</h2>


<div markdown="1">

```text
Callout.foundrydevpack/
└── Contents/
    ├── Info.plist
    └── Resources/
        ├── component.html
        ├── component.css
        └── icon.svg
```

</div>


</section>
<section class="step">
<h2>Declare the component</h2>


<div markdown="1">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>minimumAPIVersion</key><integer>1</integer>
    <key>id</key><string>uk.co.example.callout</string>
    <key>title</key><string>Callout</string>
    <key>version</key><string>1.0.0</string>
    <key>group</key><string>Content</string>
    <key>templates</key>
    <dict>
        <key>html</key><string>component.html</string>
        <key>files</key>
        <array>
            <dict>
                <key>path</key><string>component.css</string>
                <key>scope</key><string>instance</string>
            </dict>
        </array>
    </dict>
    <key>customItems</key>
    <array>
        <dict>
            <key>id</key><string>padding</string>
            <key>labels</key><string>Padding</string>
            <key>group</key><string>Layout</string>
            <key>type</key><string>number</string>
            <key>minimum</key><integer>0</integer>
            <key>maximum</key><integer>80</integer>
            <key>step</key><integer>4</integer>
            <key>units</key><string>px</string>
            <key>default</key><integer>24</integer>
            <key>responsive</key><true/>
        </dict>
        <dict>
            <key>id</key><string>accentColor</string>
            <key>labels</key><string>Accent</string>
            <key>group</key><string>Colour</string>
            <key>type</key><string>color</string>
            <key>themeValues</key><string>accent</string>
            <key>colorMath</key><true/>
            <key>default</key><string>custom</string>
            <key>responsive</key><false/>
        </dict>
    </array>
    <key>slots</key>
    <array>
        <dict>
            <key>id</key><string>content</string>
            <key>title</key><string>Content</string>
            <key>accepts</key><array><string>Components</string></array>
            <key>minimum</key><integer>0</integer>
        </dict>
    </array>
</dict>
</plist>
```

</div>


</section>
<section class="step">
<h2>Own the markup</h2>


<div markdown="1">

```xml
<aside {{ component.attributes }}>
    <h2>{{ text="A useful callout" }}</h2>
    {{ slot id="content" }}
</aside>
```

</div>


<p>
<code>{{ component.attributes }}</code> supplies the component’s stable HTML ID and carries Foundry’s canvas-only editor hooks. Put it on the element representing the component. Use <code>{{ id }}</code> in CSS or other template files when you need to target that same ID.</p>
</section>
<section class="step">
<h2>Own the CSS</h2>


<div markdown="1">

```css
#{{ id }} {
    padding: {{ control.padding }}px;
    border-left: 4px solid {{ control.accentColor }};
    background: {{ control.accentColor | lighten(42) }};
}
```

</div>


<p>Foundry processes this file for every instance and breakpoint. It knows the values; you decide which element and declaration receive them.</p>
</section>
<section class="step">
<h2>Open and validate it</h2>
<p>Open the <code>.foundrydevpack</code> in Foundry, or place it in <code>~/Library/Application Support/Foundry/Packs</code> and reload components. The Callout should appear under Content in the Components panel.</p>
<p>If Foundry rejects the pack, enable the Developer panel in Foundry’s Developer preferences. It reports the exact manifest key, template line, or missing path that needs attention.</p>
</section>
</div>
<h2>Next</h2>
<div class="page-links">
<a class="card" href="templates.html">
<strong>Template files</strong>
<p>HTML, CSS, JavaScript, PHP, scopes and placement.</p>
</a>
<a class="card" href="custom-controls.html">
<strong>Custom controls</strong>
<p>Every inspector control type.</p>
</a>
</div>
{% endraw %}
