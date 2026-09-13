---
layout: default
title: Identity and metadata · Foundry Developer
permalink: "/manifest-identity.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span>
</div>
<p class="eyebrow">Info.plist · block manifest</p>
<h1>Identity and metadata</h1>
<p class="lede">These keys declare the API contract and stable identity of a block, then describe how it appears to site authors in Foundry.</p>


## Required identity

Every block manifest must declare these four keys.

<h3 class="property-heading"><code>minimumAPIVersion</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="required">Required</span></div>

The oldest Foundry block API the block requires. Use `1` for the current API. A block continues working when Foundry adds newer APIs; it is rejected only when it requires a version newer than the installed Foundry supports, or when its minimum version is no longer supported.

```xml
<key>minimumAPIVersion</key>
<integer>1</integer>
```

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

A globally unique, stable reverse-domain identifier. Foundry uses it for saved block instances, template deduplication, and package identity. Changing it creates a different block. Templates can read it as `{{ package.id }}`.

```xml
<key>id</key>
<string>uk.co.example.callout</string>
```

<h3 class="property-heading"><code>title</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The short block name shown on its tile in the Blocks panel and in the block Inspector header.

```xml
<key>title</key>
<string>Callout</string>
```

<h3 class="property-heading"><code>version</code></h3>
<div class="property-meta"><span class="property-type">Semantic-version String</span><span class="required">Required</span></div>

The block release in `MAJOR.MINOR.PATCH` form. Pre-release and build suffixes are supported. This is separate from `minimumAPIVersion`.

```xml
<key>version</key>
<string>1.2.0</string>
```

## Presentation metadata

These optional keys help site authors identify, find, and evaluate the block in the Blocks panel.

<h3 class="property-heading"><code>description</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

A concise explanation of what the block does. Foundry displays it beside the block icon when an author selects the block.

```xml
<key>description</key>
<string>Highlights a short piece of important content.</string>
```

<h3 class="property-heading"><code>author</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Unknown Developer</span></div>

The developer, company, or publisher responsible for the block. Foundry displays it in the library Inspector and when inspecting an instance.

```xml
<key>author</key>
<string>Example Blocks</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Other</span></div>

The Blocks-panel heading beneath which the block appears. Use `Layout`, `Content`, `Media`, `Navigation`, `Forms`, `Interactive`, or `Other`. Matching is case-insensitive; an omitted or unrecognised value uses Other.

```xml
<key>group</key>
<string>Content</string>
```

<h3 class="property-heading"><code>tags</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: []</span></div>

Up to five brief terms that help authors recognise and find the block. Foundry displays them in a dedicated Tags section.

```xml
<key>tags</key>
<array>
    <string>notice</string>
    <string>message</string>
</array>
```

<h3 class="property-heading"><code>showsInBlockLibrary</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: true</span></div>

Whether the block appears in the Blocks or Dev Blocks panel. Set this to `false` for a supporting block that users should add only through a parent block's Child picker. The block remains installed and available to matching `pickerItems` declarations.

```xml
<key>showsInBlockLibrary</key>
<false/>
```

<h3 class="property-heading"><code>allowedParents</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: any location</span></div>

Restricts this block to children of the listed block package identifiers. Foundry applies the restriction to Inspector additions, drops, pastes, moves and initial children. Omit it when the block may also appear at page level or beneath other blocks.

```xml
<key>allowedParents</key>
<array>
    <string>com.example.card-grid</string>
</array>
```

<div class="guidance" markdown="1">
<h3>How Foundry presents the block</h3>

The Blocks panel shows each block as an icon and title beneath its `group` heading. Selecting it reveals the icon, title, description, developer, version, category, identifier, documentation link, and tags in the Inspector.

Blocks loaded from a development pack receive a small red dot beside their title. Foundry supplies this marker; block authors do not declare it in `Info.plist`.
</div>

## Complete example

```xml
<key>minimumAPIVersion</key><integer>1</integer>
<key>id</key><string>uk.co.example.callout</string>
<key>title</key><string>Callout</string>
<key>version</key><string>1.2.0</string>
<key>description</key><string>Highlights a short piece of important content.</string>
<key>author</key><string>Example Blocks</string>
<key>group</key><string>Content</string>
<key>showsInBlockLibrary</key><false/>
<key>tags</key>
<array>
    <string>notice</string>
    <string>message</string>
</array>
```

{% endraw %}
