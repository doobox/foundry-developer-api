---
layout: default
title: Reveal control group · Foundry Developer
permalink: /reveal-control-group.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">manifest.json · inspector · control groups</p>
<h1>Reveal</h1>
<p class="lede">Adds configurable GSAP entrance animation to a part and activates it with ScrollTrigger as the part enters the viewport.</p>

## Quick example

```json
{
    "type" : "reveal"
}
```

No template macro or custom JavaScript is required. Declaring the group automatically requests `gsap` and `gsapScrollTrigger`; Foundry emits the animation for every instance and leaves both normal global APIs available to the part's own JavaScript.

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `reveal`. The group does not accept `id`, `label`, `group`, `responsive`, `styles`, or `states`.

<h3 class="property-heading"><code>defaultOverrides</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: generated defaults</span></div>

Replaces complete base defaults using any generated control ID documented below.

## Generated controls

Reveal values are intentionally not responsive. ScrollTrigger recalculates positions when the viewport changes, while one animation configuration remains consistent across breakpoints.

<h3 class="property-heading"><code>control.revealEnabled</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="default">Default: false</span></div>

Enables the generated animation and shows the remaining Reveal controls.

<h3 class="property-heading"><code>control.revealEffect</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: fade-up</span></div>

Accepts `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `scale`, or `blur`.

<h3 class="property-heading"><code>control.revealDistance</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 32</span></div>

Movement in pixels for directional effects and blur radius in pixels for `blur`. Accepts integers from 0 through 200.

<h3 class="property-heading"><code>control.revealDuration</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 600</span></div>

Animation duration in milliseconds. Accepts 100 through 3000 in steps of 50.

<h3 class="property-heading"><code>control.revealDelay</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 0</span></div>

Delay before animation in milliseconds. Accepts 0 through 3000 in steps of 50.

<h3 class="property-heading"><code>control.revealEase</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="default">Default: power2.out</span></div>

Accepts `power1.out`, `power2.out`, `power3.out`, `back.out(1.7)`, `elastic.out(1,0.3)`, `bounce.out`, or `none`.

<h3 class="property-heading"><code>control.revealStagger</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 0</span></div>

At zero, Foundry animates the part's root element. A value above zero instead animates each direct child in order, using the value as the interval in milliseconds. Accepts 0 through 1000 in steps of 25.

<h3 class="property-heading"><code>control.revealTrigger</code></h3>
<div class="property-meta"><span class="property-type">Number</span><span class="default">Default: 85</span></div>

Viewport percentage at which the part's top edge triggers the animation. Accepts 0 through 100.

<h3 class="property-heading"><code>control.revealOnce</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="default">Default: true</span></div>

When `true`, the reveal plays once. When `false`, it reverses after scrolling back above its trigger and can play again.

## Runtime behavior

The animation returns to the part's existing appearance. When the visitor requests reduced motion, Foundry skips the animation and leaves the part unmodified. If JavaScript or either library is unavailable, the original markup remains visible because Foundry does not pre-hide it with CSS.

Part JavaScript can use `gsap` and `ScrollTrigger` directly alongside the generated animation. Use a separate manifest library request only when the part needs those APIs without declaring this group.
{% endraw %}
