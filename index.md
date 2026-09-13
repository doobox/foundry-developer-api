---
layout: default
title: Foundry Developer
permalink: "/"
description: Build blocks for Foundry with ordinary HTML, CSS, JavaScript, and
  PHP.
---
{% raw %}
<section class="hero">
<p class="eyebrow">Foundry block API</p>
<h1>Your files, made visual.</h1>
<p class="lede">Build portable website blocks from ordinary HTML, CSS, JavaScript, and PHP. <code>Info.plist</code> declares the block; templates remain yours.</p>
<div class="hero-actions">
    <a class="button" href="quick-start.html">Build your first block</a>
    <a class="button secondary" href="manifest-identity.html">Explore Info.plist</a>
</div>
</section>

<h2>A clear path through the API</h2>
<div class="steps journey">
    <section class="step">
        <h3>Package the block</h3>
        <p>Start with the standard <code>.foundrypack</code> bundle structure. During development, use <code>.foundrydevpack</code> so the package remains easy to inspect and reload.</p>
        <p><a href="bundle-structure.html">Understand the bundle structure →</a></p>
    </section>
    <section class="step">
        <h3>Describe it in Info.plist</h3>
        <p>Give the block a stable identity, name its source templates and assets, request any libraries, and declare the controls authors will see.</p>
        <p><a href="manifest-identity.html">Start with block identity →</a></p>
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

<h2>The three things to remember</h2>
<div class="card-grid">
    <a class="card" href="manifest-identity.html"><strong>The manifest declares</strong><p><code>Info.plist</code> is the source of truth for identity, files, dependencies, controls, and managed child areas.</p></a>
    <a class="card" href="templates.html"><strong>Scope controls frequency</strong><p>Instance, page, and site scope describe how often a declared file is processed.</p></a>
    <a class="card" href="template-identity.html"><strong>Templates consume values</strong><p>Macros insert resolved values without taking ownership of your markup or CSS selectors.</p></a>
</div>

<div class="note">
<strong>Foundry does not guess.</strong> It processes the files the manifest declares, validates the current API shape, and leaves block structure and browser code under the developer’s control.</div>

<h2>Common destinations</h2>
<div class="page-links">
    <a class="card" href="custom-controls.html"><strong>Custom controls</strong><p>Build the block Inspector with text, colour, links, icons, typography, and more.</p></a>
    <a class="card" href="theme-controls.html"><strong>Theme-aware values</strong><p>Let compatible controls follow the active project theme.</p></a>
    <a class="card" href="blocks.html"><strong>API map</strong><p>Jump directly to every implemented developer-facing topic.</p></a>
</div>
{% endraw %}
