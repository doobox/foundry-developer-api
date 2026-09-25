---
layout: default
title: Build a part · Foundry Developer
permalink: "/developer/quick-start.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Quick start</p>
<h1>Build your first part</h1>
<p class="lede">Start with an editable heading. Once it works, add framework controls and a place for child parts.</p>

<div class="hero-actions">
<a class="button" href="assets/downloads/Callout-starter.zip" download>Download starter</a>
<a class="button secondary" href="assets/downloads/Callout-complete.zip" download>Download completed example</a>
</div>

Both downloads contain `Callout.foundrydevpack`. Unzip **one** to begin; they are two stages of the same part, not separate parts to install together. The downloads are generated from the snippets on this page.

## 1. Create the pack

Use the starter download, or create these five files yourself.

```text
Callout.foundrydevpack/
├── manifest.json
└── Parts/
    └── uk.co.example.callout/
        ├── manifest.json
        └── Resources/
            ├── part.html
            ├── part.css
            └── icon.svg
```

### Declare the files

The starter's root `manifest.json` declares pack format 2 and identifies the outer pack. Save the following part manifest as `Parts/uk.co.example.callout/manifest.json`. This first version has no Inspector controls.

<!-- starter:manifest.json -->
```json
{
    "minimumAPIVersion" : 1,
    "id" : "uk.co.example.callout",
    "title" : "Callout",
    "version" : "1.0.0",
    "group" : "Content",
    "templates" : {
        "html" : "part.html",
        "files" : [
            {
                "path" : "part.css"
            }
        ]
    }
}
```

### Add an editable heading

Save as `Parts/uk.co.example.callout/Resources/part.html`:

<!-- starter:part.html -->
```html
<aside class="callout {{ part.class }}" {{ part.attributes }}>
    <h2>{{ text("heading", default: "A useful callout") }}</h2>
</aside>
```

Keep `{{ part.class }}` and `{{ part.attributes }}` on the root element: they let Foundry identify and edit this part. `text(...)` supplies the editable heading. Do not add a root `id`; Foundry reserves it for the site author's anchor.

### Style it

Save as `Parts/uk.co.example.callout/Resources/part.css`:

<!-- starter:part.css -->
```css
:instance {
    padding: 1.5rem;
    border-left: 4px solid #5B5BD6;
    background: #F3F3FC;
}
```

`:instance` targets this placed part. A declared CSS file uses instance scope by default.

### Give it an icon

Every part needs a square SVG icon. You can also provide dark-appearance artwork and a dedicated landscape tile for the Parts panel.

| File | Requirement | Where Foundry uses it | Recommended viewBox |
| --- | --- | --- | --- |
| `icon.svg` | Required | Structure, Inspector, canvas and other non-panel contexts | 256 × 256 |
| `icon-dark.svg` | Optional | Dark-appearance variant of the square icon | 256 × 256 |
| `tile.svg` | Optional | Parts panel only | 256 × 192 |
| `tile-dark.svg` | Optional | Dark-appearance variant of the Parts panel tile | 256 × 192 |

Keep the featured artwork about **90 px high** on either canvas. The remaining space gives the artwork consistent visual weight and breathing room. A subtle background helps transparent artwork remain visible, and Foundry scales the complete SVG without cropping.

Fallbacks are automatic:

- Without `icon-dark.svg`, dark appearance uses `icon.svg`.
- Without `tile-dark.svg`, dark appearance uses `tile.svg`.
- Without either tile file, the Parts panel centres the appropriate square icon on its tile.

Save all supplied artwork together in `Parts/uk.co.example.callout/Resources/`.

## 2. Try it in Foundry

Open `Callout.foundrydevpack` in Foundry. Alternatively, place it in `~/Library/Application Support/Foundry/Packs` and reload parts.

Find **Callout** under **Content** in the Parts panel and add it to a page. You should see a pale callout with a purple left border. Edit its heading on the canvas.

**That is a working part.** The next stage adds optional capabilities to these same files.

## 3. Add framework controls

Add the following `inspector` entry inside the **top-level object** of `manifest.json`, immediately before its closing `}`. Keep the existing identity and template declarations.

<!-- complete:inspector -->
```json
"inspector" : [
    {
        "type" : "frameworkPadding",
        "id" : "frameworkPadding",
        "label" : "Padding",
        "defaults" : {
            "base" : "lg"
        },
        "responsive" : true
    },
    {
        "type" : "frameworkColor",
        "id" : "accentColor",
        "label" : "Accent",
        "defaults" : {
            "base" : {
                "palette" : "accent"
            }
        }
    }
]
```

Replace `part.css` with:

<!-- complete:part.css -->
```css
:instance {
    padding: {{ control.frameworkPadding }};
    border-left: 4px solid {{ control.accentColor }};
}
```

Reload parts. Select the Callout and open its **Settings** section in the Inspector. Padding now uses the framework spacing scale; Accent uses the framework colour ribbon. Change each and check the canvas. Padding can also vary by breakpoint because its declaration enables `responsive`.

Control declarations do not apply CSS automatically. The two `control` expressions above connect the Inspector values to your styles.

## 4. Allow child content

Replace `part.html` with:

<!-- complete:part.html -->
```html
<aside class="callout {{ part.class }}" {{ part.attributes }}>
    <h2>{{ text("heading", default: "A useful callout") }}</h2>
    {{ dropZone("content") }}
</aside>
```

Reload parts, then drop another part into the Callout's content area. `dropZone("content")` creates an ordinary child-content area; it needs no additional manifest declaration. The completed download includes stages 3 and 4.

## 5. Next steps: grow the pack

Your pack can carry more than parts.

**Add an asset collection.** Make a folder inside `Assets/` at the pack root, drop your files in — nested folders welcome — and reload. That is the whole format:

```text
Callout.foundrydevpack/
└── Assets/
    └── Callout Icons/
        ├── info.svg
        └── warning.svg
```

The collection appears in Foundry's Assets panel, titled by its folder name. To declare a licence or a display title, add an optional `manifest.json` inside the collection folder — see [Assets & templates](assets-and-templates.html).

**Add templates.** Templates are page compositions authored in Foundry, not by hand: with your dev pack open, compose parts on the canvas and drop the composition onto your pack's section in the Templates panel's Dev tab. Foundry writes the bundle and its preview for you; arrange the results into plain folders inside `Templates/`, from the panel or in Finder. A pack of nothing but templates is a perfectly good product — ship any custom parts they use in the same pack.

## If something does not work

- **The part does not appear:** check that the pack root has its own `manifest.json` declaring the pack `id`, that the part folder under `Parts/` contains both `manifest.json` and `Resources/`, and reload parts.
- **Foundry rejects it:** enable the Developer panel in Foundry's Developer preferences. It reports the invalid manifest key, template line or missing file.
- **Styles or controls seem unchanged:** save the source files and reload parts. Confirm you are editing the installed development pack rather than another extracted copy.

When starting your own part, replace `uk.co.example.callout` with your own stable reverse-DNS identifier.
{% endraw %}
