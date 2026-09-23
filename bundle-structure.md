---
layout: default
title: Pack structure · Foundry Developer
permalink: "/bundle-structure.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Packages</p>
<h1>Pack structure</h1>
<p class="lede">A Foundry pack is one outer package containing typed directories for parts, templates and frameworks. Items inside those directories are ordinary folders, not nested packages.</p>

<div markdown="1">

```text
Example.foundrypack/
├── Info.plist
├── Parts/
│   └── uk.co.example.callout/
│       ├── Info.plist
│       └── Resources/
│           ├── part.html
│           ├── part.css
│           └── icon.svg
├── Templates/
│   └── 7B6E…/
│       ├── Info.plist
│       └── Resources/
└── Frameworks/
    └── Brand/
        ├── Info.plist
        └── Resources/
```

</div>

<h2>Outer Info.plist</h2>
<p>The root manifest identifies and versions the complete pack. Its required keys are <code>formatVersion</code> (currently <code>2</code>), <code>id</code>, and the pack metadata used for installation and updates. Part controls and templates do not belong in this manifest.</p>

<div markdown="1">

```xml
<key>formatVersion</key><integer>2</integer>
<key>id</key><string>uk.co.example.components</string>
<key>title</key><string>Example Components</string>
<key>version</key><string>1.0.0</string>
<key>minimumAPIVersion</key><integer>1</integer>
```

</div>

<h2>Typed directories</h2>
<dl>
<dt>Parts</dt>
<dd>Each direct child is one part. Its <code>Info.plist</code> declares the part API, and paths declared by that manifest are relative to its sibling <code>Resources</code> directory.</dd>
<dt>Templates</dt>
<dd>Reusable page-content templates saved by Foundry. Each template owns its manifest, serialized part tree, preview and embedded assets.</dd>
<dt>Frameworks</dt>
<dd>Reusable design frameworks, including framework metadata, <code>framework.json</code>, preview artwork and bundled font assets.</dd>
<dt>Resources</dt>
<dd>Optional resources shared by the pack as a whole. Item-specific files remain in the item's own <code>Resources</code> directory.</dd>
</dl>
<p>The parent directory determines an item's type. Item folder names are storage names and do not replace the stable identifier in the item's manifest.</p>
<div class="callout warning"><strong>Only the outer directory uses a Foundry pack extension.</strong> Do not add <code>.foundrypack</code>, <code>.foundrydevpack</code>, <code>.foundryframework</code>, or a macOS <code>Contents</code> directory to an item.</div>

<h2>Development packs</h2>
<p>Use <code>.foundrydevpack</code> while developing and <code>.foundrypack</code> for distribution. Their internal structure is identical. Foundry loads an opened development pack in place and watches its complete typed-directory tree for the current session.</p>
<p>You can also place packs in <code>~/Library/Application Support/Foundry/Packs</code>. Installed release packs are treated as read-only; saved personal templates and frameworks are written to <code>My Library.foundrydevpack</code>.</p>
<div class="note"><strong>Pack boundary.</strong> Foundry does not recursively search inside an outer pack for more packs. Unknown visible top-level directories fail validation; hidden files such as <code>.git</code> are ignored, so a development pack can live inside a source checkout. While a development pack is open, an incomplete item folder — for example a part still missing its <code>Info.plist</code> or <code>Resources</code> — is skipped so the rest of the pack keeps loading, but installing or releasing a <code>.foundrypack</code> that contains one is rejected.</div>

<h2>Declared part resources</h2>
<p>HTML, CSS, JavaScript and PHP template files are named under <a href="templates.html"><code>templates</code></a>. Other part files referenced with <code>{{ asset("…") }}</code> must be listed under <a href="manifest-resources.html"><code>assets</code></a>. Every path is relative to that part's <code>Resources</code> directory.</p>

<div class="page-links">
<a class="card" href="nested-packs.html"><strong>Pack contents</strong><p>Combine multiple content types in one distributable pack.</p></a>
<a class="card" href="manifest-identity.html"><strong>Part identity and metadata</strong><p>Declare an individual part beneath <code>Parts</code>.</p></a>
</div>
{% endraw %}
