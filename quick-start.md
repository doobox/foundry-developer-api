---
layout: default
title: Build a part · Foundry Developer
permalink: "/quick-start.html"
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
├── Info.plist
└── Parts/
    └── uk.co.example.callout/
        ├── Info.plist
        └── Resources/
            ├── part.html
            ├── part.css
            └── icon.svg
```

### Declare the files

The starter's root `Info.plist` declares pack format 2 and identifies the outer pack. Save the following part manifest as `Parts/uk.co.example.callout/Info.plist`. This first version has no Inspector controls.

<!-- starter:Info.plist -->
```xml
<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
    <key>minimumAPIVersion</key><integer>1</integer>
    <key>id</key><string>uk.co.example.callout</string>
    <key>title</key><string>Callout</string>
    <key>version</key><string>1.0.0</string>
    <key>group</key><string>Content</string>
    <key>templates</key>
    <dict>
        <key>html</key><string>part.html</string>
        <key>files</key>
        <array>
            <dict><key>path</key><string>part.css</string></dict>
        </array>
    </dict>
</dict>
</plist>
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

Save as `Parts/uk.co.example.callout/Resources/icon.svg`:

<!-- starter:icon.svg -->
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="18" rx="3" fill="#5B5BD6"/>
    <path d="M7 8h10M7 12h10M7 16h6" fill="none" stroke="#fff" stroke-width="2"/>
</svg>
```

## 2. Try it in Foundry

Open `Callout.foundrydevpack` in Foundry. Alternatively, place it in `~/Library/Application Support/Foundry/Packs` and reload parts.

Find **Callout** under **Content** in the Parts panel and add it to a page. You should see a pale callout with a purple left border. Edit its heading on the canvas.

**That is a working part.** The next stage adds optional capabilities to these same files.

## 3. Add framework controls

Add the following `controls` entry inside the **outer dictionary** of `Info.plist`, immediately before its closing `</dict>`. Keep the existing identity and template declarations.

<!-- complete:controls -->
```xml
<key>controls</key>
<array>
    <dict>
        <key>type</key><string>frameworkPadding</string>
        <key>id</key><string>frameworkPadding</string>
        <key>label</key><string>Padding</string>
        <key>defaults</key>
        <dict><key>base</key><string>lg</string></dict>
        <key>responsive</key><true/>
    </dict>
    <dict>
        <key>type</key><string>frameworkColor</string>
        <key>id</key><string>accentColor</string>
        <key>label</key><string>Accent</string>
        <key>defaults</key>
        <dict>
            <key>base</key>
            <dict><key>palette</key><string>accent</string></dict>
        </dict>
    </dict>
</array>
```

Replace `part.css` with:

<!-- complete:part.css -->
```css
:instance {
    padding: {{ control.frameworkPadding }};
    border-left: 4px solid {{ control.accentColor }};
}
```

Reload parts. Select the Callout and open its **Settings** group in the Inspector. Padding now uses the framework spacing scale; Accent uses the framework colour ribbon. Change each and check the canvas. Padding can also vary by breakpoint because its declaration enables `responsive`.

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

## If something does not work

- **The part does not appear:** check that `Info.plist` is inside `Contents`, not at the pack root, and reload parts.
- **Foundry rejects it:** enable the Developer panel in Foundry's Developer preferences. It reports the invalid manifest key, template line or missing file.
- **Styles or controls seem unchanged:** save the source files and reload parts. Confirm you are editing the installed development pack rather than another extracted copy.

When starting your own part, replace `uk.co.example.callout` with your own stable reverse-DNS identifier.
{% endraw %}
