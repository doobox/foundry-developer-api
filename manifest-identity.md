---
layout: default
title: Identity and metadata · Foundry Developer
permalink: "/manifest-identity.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span>
</div>
<p class="eyebrow">Info.plist · component manifest</p>
<h1>Identity and metadata</h1>
<p class="lede">These keys declare the API contract and stable identity of a component, then describe how it appears to site authors in Foundry.</p>


## Required identity

Every component manifest must declare these four keys.

<h3 class="property-heading"><code>minimumAPIVersion</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="required">Required</span></div>

The oldest Foundry component API the component requires. Use `1` for the current API. A component continues working when Foundry adds newer APIs; it is rejected only when it requires a version newer than the installed Foundry supports, or when its minimum version is no longer supported.

```xml
<key>minimumAPIVersion</key>
<integer>1</integer>
```

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

A globally unique, stable reverse-domain identifier. Foundry uses it for saved component instances, template deduplication, and package identity. Changing it creates a different component. Templates can read it as `{{ package.id }}`.

```xml
<key>id</key>
<string>uk.co.example.callout</string>
```

<h3 class="property-heading"><code>title</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The short component name shown on its tile in the Components panel and in the component Inspector header.

```xml
<key>title</key>
<string>Callout</string>
```

<h3 class="property-heading"><code>version</code></h3>
<div class="property-meta"><span class="property-type">Semantic-version String</span><span class="required">Required</span></div>

The component release in `MAJOR.MINOR.PATCH` form. Pre-release and build suffixes are supported. This is separate from `minimumAPIVersion`.

```xml
<key>version</key>
<string>1.2.0</string>
```

## Presentation metadata

These optional keys help site authors identify, find, and evaluate the component in the Components panel.

<h3 class="property-heading"><code>description</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

A concise explanation of what the component does. Foundry displays it beside the component icon when an author selects the component.

```xml
<key>description</key>
<string>Highlights a short piece of important content.</string>
```

<h3 class="property-heading"><code>author</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Unknown Developer</span></div>

The developer, company, or publisher responsible for the component. Foundry displays it in the library Inspector and when inspecting an instance.

```xml
<key>author</key>
<string>Example Components</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Other</span></div>

The Components-panel heading beneath which the component appears. Use `Layout`, `Content`, `Media`, `Navigation`, `Forms`, `Interactive`, or `Other`. Matching is case-insensitive; an omitted or unrecognised value uses Other.

```xml
<key>group</key>
<string>Content</string>
```

<h3 class="property-heading"><code>tags</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: []</span></div>

Up to five brief terms that help authors recognise and find the component. Foundry displays them in a dedicated Tags section.

```xml
<key>tags</key>
<array>
    <string>notice</string>
    <string>message</string>
</array>
```

<div class="guidance" markdown="1">
<h3>How Foundry presents the component</h3>

The Components panel shows each component as an icon and title beneath its `group` heading. Selecting it reveals the icon, title, description, developer, version, category, identifier, documentation link, and tags in the Inspector.

Components loaded from a development pack receive a small red dot beside their title. Foundry supplies this marker; component authors do not declare it in `Info.plist`.
</div>

## Complete example

```xml
<key>minimumAPIVersion</key><integer>1</integer>
<key>id</key><string>uk.co.example.callout</string>
<key>title</key><string>Callout</string>
<key>version</key><string>1.2.0</string>
<key>description</key><string>Highlights a short piece of important content.</string>
<key>author</key><string>Example Components</string>
<key>group</key><string>Content</string>
<key>tags</key>
<array>
    <string>notice</string>
    <string>message</string>
</array>
```

{% endraw %}
