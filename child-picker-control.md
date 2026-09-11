---
layout: default
title: Child picker control · Foundry Developer
permalink: "/child-picker-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Child picker</h1>
<p class="lede">An Inspector control that adds and manages real child-component instances inside a component.</p>


## Basic properties

Each item in `customItems` defines one Inspector control. These keys set the child picker's identity, name and placement.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as a Child picker. Always use `childPicker`.

```xml
<key>type</key>
<string>childPicker</string>
```

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to manage this collection and render its children in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>cards</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

The title shown for this child collection in the Inspector.

```xml
<key>label</key>
<string>Cards</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section associated with this control. Omit the key to use Settings.

```xml
<key>group</key>
<string>Content</string>
```

<h3 class="property-heading"><code>toolTip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains which children the author can add.

```xml
<key>toolTip</key>
<string>Add a feature or metric card.</string>
```

## Child picker options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

Foundry always presents the action as **Add** with its standard plus symbol. Its title and icon are not package-configurable, so the action has the same meaning in every component.

<h3 class="property-heading"><code>pickerItems</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="required">Required</span></div>

One or more component package identifiers available from the Inspector picker. The array cannot be empty. These are also the only types accepted as canvas drops unless `accepts` declares a wider set.

```xml
<key>pickerItems</key>
<array>
    <string>com.example.feature-card</string>
    <string>com.example.metric-card</string>
</array>
```

<h3 class="property-heading"><code>accepts</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: pickerItems</span></div>

The component package identifiers accepted as canvas drops into this managed collection. Use `*` as the only entry to accept every installed component while keeping the Inspector picker curated. Entries are either `*` or lowercase reverse-DNS component identifiers; component groups and display names are not accepted.

```xml
<key>accepts</key>
<array>
    <string>*</string>
</array>
<key>pickerItems</key>
<array>
    <string>com.example.feature-card</string>
    <string>com.example.metric-card</string>
</array>
```

`accepts` changes only valid drops; it does not add choices to the Inspector picker.

<h3 class="property-heading"><code>initial</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

An ordered list of component package identifiers that Foundry creates in this collection when it creates a new instance of the parent component. Repeat an identifier to create multiple children. Every identifier must be permitted by `accepts`; the array cannot contain fewer entries than `minimum` or more than `maximum`.

```xml
<key>initial</key>
<array>
    <string>com.example.feature-card</string>
    <string>com.example.metric-card</string>
    <string>com.example.metric-card</string>
</array>
```

Here the collection starts with one feature card followed by two metric cards. An initial identifier does not have to appear in `pickerItems`, allowing a component to start with supporting children that authors cannot add again, but it must be permitted by `accepts`. Each initial child uses the defaults from its own manifest and creates any initial children declared by its own Child pickers. Foundry applies `initial` only to new component instances; it does not repopulate an existing collection after children are removed. If an initial child's package is unavailable, Foundry creates a missing-component instance so the intended composition is preserved and can recover when that package becomes available.

<h3 class="property-heading"><code>minimum</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: 0</span></div>

The minimum number of children the collection may contain. It cannot be negative. Foundry prevents deletion or movement that would take the collection below this value. When `minimum` is greater than zero, `initial` must declare at least that many children so every new instance begins in a valid state.

```xml
<key>minimum</key>
<integer>1</integer>
```

<h3 class="property-heading"><code>maximum</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: no limit</span></div>

The maximum number of children the collection may contain. It must be greater than zero and cannot be lower than `minimum`. Foundry disables Add and rejects drops, pastes and duplicates after reaching it.

```xml
<key>maximum</key>
<integer>6</integer>
```

<h3 class="property-heading"><code>containment</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: open</span></div>

Controls whether managed children can leave this parent.

- `open` allows children to move between compatible locations.
- `locked` allows reordering within this collection but prevents children from moving outside it.

```xml
<key>containment</key>
<string>locked</string>
```

## Return value

`{{ control.cards }}` resolves as the rendered HTML of the children managed by this control, in their current order. It is inserted as markup rather than escaped text.

```html
<div class="card-grid">
    {{ control.cards }}
</div>
```

Each added child is an independent component instance with its own Inspector values. It appears in Structure and participates in undo, copy, paste, globals, preview and publishing.

Set `showsInComponentLibrary` to `false` in a managed child's manifest when it should be available through the parent picker but hidden from the main Components panel.

The Child picker `id` is a persistent content-location identifier. Reordering the control in `customItems` keeps its children attached. Removing or renaming it preserves its children but stops rendering them. Structure marks them as belonging to an unavailable Child picker and offers compatible current child areas to which the author can move them. Restoring the same `id` reconnects the preserved children.

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>type</key><string>childPicker</string>
        <key>id</key><string>cards</string>
        <key>label</key><string>Cards</string>
        <key>group</key><string>Content</string>
        <key>toolTip</key><string>Add a feature or metric card.</string>
        <key>pickerItems</key>
        <array>
            <string>com.example.metric-card</string>
        </array>
        <key>accepts</key>
        <array><string>*</string></array>
        <key>initial</key>
        <array>
            <string>com.example.metric-card</string>
            <string>com.example.metric-card</string>
        </array>
        <key>minimum</key><integer>0</integer>
        <key>maximum</key><integer>6</integer>
        <key>containment</key><string>locked</string>
    </dict>
</array>
```

### Use it in a template

```html
<section class="card-grid{{ component.class }}" {{ component.attributes }}>
    {{ control.cards }}
</section>
```

{% endraw %}
