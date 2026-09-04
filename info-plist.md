---
layout: default
title: Info.plist overview · Foundry Developer
permalink: "/info-plist.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span>Info.plist</div>
<p class="eyebrow">Component manifest</p>
<h1>Info.plist</h1>
<p class="lede">The manifest gives Foundry a component’s identity, files, controls, dependencies, and composition rules. Start with the minimum declaration, then add only the capabilities the component actually needs.</p>

<div class="note">
<strong>Strict by design.</strong> Unknown or misspelled keys are errors, and every declared path is relative to <code>Contents/Resources</code>. Foundry reports a rejected pack in the Developer panel instead of guessing what its author intended.</div>

<h2>Choose the part you need</h2>
<div class="manifest-map">
    <a class="card" href="manifest-identity.html"><code>Identity</code><strong>Name the component</strong><p>API compatibility, stable ID, title, version, author, group, and tags.</p></a>
    <a class="card" href="templates.html"><code>templates</code><strong>Declare template files</strong><p>Primary HTML, CSS, JavaScript, PHP, additional HTML, scopes, and editor CSS.</p></a>
    <a class="card" href="manifest-resources.html"><code>libraries · assets</code><strong>Request dependencies and files</strong><p>Built-in web libraries, packaged assets, and the PHP hosting requirement.</p></a>
    <a class="card" href="custom-controls.html"><code>customItems</code><strong>Build the Inspector</strong><p>Every author-facing control, its default value, responsive behaviour, and output.</p></a>
    <a class="card" href="slots.html"><code>slots</code><strong>Accept child components</strong><p>Name the regions that receive children and define what each region accepts.</p></a>
    <a class="card" href="manifest-support.html"><code>helpURL · missingComponent</code><strong>Support and recovery</strong><p>Link to help and preserve useful fallback information when a pack is unavailable.</p></a>
</div>

<h2>Minimal component manifest</h2>
<p>This is the smallest valid component <code>Info.plist</code>. It identifies the API contract and component release, then points Foundry to the primary HTML template.</p>


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
    <key>templates</key>
    <dict>
        <key>html</key><string>component.html</string>
    </dict>
</dict>
</plist>
```

</div>



<h2>Collection manifest</h2>
<p>A collection is only a container for nested packs. Its manifest contains exactly one key. Foundry checks <code>collection</code> before component validation, so key order does not matter.</p>


<div markdown="1">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>collection</key><true/>
</dict>
</plist>
```

</div>


<p>Do not put component identity, template files, controls, or slots in a collection manifest. Foundry continues searching for component packs below the collection’s <code>Contents/Resources</code> directory.</p>

<h2>How the pieces connect</h2>
<div class="rule-summary">
    <div>
<strong>1. Declare</strong><span><code>Info.plist</code> names files and author-facing controls.</span>
</div>
    <div>
<strong>2. Read</strong><span>Templates consume values such as <code>{{ control.accent }}</code>.</span>
</div>
    <div>
<strong>3. Render</strong><span>Foundry validates, processes, previews, and exports the declared result.</span>
</div>
</div>
<p>The manifest is the source of truth for which template files exist. Foundry does not scan source text and guess whether a CSS, JavaScript, or PHP file should be included.</p>

<div class="page-links">
    <a class="card" href="manifest-identity.html"><strong>Start with identity</strong><p>Choose a stable component ID and declare API and release versions.</p></a>
    <a class="card" href="templates.html"><strong>Then declare template files</strong><p>Learn the valid entry for each supported file type.</p></a>
</div>
{% endraw %}
