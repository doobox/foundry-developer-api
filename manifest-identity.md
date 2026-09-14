---
layout: default
title: Identity and metadata · Foundry Developer
permalink: "/manifest-identity.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span>
</div>
<p class="eyebrow">Info.plist · part manifest</p>
<h1>Identity and metadata</h1>
<p class="lede">These keys declare the API contract and stable identity of a part, then describe how it appears to site authors in Foundry.</p>


## Required identity

Every part manifest must declare these four keys.

<h3 class="property-heading"><code>minimumAPIVersion</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="required">Required</span></div>

The oldest Foundry part API the part requires. Use `1` for the current API. A part continues working when Foundry adds newer APIs; it is rejected only when it requires a version newer than the installed Foundry supports, or when its minimum version is no longer supported.

```xml
<key>minimumAPIVersion</key>
<integer>1</integer>
```

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

A globally unique, stable reverse-domain identifier. Foundry uses it for saved part instances, template deduplication, and package identity. Changing it creates a different part. Templates can read it as `{{ package.id }}`.

```xml
<key>id</key>
<string>uk.co.example.callout</string>
```

<h3 class="property-heading"><code>title</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The short part name shown on its tile in the Parts panel and in the part Inspector header.

```xml
<key>title</key>
<string>Callout</string>
```

<h3 class="property-heading"><code>version</code></h3>
<div class="property-meta"><span class="property-type">Semantic-version String</span><span class="required">Required</span></div>

The part release in `MAJOR.MINOR.PATCH` form. Pre-release and build suffixes are supported. This is separate from `minimumAPIVersion`.

```xml
<key>version</key>
<string>1.2.0</string>
```

## Presentation metadata

These optional keys help site authors identify, find, and evaluate the part in the Parts panel.

<h3 class="property-heading"><code>description</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

A concise explanation of what the part does. Foundry displays it beside the part icon when an author selects the part.

```xml
<key>description</key>
<string>Highlights a short piece of important content.</string>
```

<h3 class="property-heading"><code>author</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Unknown Developer</span></div>

The developer, company, or publisher responsible for the part. Foundry displays it in the library Inspector and when inspecting an instance.

```xml
<key>author</key>
<string>Example Parts</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Other</span></div>

The Parts-panel heading beneath which the part appears. Use `Layout`, `Content`, `Media`, `Navigation`, `Forms`, `Interactive`, or `Other`. Matching is case-insensitive; an omitted or unrecognised value uses Other.

```xml
<key>group</key>
<string>Content</string>
```

<h3 class="property-heading"><code>tags</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: []</span></div>

Up to five brief terms that help authors recognise and find the part. Foundry displays them in a dedicated Tags section.

```xml
<key>tags</key>
<array>
    <string>notice</string>
    <string>message</string>
</array>
```

<h3 class="property-heading"><code>showsInPartLibrary</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: true</span></div>

Whether the part appears in the Parts or Dev Parts panel. Set this to `false` for a supporting part that users should add only through a parent part's Child picker. The part remains installed and available to matching `pickerItems` declarations.

```xml
<key>showsInPartLibrary</key>
<false/>
```

<h3 class="property-heading"><code>allowedParents</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: any location</span></div>

Restricts this part to children of the listed part package identifiers. Foundry applies the restriction to Inspector additions, drops, pastes, moves and initial children. Omit it when the part may also appear at page level or beneath other parts.

```xml
<key>allowedParents</key>
<array>
    <string>com.example.card-grid</string>
</array>
```

<div class="guidance" markdown="1">
<h3>How Foundry presents the part</h3>

The Parts panel shows each part as an icon and title beneath its `group` heading. Selecting it reveals the icon, title, description, developer, version, category, identifier, documentation link, and tags in the Inspector.

Parts loaded from a development pack receive a small red dot beside their title. Foundry supplies this marker; part authors do not declare it in `Info.plist`.
</div>

## Complete example

```xml
<key>minimumAPIVersion</key><integer>1</integer>
<key>id</key><string>uk.co.example.callout</string>
<key>title</key><string>Callout</string>
<key>version</key><string>1.2.0</string>
<key>description</key><string>Highlights a short piece of important content.</string>
<key>author</key><string>Example Parts</string>
<key>group</key><string>Content</string>
<key>showsInPartLibrary</key><false/>
<key>tags</key>
<array>
    <string>notice</string>
    <string>message</string>
</array>
```

## Updates

<h3 class="property-heading"><code>updates</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span>Default: absent</span></div>

Update configuration for the distributable pack. For a collection, declare it in the outer pack's `Contents/Info.plist`: the updater replaces that pack as a unit. Without this dictionary, the pack does not declare an update feed. Foundry's [release publishing workflow](pack-updates.html) writes it when preparing a development pack.

```xml
<key>updates</key>
<dict>
    <key>appcastURL</key>
    <string>https://example.com/updates/com.example.layout/appcast.php</string>
    <key>publicKey</key>
    <string>BASE64_PUBLIC_KEY_FROM_FOUNDRY</string>
</dict>
```

<h3 class="property-heading"><code>updates.appcastURL</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required when updates is present</span><span>No default</span></div>

An HTTPS URL returning the pack's JSON appcast. The built-in publisher uses an `appcast.php` endpoint. Keep the URL reachable for installed copies.

<h3 class="property-heading"><code>updates.publicKey</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required when updates is present</span><span>No default</span></div>

The publisher's Base64-encoded raw Ed25519 public key. Use the value generated by Foundry, not the placeholder above. Installed copies use it to verify downloaded releases. Never place the private signing key in this field, and retain the same public key across updates.

{% endraw %}
