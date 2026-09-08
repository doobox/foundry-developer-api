# Foundry Developer API documentation charter

This is the canonical, separate repository for Foundry's developer documentation. The application repository is the sibling `Mac/Foundry/Foundry` repository.

## The mantra

**One repository, one Markdown source, one Jekyll rendering path. Write for developers, keep manifest concepts under Info.plist, follow the established page convention, and verify what readers will actually see.**

## Source of truth

- Every documentation page must contain its complete content in its tracked Markdown file.
- Never generate, replace or duplicate documentation content in browser-side JavaScript.
- JavaScript may progressively enhance rendered Markdown with navigation, contents lists and copy buttons only.
- Do not add a generated-docs directory or restore an archived docs copy in the app repository.
- A standalone HTML file is acceptable only for a redirect; shared markup belongs in `_layouts`.

## Information architecture

- Everything developers declare in `Info.plist` belongs beneath the `Info.plist` sidebar section.
- Custom controls and their individual reference pages remain nested beneath `Info.plist → Custom controls`.
- Template declarations belong under `Info.plist`; template-language syntax remains its own section.
- Preserve the Bootstrap-inspired sidebar: no top navbar, top-level accordion with only one section open, independently collapsible subsections and non-underlined navigation links.

## Control-reference convention

- Use the existing standardized control pages as the template before adding or restructuring one.
- Document `type` first, above `id`; it identifies the control and is not an optional setting.
- Keep property type, Required or Optional status, and default together using the shared `property-heading` and `property-meta` pattern.
- Make every key entry self-contained for that page: include its accepted type, Required or Optional status, default, permitted values, constraints and developer-visible effects beside the key.
- The plist keys are singular: `label` and `subtitle`. Never expose the app's plural internal property names as manifest keys.
- `label` is always one optional String, including when `count` is present. It is always displayed in the Inspector's left-hand label column; never document or declare it as an array.
- `subtitle` is optional and available to every control. It is a String for a single control and a String array when `count` is present.
- `responsive` is optional and defaults to `false` unless a control page documents a deliberate exception.
- Button controls use optional `buttonText` for their visible button title and optional `buttonIcon` for an SF Symbol. Their ordinary `label` remains the Inspector label; do not use or document `systemImage`.
- Button arrays use optional `selectionMode`: `multiple` by default for independent Buttons, or `single` for a segmented Picker with exactly one selection.
- Button presentation keys `buttonText`, `buttonIcon`, `activeButtonText` and `activeButtonIcon` accept a String for one Button or an indexed String array with `count`.
- A `single` Button array always has exactly one selection and returns one selected mapped value, not an array.
- Keep literal `color` and theme-aware `themeColor` as separate control contracts. Never restore `themeValues` to either colour control.
- Put a cross-key constraint beside the key that enables or governs it, such as `themeColor` prohibiting `count` or `allowsCustom` permitting a custom default.
- Document runtime behaviour only when it changes what the developer must declare or what a template receives; omit internal implementation details.
- Do not add a separate `Validation and behaviour` summary that repeats key entries.
- Do not add `Related documentation` sections or bottom-of-page navigation lists; the sidebar is the documentation navigation.
- Use fenced GitHub-flavoured Markdown code blocks with an accurate language such as `xml`, `html`, `css` or `text`.
- Use relative `.html` links so navigation works both locally and on GitHub Pages.
- Do not invent API behaviour. Confirm uncertain details against the Foundry application source.

## Styling

- Make site-wide presentation changes in `styles.css`, not in individual Markdown pages.
- Retain the current Bootstrap-docs influence: white canvas, restrained typography, subtle rules, readable line length, syntax-highlighted snippets and copy buttons.
- Navigation links are not underlined; links in article content are.

## Local preview and verification

- Serve this repository's current working tree with `./serve-docs` and use `http://127.0.0.1:4000/`.
- Run `./serve-docs` after every documentation edit. When the correct preview server is already running, the script rebuilds the exact directory it is serving instead of starting a competing process.
- Do not use `python3 -m http.server`; Jekyll must render the same Markdown used by GitHub Pages.
- The supported server uses Jekyll with LiveReload and requires Homebrew Ruby 3.3.
- After edits, check `git diff --check`, validate JavaScript with `node --check app.js` when changed, and inspect the rendered page—not merely the source.
- Preserve unrelated and uncommitted user changes.
