---
layout: default
title: Collections and nested packs · Foundry Developer
permalink: "/nested-packs.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a>
<span>›</span>Packages</div>
<p class="eyebrow">Package</p>
<h1>Collections and nested packs</h1>
<p class="lede">Ship one component, a product containing many components, or functional packs nested to any depth. The same rules apply to built-ins and third-party packs.</p>


<div markdown="1">

```text
Acme.foundrypack/
└── Contents/
    ├── Info.plist                    collection = true
    └── Resources/
        ├── Hero.foundrypack/         collection omitted
        └── Navigation.foundrypack/   collection omitted
            └── Contents/
                └── Resources/
                    └── MenuItem.foundrypack/
```

</div>


<h2>Functional outer packs</h2>
<p>The top-level pack does not have to be a collection. With <code>collection</code> omitted or set to <code>false</code>, it is a component that can render its own HTML while still containing more packs under <code>Contents/Resources</code>.</p>
<h2>Installation behaviour</h2>
<p>Foundry installs the selected outer bundle once. It recursively discovers valid packs without moving, renaming or flattening any child. Relative resources therefore remain stable.</p>
<h2>Collection Info.plist</h2>


<div markdown="1">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
    <key>collection</key><true/>
</dict>
</plist>
```

</div>


<div class="callout">
<strong>This is the complete collection manifest.</strong> Set <code>collection</code> to <code>true</code> only when the parent pack itself has no component behaviour. Nesting does not require the key.</div>
{% endraw %}
