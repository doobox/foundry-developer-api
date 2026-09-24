---
layout: default
title: Pack contents · Foundry Developer
permalink: "/nested-packs.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Package</p>
<h1>Pack contents</h1>
<p class="lede">Ship one part or a coordinated library of parts, templates and frameworks in the same outer pack.</p>

<div markdown="1">

```text
Acme.foundrypack/
├── manifest.json
├── Parts/
│   ├── Hero/
│   │   ├── manifest.json
│   │   └── Resources/
│   ├── Navigation/
│   │   ├── manifest.json
│   │   └── Resources/
│   └── MenuItem/
│       ├── manifest.json
│       └── Resources/
├── Templates/
│   └── LandingPage/
│       ├── manifest.json
│       └── Resources/
├── Frameworks/
│   └── AcmeBrand/
│       ├── manifest.json
│       └── Resources/
└── Assets/
    └── AcmeStockPhotos/
        ├── manifest.json        (optional — licence and title)
        ├── hero.jpg
        └── badges/
```

</div>

<h2>Flat typed collections</h2>
<p>Every item is a direct child of its type directory. Relationships between parts are expressed through part identifiers—for example with Child picker <code>accepts</code>, <code>pickerItems</code>, <code>initial</code>, and <code>allowedParents</code>—not by nesting one part directory inside another.</p>

<h2>Installation behaviour</h2>
<p>Foundry validates the outer manifest and every typed item before installing a release pack. It copies the complete outer pack into the Foundry library without flattening its contents. Development packs are loaded and watched in place.</p>

<h2>No collection manifest</h2>
<p>The former <code>collection = true</code> manifest and recursively nested <code>.foundrypack</code> bundles are not supported. The outer format-version-2 manifest always identifies the distributable pack; individual part manifests live only beneath <code>Parts</code>.</p>
{% endraw %}
