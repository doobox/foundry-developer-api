---
layout: default
title: Foundry CSS · Foundry Developer
permalink: "/foundry-css.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Frameworks</p>
<h1>Foundry CSS</h1>
<p class="lede">The framework compiled from a project's design system. Foundry CSS never exists as a downloadable file — the Framework editor is its build configurator, and every published site ships a custom build.</p>

## The build model

Every project emits one build at <code>files/site.css</code>, shared by every page; each page adds only its own part-instance styles. The same build renders in the editing canvas, browser Preview and published output, so what you author against is what visitors receive.

The build's contents come entirely from the project: colour palettes, fonts, font sizes, spacing, shadows, borders, radii, z-index and the project's responsive screens. A custom spacing or stacking-order token you create in the Framework editor becomes a real class in your build; custom border widths and radii become CSS variables; a disabled breakpoint generates nothing. The current version is <strong>Foundry CSS 1</strong>, stamped in a header comment at the top of the build.

## Cascade layers

The build declares three layers, in ascending precedence:

```css
@layer foundry.tokens, foundry.base, foundry.utilities;
```

Part CSS and page CSS are unlayered. In CSS, unlayered rules take precedence over all layered ones, so a Part's own styles always beat the framework — by architecture, not by specificity fights.

## Layer one: tokens

Every Framework editor value is a custom property on <code>:root</code>. These are the stable contract Parts build against:

| Family | Properties |
| --- | --- |
| Colours | `--foundry-color-page`, `-surface`, `-text`, `-muted`, `-brand`, `-accent`, `-links` — appearance-aware on light-and-dark sites |
| Fonts | `--foundry-font-body`, `-heading`, `-monospace`, plus `--foundry-font-custom-<id>` per custom font |
| Font sizes | `--foundry-font-size-<step>` and `--foundry-font-size-<step>-line-height` per step |
| Spacing | `--foundry-spacing-base` and `--foundry-space-<token>`, including custom tokens |
| Shadows | `--foundry-shadow-<token>` |
| Borders | `--foundry-border-width-<token>` and `--foundry-border-radius-<token>` |
| Z-index | `--foundry-z-index-<token>` |
| Container | `--foundry-container-width`, resolved per enabled screen through media queries |
| Motion | `--foundry-motion-fast` (150ms), `-normal` (250ms), `-slow` (400ms), `-ease` (a standard easing curve) |
| Focus | `--foundry-focus-ring`, an outline value derived from the accent colour |

When a visitor asks for reduced motion, the build zeroes all three duration tokens — a Part that animates with the motion tokens honours the preference automatically. The focus ring is deliberately an <em>outline</em> value: outlines are the one focus channel that box-shadows from utilities or Part CSS can never overwrite. Apply it with `outline: var(--foundry-focus-ring)`.

Motion and focus are part of the contract ahead of gaining Framework-editor controls; use them rather than hard-coding durations or focus styles.

## Layer two: base

A preflight-style reset and token-driven page defaults, containing no literal values:

- Border-box sizing everywhere, and every element starts with `border-width: 0; border-style: solid; border-color: currentColor` — setting only a border width from Part CSS produces a visible solid border in the text colour.
- User-agent margins never fight Part spacing controls: `h1`–`h6`, `p`, `figure`, `dl`, `dd`, `fieldset` and lists are zeroed. Lists keep their markers with a spacing-token indent (`padding-inline-start`). Spacing between Parts comes only from Part controls and utilities; Parts that emit multiple paragraphs internally own that flow spacing in their own Part CSS.
- Media elements are block-level and bounded; form controls inherit font and colour with zeroed margins, and `::placeholder` takes the muted text role at full opacity.
- The body uses the page colour, text colour, body font and base type step, breaks overflowing words, disables iOS text-size inflation, and sets `accent-color` so native checkboxes, radios and progress bars follow the accent role.
- Headings use the heading font, descend the font size scale from `h1` at the 4XL step to `h6` at the base step, and balance multi-line wrapping.
- Links take the links role, `:focus-visible` applies `outline: var(--foundry-focus-ring)`, `::selection` derives from accent, and `code`/`pre` use the monospaced font at `1em` so inline code never shrinks. `b`/`strong` resolve to `bolder`, and `sub`/`sup` are positioned without disturbing line height.
- Plain content with no Part CSS still styles from tokens: `hr`, `blockquote` and `table` take spacing-token margins and borders mixed down from the text colour, with blockquote text in the muted role.
- `.fd-image` — the class Foundry emits on `img` elements produced by image values — displays block-level at full width with automatic height. Target it from Part CSS to restyle generated images.

Because every value is a token reference, changing the Framework editor restyles plain HTML content sitewide — not just Parts that opted in.

## Layer three: utilities

Token-mirroring classes with one grammar: <code>fd-{property}-{token}</code>, where the token segment is always a name that exists in the Framework editor.

| Group | Classes |
| --- | --- |
| Padding | `fd-p-*`, `fd-px-*`, `fd-py-*`, `fd-pt-*`, `fd-pr-*`, `fd-pb-*`, `fd-pl-*` |
| Margin | `fd-m-*` and the same directions, plus `fd-mx-auto`, `fd-ml-auto`, `fd-mr-auto` |
| Gap | `fd-gap-*`, `fd-gap-x-*`, `fd-gap-y-*` |
| Text size | `fd-text-<step>` — sets the step's size and line height together |
| Fonts | `fd-font-body`, `fd-font-heading`, `fd-font-mono`, plus custom fonts by name |
| Colours | `fd-text-<role>` and `fd-bg-<role>` for the seven colour roles |
| Radius | `fd-radius-*` |
| Border | `fd-border-*` — the width token with a solid style; colour follows `currentColor` |
| Shadow | `fd-shadow-*` |
| Z-index | `fd-z-*` |
| Container | `fd-container` — full width capped at the responsive container width, centred |

Custom tokens appear as classes named from a slug of their display name: a spacing token called <em>Hero Gap</em> becomes `fd-p-hero-gap`, `fd-mt-hero-gap` and so on.

### Responsive variants

Spacing, gap and text-size utilities have mobile-first variants for each enabled screen, using the prefix grammar:

```html
<div class="fd-p-sm fd-md:p-lg fd-xl:p-2xl">
```

The prefixes are `sm`, `md`, `lg`, `xl` and `2xl`, matching the project's screens. Variants for disabled screens are not generated. Colour utilities need no variants for appearance — they reference appearance-aware tokens, so every utility follows light and dark automatically.

## Using Foundry CSS in Parts

Templates may use utility classes directly in HTML, tokens directly in CSS, or both:

```html
<div class="fd-p-lg fd-bg-surface fd-radius-md">
    {{ control.content }}
</div>
```

```css
:instance {
    transition: transform var(--foundry-motion-normal);
}
```

Utilities keep Part markup aligned with the site's design system without plumbing `var()` references through the Part's own stylesheet; use the Part's CSS template when a value needs to come from an Inspector control instead.
{% endraw %}
