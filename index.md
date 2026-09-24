---
layout: default
title: Foundry Developer
permalink: "/"
description: Build parts for Foundry with ordinary HTML, CSS, JavaScript, and
  PHP.
---
{% raw %}
<section class="hero">
<p class="eyebrow">Foundry part API</p>
<h1>Build parts for Foundry.</h1>
<p class="lede">Build portable website parts from ordinary HTML, CSS, JavaScript, and PHP. <code>manifest.json</code> declares the part; templates remain yours.</p>
<div class="hero-actions">
    <a class="button" href="quick-start.html">Build your first part</a>
    <a class="button secondary" href="manifest-identity.html">Explore manifest.json</a>
</div>
</section>

<h2>A clear path through the API</h2>
<div class="steps journey">
    <section class="step">
        <h3>Package the part</h3>
        <p>Start with the standard <code>.foundrypack</code> bundle structure. During development, use <code>.foundrydevpack</code> so the package remains easy to inspect and reload.</p>
        <p><a href="bundle-structure.html">Understand the bundle structure →</a></p>
    </section>
    <section class="step">
        <h3>Describe it in manifest.json</h3>
        <p>Give the part a stable identity, name its source templates and assets, request any libraries, and declare the controls authors will see.</p>
        <p><a href="manifest-identity.html">Start with part identity →</a></p>
    </section>
    <section class="step">
        <h3>Use values in your templates</h3>
        <p>Place control values, identity, editable content, conditions, assets, and managed children exactly where your markup and styles require them.</p>
        <p><a href="template-identity.html">Learn the template language →</a></p>
    </section>
    <section class="step">
        <h3>Validate in Foundry</h3>
        <p>Install or open the development pack. Foundry reports invalid manifests and missing files in the Developer panel instead of silently accepting ambiguous declarations.</p>
        <p><a href="manifest-support.html#validation-failures">Understand validation →</a></p>
    </section>
</div>

<h2>Common destinations</h2>
<div class="page-links">
    <a class="card" href="custom-controls.html"><strong>Custom controls</strong><p>Build the part Inspector with text, colour, links, icons, typography, and more.</p></a>
    <a class="card" href="framework-controls.html"><strong>Framework-aware values</strong><p>Let compatible controls follow the active project framework.</p></a>
    <a class="card" href="parts.html"><strong>API map</strong><p>Jump directly to every implemented developer-facing topic.</p></a>
</div>
{% endraw %}
