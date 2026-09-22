---
layout: default
title: Background control group · Foundry Developer
permalink: /background-control-group.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Info.plist · controls · control groups</p>
<h1>Background</h1>
<p class="lede">Adds configurable colour, image, gradient and video backgrounds, with optional hover states, and applies the result to an explicitly marked template element.</p>

## Quick example

Add the group to the part's `controls` array:

```xml
<dict>
    <key>type</key><string>background</string>
</dict>
```

Place its attribute macro on exactly one element in the primary HTML template:

```html
<section class="hero {{ part.class }}" {{ part.attributes }}>
    <div class="hero__background" {{ controlGroup.background }}>
        {{ childArea("content") }}
    </div>
</section>
```

Foundry reports a validation error when the macro is missing, repeated, declared without the group, or used outside the primary HTML template. There is no implicit root placement.

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `background`. The group does not accept `id`, `label`, `group`, `responsive`, or `defaultOverrides`.

<h3 class="property-heading"><code>styles</code></h3>
<div class="property-meta"><span class="property-type">Array of strings</span><span class="optional">Optional</span><span class="default">Default: all styles</span></div>

Selects the background styles offered by the Inspector. Accepted values are `colour`, `image`, `gradient`, and `video`. The array must contain at least one unique value. Its first value is the initial Static style. Omitting the key includes every style.

```xml
<dict>
    <key>type</key><string>background</string>
    <key>styles</key>
    <array>
        <string>colour</string>
        <string>image</string>
    </array>
</dict>
```

<h3 class="property-heading"><code>states</code></h3>
<div class="property-meta"><span class="property-type">Array of strings</span><span class="optional">Optional</span><span class="default">Default: static and hover</span></div>

Accepted values are `static` and `hover`. The array must include `static`; `hover` adds the separate Hover controls and `:hover` output. Use only `static` when the part has no hover styling.

## Generated controls

Only values belonging to the selected styles and states are generated. Generated values are responsive except `backgroundMode`, video selections, and their posters. A responsive style may reveal or hide a video, but the selected asset remains the same at every breakpoint.

### Mode

<h3 class="property-heading"><code>control.backgroundMode</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: none</span><span>Not responsive</span></div>

One of `none`, `static`, or `hover`. Selects which configuration is being edited. `hover` is available only when `states` includes it.

### Static values

<h3 class="property-heading"><code>control.backgroundStyle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: first declared style</span></div>

One of `color`, `image`, `gradient`, or `video`. The manifest spelling `colour` becomes the template value `color`.

<h3 class="property-heading"><code>control.backgroundColor</code></h3>
<div class="property-meta"><span class="property-type">CSS colour</span><span class="default">Default: surface palette</span><span>Responsive</span></div>

The resolved framework or custom colour, including opacity.

<h3 class="property-heading"><code>control.backgroundImage</code></h3>
<div class="property-meta"><span class="property-type">Image</span><span class="default">Default: empty</span><span>Responsive</span></div>

The selected managed image path. Its structured fields follow the [Image control](image-control.html).

<h3 class="property-heading"><code>control.backgroundPosition</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: center</span><span>Responsive</span></div>

A CSS `background-position` keyword or two-keyword combination offered by the Inspector.

<h3 class="property-heading"><code>control.backgroundSize</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: cover</span><span>Responsive</span></div>

One of `cover`, `contain`, or `auto`.

<h3 class="property-heading"><code>control.backgroundRepeat</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: no-repeat</span><span>Responsive</span></div>

One of `no-repeat`, `repeat`, `repeat-x`, `repeat-y`, `space`, or `round`.

<h3 class="property-heading"><code>control.backgroundGradientType</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: linear</span><span>Responsive</span></div>

One of `linear`, `radial`, or `conic`.

<h3 class="property-heading"><code>control.backgroundGradientDirection</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: to bottom</span><span>Responsive</span></div>

The CSS direction for a linear gradient.

<h3 class="property-heading"><code>control.backgroundGradientFrom</code></h3>
<div class="property-meta"><span class="property-type">CSS colour</span><span class="default">Default: surface palette</span><span>Responsive</span></div>

The first resolved framework or custom colour.

<h3 class="property-heading"><code>control.backgroundGradientFromPosition</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 0</span><span>Responsive</span></div>

The first stop position from 0 through 100.

<h3 class="property-heading"><code>control.backgroundGradientTo</code></h3>
<div class="property-meta"><span class="property-type">CSS colour</span><span class="default">Default: accent palette</span><span>Responsive</span></div>

The second resolved framework or custom colour.

<h3 class="property-heading"><code>control.backgroundGradientToPosition</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 100</span><span>Responsive</span></div>

The second stop position from 0 through 100.

<h3 class="property-heading"><code>control.backgroundVideo</code></h3>
<div class="property-meta"><span class="property-type">Video</span><span class="default">Default: empty</span><span>Not responsive</span></div>

The selected video. The value renders a complete video element; `.href` returns its exported path and `.poster` returns the selected or generated still frame. Filename, extension, MIME type, byte count, duration and dimensions use the other structured values documented by the [Video control](video-control.html).

<h3 class="property-heading"><code>control.backgroundVideoAspectRatio</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="default">Default: false</span><span>Responsive</span></div>

Whether the group forces a 16:9 aspect ratio.

### Hover values

When `states` includes `hover`, the Hover configuration exposes the corresponding selected style values with a `backgroundHover` prefix:

- `control.backgroundHoverStyle`
- `control.backgroundHoverColor`
- `control.backgroundHoverImage`
- `control.backgroundHoverPosition`
- `control.backgroundHoverSize`
- `control.backgroundHoverRepeat`
- `control.backgroundHoverGradientType`
- `control.backgroundHoverGradientDirection`
- `control.backgroundHoverGradientFrom`
- `control.backgroundHoverGradientFromPosition`
- `control.backgroundHoverGradientTo`
- `control.backgroundHoverGradientToPosition`
- `control.backgroundHoverVideo`
- `control.backgroundHoverVideo.poster`
- `control.backgroundHoverVideoAspectRatio`

Each Hover value has the same type, accepted values and default as its Static counterpart, except `backgroundHoverStyle`, whose default is `none`.

## Template behavior

The placement macro renders the private marker used by Foundry's scoped CSS and identifies where conditional video elements are inserted. Foundry applies the selected background automatically; read generated values only when a part needs additional conditional markup or styling.

Controls hidden by the group's visibility conditions retain their saved values and remain available to templates. Static values remain active while Hover values are edited and are replaced only while the marked element matches `:hover`.

When a video is selected, Foundry generates one still poster frame for the project asset. The editing canvas receives only that image and never loads the video. Preview and published output use a separately exported poster while the muted, looping video loads and begins playback.
{% endraw %}
