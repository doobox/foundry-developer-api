---
layout: default
title: Child picker control · Foundry Developer
permalink: "/developer/child-picker-control.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">manifest.json · inspector</p>
<h1>Child picker</h1>
<p class="lede">An Inspector control that adds and manages real child-part instances inside a part.</p>


<figure class="control-screenshot">
    <img src="assets/screenshots/child-picker-control.png" width="348" height="90" alt="Child picker labelled Cards, with Feature Card selected, an Add button and a count of 3 of 12." />
    <figcaption>Choose an allowed part, add it to the managed area, and see the current count.</figcaption>
</figure>

## Quick example

Add this dictionary to your part's `inspector` array:

```json
{
    "type" : "childPicker",
    "id" : "cards",
    "pickerItems" : [
        "com.example.metric-card"
    ]
}
```

Use it in your HTML template:

```html
{{ childArea("cards") }}
```

Install a child part with ID `com.example.metric-card` before using this example.


## Basic properties

Each item in the `inspector` array defines one Inspector control. These keys set the child picker's identity and name.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as a Child picker. Always use `childPicker`.

```json
"type" : "childPicker"
```

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to manage this collection and render its children in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```json
"id" : "cards"
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

The title shown for this child collection in the Inspector.

```json
"label" : "Cards"
```

<h3 class="property-heading"><code>tooltip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains which children the author can add.

```json
"tooltip" : "Add a feature or metric card."
```

## Child picker options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

Foundry always presents the action as **Add** with its standard plus symbol. Its title and icon are not package-configurable, so the action has the same meaning in every part.

<h3 class="property-heading"><code>pickerItems</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="required">Required</span></div>

One or more part package identifiers available from the Inspector picker. The array cannot be empty. These are also the only types accepted as canvas drops unless `accepts` declares a wider set.

```json
"pickerItems" : [
    "com.example.feature-card",
    "com.example.metric-card"
]
```

<h3 class="property-heading"><code>accepts</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: pickerItems</span></div>

The part package identifiers accepted as canvas drops into this managed collection. Use `*` as the only entry to accept every installed part while keeping the Inspector picker curated. Entries are either `*` or lowercase reverse-DNS part identifiers; part groups and display names are not accepted.

```json
"accepts" : [
    "*"
],
"pickerItems" : [
    "com.example.feature-card",
    "com.example.metric-card"
]
```

`accepts` changes only valid drops; it does not add choices to the Inspector picker.

<h3 class="property-heading"><code>initial</code></h3>
<div class="property-meta"><span class="property-type">String array</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

An ordered list of part package identifiers that Foundry creates in this collection when it creates a new instance of the parent part. Repeat an identifier to create multiple children. Every identifier must be permitted by `accepts`; the array cannot contain fewer entries than `minimum` or more than `maximum`.

```json
"initial" : [
    "com.example.feature-card",
    "com.example.metric-card",
    "com.example.metric-card"
]
```

Here the collection starts with one feature card followed by two metric cards. An initial identifier does not have to appear in `pickerItems`, allowing a part to start with supporting children that authors cannot add again, but it must be permitted by `accepts`. Each initial child uses the defaults from its own manifest and creates any initial children declared by its own Child pickers. Foundry applies `initial` only to new part instances; it does not repopulate an existing collection after children are removed. If an initial child's package is unavailable, Foundry creates a missing-part instance so the intended composition is preserved and can recover when that package becomes available.

<h3 class="property-heading"><code>minimum</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: 0</span></div>

The minimum number of children the collection may contain. It cannot be negative. Foundry prevents deletion or movement that would take the collection below this value. When `minimum` is greater than zero, `initial` must declare at least that many children so every new instance begins in a valid state.

```json
"minimum" : 1
```

<h3 class="property-heading"><code>maximum</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: no limit</span></div>

The maximum number of children the collection may contain. It must be greater than zero and cannot be lower than `minimum`. Foundry disables Add and rejects drops, pastes and duplicates after reaching it.

```json
"maximum" : 6
```

<h3 class="property-heading"><code>containment</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: open</span></div>

Controls whether managed children can leave this parent.

- `open` allows children to move between compatible locations.
- `locked` allows reordering within this collection but prevents children from moving outside it.

```json
"containment" : "locked"
```

## Return value

Place the managed children with <code>{{ childArea("cards") }}</code>. It emits the rendered child-part HTML in its current order rather than an escaped control value.

```html
<div class="card-grid">
    {{ childArea("cards") }}
</div>
```

Each added child is an independent part instance with its own Inspector values. It appears in Structure and participates in undo, copy, paste, globals, preview and publishing.

Set `showsInPartLibrary` to `false` in a managed child's manifest when it should be available through the parent picker but hidden from the main Parts panel.

The Child picker `id` is a persistent content-location identifier. Reordering the control in the `inspector` keeps its children attached. Removing or renaming it preserves its children but stops rendering them. Structure marks them as belonging to an unavailable Child picker and offers compatible current child areas to which the author can move them. Restoring the same `id` reconnects the preserved children.

## Complete example

### manifest.json

```json
"inspector" : [
    {
        "type" : "childPicker",
        "id" : "cards",
        "label" : "Cards",
        "tooltip" : "Add a feature or metric card.",
        "pickerItems" : [
            "com.example.metric-card"
        ],
        "accepts" : [
            "*"
        ],
        "initial" : [
            "com.example.metric-card",
            "com.example.metric-card"
        ],
        "minimum" : 0,
        "maximum" : 6,
        "containment" : "locked"
    }
]
```

### Use it in a template

```html
<section class="card-grid {{ part.class }}" {{ part.attributes }}>
    {{ childArea("cards") }}
</section>
```

{% endraw %}
